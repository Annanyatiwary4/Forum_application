package com.forumly.forumly.dto;

import lombok.Data;

@Data
public class VoteDTO {
    private Long id;
    private UserDTO user;
    private String type; // UPVOTE / DOWNVOTE
}
