package com.forumly.forumly.dto;

import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class PostDTO {
    private Long id;
    private String title;
    private String content;
    private String categoryName;
    private List<String> images;
    private List<String> links;
    private String author;
    private Long categoryId;
    private List<CommentDTO> comments;   // nested comments
    private int upvotes;
    private int downvotes;
    private LocalDateTime createdAt;
}
