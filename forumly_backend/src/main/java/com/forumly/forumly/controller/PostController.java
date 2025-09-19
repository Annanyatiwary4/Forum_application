package com.forumly.forumly.controller;

import com.forumly.forumly.Mappers.PostMappers;
import com.forumly.forumly.dto.PostDTO;
import com.forumly.forumly.entity.Category;
import com.forumly.forumly.entity.Post;
import com.forumly.forumly.entity.User;
import com.forumly.forumly.repository.CategoryRepository;
import com.forumly.forumly.repository.UserRepository;
import com.forumly.forumly.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    @Autowired
    private PostService postService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private PostMappers postMapper;

    // Create Post
    @PostMapping
    public ResponseEntity<PostDTO> createPost(@RequestBody PostDTO dto, Authentication authentication) {
        String username = authentication.getName();
        User author = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Category category = categoryRepository.findById(dto.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));

        Post post = postService.createPost(
                dto.getTitle(),
                dto.getContent(),
                dto.getImages(),
                dto.getLinks(),
                author,
                category
        );

        return ResponseEntity.ok(postMapper.toDTO(post)); // just use mapper
    }

    // Get Post by ID
    @GetMapping("/{id}")
    public ResponseEntity<PostDTO> getPost(@PathVariable Long id) {
        Post post = postService.getPostById(id); // service handles nested replies
        return ResponseEntity.ok(postMapper.toDTO(post)); // use mapper
    }

    // Update Post
    @PutMapping("/{id}")
    public ResponseEntity<PostDTO> updatePost(@PathVariable Long id,
                                              @RequestBody PostDTO dto,
                                              Authentication authentication) {
        Post existingPost = postService.getPostById(id);
        String username = authentication.getName();

        if (!existingPost.getAuthor().getUsername().equals(username)) {
            return ResponseEntity.status(403).body(null);
        }

        Category category = null;
        if (dto.getCategoryId() != null) {
            category = categoryRepository.findById(dto.getCategoryId())
                    .orElseThrow(() -> new RuntimeException("Category not found"));
        }

        Post updatedPost = postService.updatePost(
                existingPost,
                dto.getTitle(),
                dto.getContent(),
                dto.getImages(),
                dto.getLinks(),
                category
        );

        // ✅ Map comments for response only
    PostDTO response = postMapper.toDTO(updatedPost);
    response.setComments(postService.mapCommentsRecursivelyForDto(updatedPost));

    return ResponseEntity.ok(response);
    }

    // Delete Post
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePost(@PathVariable Long id, Authentication authentication) {
        Post post = postService.getPostById(id);
        String username = authentication.getName();

        if (!post.getAuthor().getUsername().equals(username)) {
            return ResponseEntity.status(403).body("You can only delete your own posts");
        }

        postService.deletePost(post);
        return ResponseEntity.ok("Post deleted successfully");
    }

    // Get posts by category
    @GetMapping("/category/{categoryId}")
    public ResponseEntity<List<PostDTO>> getPostsByCategory(@PathVariable Long categoryId) {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found"));

        List<Post> posts = postService.getPostsByCategory(category); // nested replies populated
        List<PostDTO> postDTOs = postMapper.toDtoList(posts);        // just use mapper

        return ResponseEntity.ok(postDTOs);
    }

    // Get all posts by the logged-in user
        @GetMapping("/my-posts")
        public ResponseEntity<List<PostDTO>> getMyPosts(Authentication authentication) {
            String username = authentication.getName();
            
            User user = userRepository.findByUsername(username)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            List<Post> myPosts = postService.getPostsByAuthor(user); // we'll add this service method
            List<PostDTO> postDTOs = postMapper.toDtoList(myPosts);

            return ResponseEntity.ok(postDTOs);
        }

}
