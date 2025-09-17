package com.forumly.forumly.service;

import com.forumly.forumly.entity.Comment;
import com.forumly.forumly.entity.Post;
import com.forumly.forumly.entity.User;
import com.forumly.forumly.repository.CommentRepository;
import com.forumly.forumly.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private PostRepository postRepository;

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

    public List<Comment> getCommentsByPost(Long postId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));
        return commentRepository.findByPost(post);
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
