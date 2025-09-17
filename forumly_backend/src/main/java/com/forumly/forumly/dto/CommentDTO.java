package com.forumly.forumly.dto;

import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class CommentDTO {
    private Long id;
    private String content;
    private String author;
    private Long postId;
    private Long parentCommentId;
    private List<CommentDTO> replies;
    private LocalDateTime createdAt;
}
