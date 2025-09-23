package com.forumly.forumly.dto;
import lombok.Data;

@Data

public class UserDTO {
    private Long id;
    private String username;
    private String email;
    private String bio;
    private String profilePic;
    private String githubLink;
    private String linkedinLink;
}
