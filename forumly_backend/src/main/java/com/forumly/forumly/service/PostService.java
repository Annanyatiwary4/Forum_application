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

    // ✅ Create Post with images & links
    public Post createPost(String title, String content, List<String> images, List<String> links, User author, Category category) {
        Post post = new Post();
        post.setTitle(title);
        post.setContent(content);
        post.setAuthor(author);
        post.setCategory(category);

        if (images != null) {
            post.setImages(images);
        }
        if (links != null) {
            post.setLinks(links);
        }

        return postRepository.save(post);
    }

    // ✅ Update Post (only by author)
    public Post updatePost(Post existingPost, String title, String content, List<String> images, List<String> links, Category category) {
        if (title != null) existingPost.setTitle(title);
        if (content != null) existingPost.setContent(content);
        if (images != null) existingPost.setImages(images);
        if (links != null) existingPost.setLinks(links);
        if (category != null) existingPost.setCategory(category);

        return postRepository.save(existingPost);
    }

    // ✅ Fetch posts by category
    public List<Post> getPostsByCategory(Category category) {
        return postRepository.findByCategory(category);
    }

    // ✅ Fetch post by ID
    public Post getPostById(Long id) {
        return postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post not found"));
    }

    // ✅ Delete post
    public void deletePost(Post post) {
        postRepository.delete(post);
    }
}
