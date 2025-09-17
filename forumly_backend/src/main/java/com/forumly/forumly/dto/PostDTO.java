package com.forumly.forumly.dto;

import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class PostDTO {
    private Long id;
    private String title;
    private String content;
    private List<String> images;
    private List<String> links;
    private UserDTO author;
    private CategoryDTO category;
    private List<CommentDTO> comments;   // nested comments
    private int upvotes;
    private int downvotes;
    private LocalDateTime createdAt;
}
