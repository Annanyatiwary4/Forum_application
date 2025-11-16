package com.forumly.forumly.controller;

import com.forumly.forumly.Mappers.VoteMappers;
import com.forumly.forumly.dto.VoteDTO;
import com.forumly.forumly.entity.Post;
import com.forumly.forumly.entity.User;
import com.forumly.forumly.entity.Vote;
import com.forumly.forumly.repository.PostRepository;
import com.forumly.forumly.repository.UserRepository;
import com.forumly.forumly.service.VoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/votes")
public class VoteController {

    @Autowired
    private VoteService voteService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private VoteMappers voteMapper;


    // Vote on a post
    @PostMapping
    public ResponseEntity<VoteDTO> vote(
            @RequestParam Long postId,
            @RequestParam String type,
            Authentication authentication) {

        String username = authentication.getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        Vote vote = voteService.vote(post, user, type);

                        if (vote == null) {
                        return ResponseEntity.ok(null);  // vote removed
                        }

return ResponseEntity.ok(voteMapper.toDTO(vote));

    }
}
