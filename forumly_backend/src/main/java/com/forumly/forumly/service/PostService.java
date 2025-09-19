package com.forumly.forumly.service;

import com.forumly.forumly.Mappers.CommentMappers;
import com.forumly.forumly.dto.CommentDTO;
import com.forumly.forumly.entity.Comment;
import com.forumly.forumly.entity.Post;
import com.forumly.forumly.entity.Category;
import com.forumly.forumly.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.forumly.forumly.entity.User;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private CommentMappers commentMapper;

    // ✅ Create Post
    public Post createPost(String title, String content, List<String> images, List<String> links, com.forumly.forumly.entity.User author, Category category) {
        Post post = new Post();
        post.setTitle(title);
        post.setContent(content);
        post.setAuthor(author);
        post.setCategory(category);

        if (images != null) post.setImages(images);
        if (links != null) post.setLinks(links);

        return postRepository.save(post);
    }

    // ✅ Update Post
    public Post updatePost(Post existingPost, String title, String content, List<String> images, List<String> links, Category category) {
        if (title != null) existingPost.setTitle(title);
        if (content != null) existingPost.setContent(content);
        if (images != null) existingPost.setImages(images);
        if (links != null) existingPost.setLinks(links);
        if (category != null) existingPost.setCategory(category);

        return postRepository.save(existingPost);
    }

    // ✅ Fetch posts by category with nested comments
    public List<Post> getPostsByCategory(Category category) {
        List<Post> posts = postRepository.findByCategory(category);

        posts.forEach(this::mapCommentsRecursivelyForDto);

        return posts;
    }

    // ✅ Fetch post by ID with nested comments
    public Post getPostById(Long id) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        mapCommentsRecursivelyForDto(post);

        return post;
    }

    // ✅ Delete Post
    public void deletePost(Post post) {
        postRepository.delete(post);
    }

    // 🔹 Map comments for DTO safely (does not touch entity)
    public List<CommentDTO> mapCommentsRecursivelyForDto(Post post) {
        return post.getComments().stream()
                .filter(c -> c.getParentComment() == null)
                .map(this::mapCommentWithReplies)
                .collect(Collectors.toList());
    }


    private CommentDTO mapCommentWithReplies(Comment comment) {
        CommentDTO dto = commentMapper.toDTO(comment);

        List<CommentDTO> replies = comment.getReplies().stream()
                .map(this::mapCommentWithReplies)
                .collect(Collectors.toList());

        dto.setReplies(replies);
        return dto;
    }

    
        // ✅ Get posts by author (used for "my posts")
    public List<Post> getPostsByAuthor(User author) {
        return postRepository.findByAuthor(author);
    }

}
