package com.forumly.forumly.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.forumly.forumly.dto.CategoryDTO;
import com.forumly.forumly.dto.PostDTO;
import com.forumly.forumly.Mappers.CategoryMappers;
import com.forumly.forumly.Mappers.PostMappers;
import com.forumly.forumly.entity.Category;
import com.forumly.forumly.entity.Post;
import com.forumly.forumly.service.CategoryService;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/categories")

public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private CategoryMappers categoryMapper;

    @GetMapping
    public ResponseEntity<List<CategoryDTO>> getAllCategories() {
        List<CategoryDTO> dtos = categoryService.getAllCategories().stream()
                .map(categoryMapper::toDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    @PostMapping
    public ResponseEntity<CategoryDTO> createCategory(@RequestBody Category category) {
        Category saved = categoryService.createCategory(category);
        return ResponseEntity.ok(categoryMapper.toDTO(saved));
    }

    @GetMapping("/{id}/posts")
    public ResponseEntity<List<PostDTO>> getPostsByCategory(@PathVariable Long id) {
        Category category = categoryService.getCategoryById(id);
        List<PostDTO> posts = category.getPosts().stream()
                .map(PostMappers.INSTANCE::toDTO)
                .toList();
        return ResponseEntity.ok(posts);
    }
}