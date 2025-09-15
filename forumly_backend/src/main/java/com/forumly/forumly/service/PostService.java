package com.forumly.forumly.service;

import com.forumly.forumly.entity.Category;
import com.forumly.forumly.entity.Post;
import com.forumly.forumly.entity.User;
import com.forumly.forumly.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    public Post createPost(String title, String content, User author, Category category) {
        Post post = new Post(title, content, author, category);
        return postRepository.save(post);
    }

    public List<Post> getPostsByCategory(Category category) {
        return postRepository.findByCategory(category);
    }

    public Post getPostById(Long id) {
        return postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post not found"));
    }

    public void deletePost(Post post) {
        postRepository.delete(post);
    }
}
