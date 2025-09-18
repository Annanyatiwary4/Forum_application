package com.forumly.forumly.util;

import com.forumly.forumly.entity.Comment;
import com.forumly.forumly.entity.Post;

import java.util.List;
import java.util.stream.Collectors;

public class Commentutils {

    // ✅ Returns only top-level comments for a given post
    public static void filterTopLevelComments(Post post) {
        List<Comment> topLevelComments = post.getComments().stream()
                .filter(c -> c.getParentComment() == null)
                .collect(Collectors.toList());
        post.setComments(topLevelComments);
    }

    // ✅ Process a list of posts
    public static void filterTopLevelCommentsForPosts(List<Post> posts) {
        posts.forEach(CommentUtils::filterTopLevelComments);
    }
}
