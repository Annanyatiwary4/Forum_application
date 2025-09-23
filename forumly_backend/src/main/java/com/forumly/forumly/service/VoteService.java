package com.forumly.forumly.service;

import com.forumly.forumly.entity.Post;
import com.forumly.forumly.entity.User;
import com.forumly.forumly.entity.Vote;
import com.forumly.forumly.repository.VoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class VoteService {

    @Autowired
    private VoteRepository voteRepository;

    public Vote vote(Post post, User user, String type) {
        Vote existing = voteRepository.findByUserAndPost(user, post).orElse(null);

        if (existing != null) {
            existing.setType(Vote.VoteType.valueOf(type.toUpperCase()));
            return voteRepository.save(existing);
        }

        Vote vote = new Vote();
        vote.setPost(post);
        vote.setUser(user);
        vote.setType(Vote.VoteType.valueOf(type.toUpperCase()));

        return voteRepository.save(vote);
    }
}
