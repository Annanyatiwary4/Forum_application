package com.forumly.forumly.dto;

import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class CommentDTO {
    private Long id;
    private String content;
    private UserDTO author;
    private CommentDTO parentComment;
    private List<CommentDTO> replies;
    private LocalDateTime createdAt;
}
