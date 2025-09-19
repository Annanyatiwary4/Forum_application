package com.forumly.forumly.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.forumly.forumly.entity.Category;
import com.forumly.forumly.entity.Post;
import com.forumly.forumly.entity.User;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findByCategory(Category category);
    List<Post> findByAuthor(User author);

}