package com.forumly.forumly.controller;

import com.forumly.forumly.Mappers.CommentMappers;
import com.forumly.forumly.dto.CommentDTO;
import com.forumly.forumly.entity.Comment;
import com.forumly.forumly.entity.Post;
import com.forumly.forumly.entity.User;
import com.forumly.forumly.repository.PostRepository;
import com.forumly.forumly.repository.UserRepository;
import com.forumly.forumly.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private CommentMappers commentMapper;

    // Create Comment (can be nested if parentId is provided)
    @PostMapping
    public ResponseEntity<CommentDTO> createComment(
            @RequestParam Long postId,
            @RequestParam(required = false) Long parentCommentId,
            @RequestBody String content,
            Authentication authentication) {

        String username = authentication.getName();
        User author = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        Comment comment = commentService.createComment(content, author, post, parentCommentId);
        return ResponseEntity.ok(commentMapper.toDTO(comment));
    }

    // Get comments for a post
    @GetMapping("/post/{postId}")
    public ResponseEntity<List<CommentDTO>> getCommentsByPost(@PathVariable Long postId) {
        List<Comment> comments = commentService.getCommentsByPost(postId);
        return ResponseEntity.ok(commentMapper.toDtoList(comments));
    }

    // Delete comment (only author can delete)
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteComment(@PathVariable Long id, Authentication authentication) {
        String username = authentication.getName();
        commentService.deleteComment(id, username);
        return ResponseEntity.ok("Comment deleted successfully");
    }
}
