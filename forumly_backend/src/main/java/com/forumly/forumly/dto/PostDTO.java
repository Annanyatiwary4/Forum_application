package com.forumly.forumly.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class PostDTO {
    private Long id;
    private String title;
    private String content;
    private UserDTO author;
    private CategoryDTO category;
    private LocalDateTime createdAt;
}