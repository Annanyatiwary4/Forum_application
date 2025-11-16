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
        Vote.VoteType voteType = Vote.VoteType.valueOf(type.toUpperCase());

    if (existing != null) {

        // 1. If same vote → remove vote (toggle off)
        if (existing.getType() == voteType) {
            voteRepository.delete(existing);
            return null;  // means no vote
        }

        // 2. If switching vote
        existing.setType(voteType);
        return voteRepository.save(existing);
    }

    // 3. If no vote exists
    Vote vote = new Vote();
    vote.setPost(post);
    vote.setUser(user);
    vote.setType(voteType);
    return voteRepository.save(vote);
}
}
