package com.forumly.forumly.service;

import com.forumly.forumly.Mappers.CommentMappers;
import com.forumly.forumly.dto.CommentDTO;
import com.forumly.forumly.entity.Comment;
import com.forumly.forumly.entity.Post;
import com.forumly.forumly.entity.User;
import com.forumly.forumly.repository.CommentRepository;
import com.forumly.forumly.repository.PostRepository;
import com.forumly.forumly.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CommentMappers commentMapper;

    // Create comment from DTO (recommended for controller)
    public CommentDTO createCommentFromDto(CommentDTO dto, String username) {
        Comment comment = commentMapper.toEntity(dto);

        // set author by username
        User author = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        comment.setAuthor(author);

        // set post from dto.postId
        Post post = postRepository.findById(dto.getPostId())
                .orElseThrow(() -> new RuntimeException("Post not found"));
        comment.setPost(post);

        // set parentComment if provided
        if (dto.getParentCommentId() != null) {
            Comment parent = commentRepository.findById(dto.getParentCommentId())
                    .orElseThrow(() -> new RuntimeException("Parent comment not found"));
            comment.setParentComment(parent);
        }

        Comment saved = commentRepository.save(comment);
        return commentMapper.toDTO(saved);
    }

    // Existing create by primitives (keep if used elsewhere)
    public Comment createComment(String content, User author, Post post, Long parentCommentId) {
        Comment comment = new Comment();
        comment.setContent(content);
        comment.setAuthor(author);
        comment.setPost(post);

        if (parentCommentId != null) {
            Comment parent = commentRepository.findById(parentCommentId)
                    .orElseThrow(() -> new RuntimeException("Parent comment not found"));
            comment.setParentComment(parent);
        }

        return commentRepository.save(comment);
    }

    public List<CommentDTO> getCommentsByPost(Long postId) {
    Post post = postRepository.findById(postId)
            .orElseThrow(() -> new RuntimeException("Post not found"));

    // fetch only top-level comments
    List<Comment> comments = commentRepository.findByPostAndParentCommentIsNull(post);

    return comments.stream()
            .map(this::mapCommentWithReplies)
            .toList();
        }

        private CommentDTO mapCommentWithReplies(Comment comment) {
            CommentDTO dto = commentMapper.toDTO(comment);

            List<CommentDTO> replies = comment.getReplies().stream()
                    .map(this::mapCommentWithReplies) // recursion for nested replies
                    .toList();

            dto.setReplies(replies);
            return dto;
        }


    public void deleteComment(Long id, String username) {
        Comment comment = commentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Comment not found"));

        if (!comment.getAuthor().getUsername().equals(username)) {
            throw new RuntimeException("You can only delete your own comments");
        }

        commentRepository.delete(comment);
    }
}
