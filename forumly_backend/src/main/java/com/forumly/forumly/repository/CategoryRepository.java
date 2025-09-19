package com.forumly.forumly.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.forumly.forumly.entity.Category;


@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
}
