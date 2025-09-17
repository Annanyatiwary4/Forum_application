package com.forumly.forumly.dto;

import lombok.Data;

@Data
public class VoteDTO {
    private Long id;
    private Long postId;
    private String username;
    private String type; // UPVOTE / DOWNVOTE
}
