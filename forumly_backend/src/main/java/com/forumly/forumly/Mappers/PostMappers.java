package com.forumly.forumly.Mappers;

import com.forumly.forumly.dto.PostDTO;
import com.forumly.forumly.entity.Post;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import java.util.List;


@Mapper(componentModel = "spring", uses = {CommentMappers.class})
public interface PostMappers {
    @Mapping(target = "author", source = "author.username")
    @Mapping(target = "categoryId", source = "category.id")
    @Mapping(target = "comments", source = "comments")
    @Mapping(target = "upvotes", expression = "java((int) post.getVotes().stream().filter(v -> v.getType() == com.forumly.forumly.entity.Vote.VoteType.UPVOTE).count())")
    @Mapping(target = "downvotes", expression = "java((int) post.getVotes().stream().filter(v -> v.getType() == com.forumly.forumly.entity.Vote.VoteType.DOWNVOTE).count())")
    PostDTO toDTO(Post post);
    List<PostDTO> toDtoList(List<Post> posts);

    @Mapping(target = "author", ignore = true)    // set in service
    @Mapping(target = "category", ignore = true)  // set in service
    @Mapping(target = "comments", ignore = true)  // usually handled separately
    @Mapping(target = "votes", ignore = true)
    Post toEntity(PostDTO dto);

    
}
