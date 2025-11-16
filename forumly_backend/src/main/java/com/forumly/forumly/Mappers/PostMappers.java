package com.forumly.forumly.Mappers;

import com.forumly.forumly.dto.PostDTO;
import com.forumly.forumly.entity.Post;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Context;

import java.util.List;

@Mapper(componentModel = "spring", uses = {CommentMappers.class})
public interface PostMappers {

    @Mapping(target = "author", source = "author.username")
    @Mapping(target = "categoryId", source = "category.id")
    @Mapping(target = "categoryName", source = "category.name")
    @Mapping(target = "comments", source = "comments")

    // ---------------------- SAFE NULL-PROOF VOTES ----------------------
    @Mapping(
        target = "upvotes",
        expression = """
            java(post.getVotes() == null 
                ? 0 
                : (int) post.getVotes().stream()
                        .filter(v -> v != null 
                                && v.getType() == com.forumly.forumly.entity.Vote.VoteType.UPVOTE)
                        .count())
            """
    )
    @Mapping(
        target = "downvotes",
        expression = """
            java(post.getVotes() == null 
                ? 0 
                : (int) post.getVotes().stream()
                        .filter(v -> v != null 
                                && v.getType() == com.forumly.forumly.entity.Vote.VoteType.DOWNVOTE)
                        .count())
            """
    )
    @Mapping(
        target = "userVote",
        expression = """
            java(post.getVotes() == null 
                ? null
                : post.getVotes().stream()
                        .filter(v -> v != null 
                                && v.getUser() != null 
                                && v.getUser().getUsername() != null
                                && currentUsername != null
                                && v.getUser().getUsername().equals(currentUsername))
                        .map(v -> v.getType().name())
                        .findFirst()
                        .orElse(null))
            """
    )
    PostDTO toDTO(Post post, @Context String currentUsername);

    // For cases where we don’t care about userVote
    @Mapping(target = "userVote", ignore = true)
    PostDTO toDTO(Post post);

    List<PostDTO> toDtoList(List<Post> posts);

    // Entity mapping
    @Mapping(target = "author", ignore = true)
    @Mapping(target = "category", ignore = true)
    @Mapping(target = "comments", ignore = true)
    @Mapping(target = "votes", ignore = true)
    Post toEntity(PostDTO dto);
}
