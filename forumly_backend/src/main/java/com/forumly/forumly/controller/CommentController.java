package com.forumly.forumly.controller;

import com.forumly.forumly.dto.CommentDTO;
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

    // ✅ Create Comment (DTO-based)
    @PostMapping
    public ResponseEntity<CommentDTO> createComment(
            @RequestBody CommentDTO dto,
            Authentication authentication) {

        String username = authentication.getName();
        CommentDTO saved = commentService.createCommentFromDto(dto, username);
        return ResponseEntity.ok(saved);
    }

    // ✅ Get comments for a post
    @GetMapping("/post/{postId}")
    public ResponseEntity<List<CommentDTO>> getCommentsByPost(@PathVariable Long postId) {
        List<CommentDTO> comments = commentService.getCommentsByPost(postId);
        return ResponseEntity.ok(comments);
    }

    // ✅ Delete comment (only author can delete)
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteComment(@PathVariable Long id, Authentication authentication) {
        String username = authentication.getName();
        commentService.deleteComment(id, username);
        return ResponseEntity.ok("Comment deleted successfully");
    }
}
