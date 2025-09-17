package com.forumly.forumly.repository;

import com.forumly.forumly.entity.Comment;
import com.forumly.forumly.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByPost(Post post);
}