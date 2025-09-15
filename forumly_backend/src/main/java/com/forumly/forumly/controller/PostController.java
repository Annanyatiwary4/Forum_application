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
    public ResponseEntity<PostDTO> createPost(@RequestBody Post postData, Authentication authentication) {
        String username = authentication.getName();
        User author = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Category category = categoryRepository.findById(postData.getCategory().getId())
                .orElseThrow(() -> new RuntimeException("Category not found"));

        Post post = postService.createPost(postData.getTitle(), postData.getContent(), author, category);
        return ResponseEntity.ok(postMapper.toDTO(post));
    }

    // Get Post by ID
    @GetMapping("/{id}")
    public ResponseEntity<PostDTO> getPost(@PathVariable Long id) {
        Post post = postService.getPostById(id);
        return ResponseEntity.ok(postMapper.toDTO(post));
    }

    // Delete Post (only by author)
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

        List<Post> posts = postService.getPostsByCategory(category);
        List<PostDTO> postDTOs = posts.stream()
                .map(postMapper::toDTO)
                .collect(Collectors.toList());

        return ResponseEntity.ok(postDTOs);
    }
}
