package com.forumly.forumly.Mappers;

import com.forumly.forumly.dto.PostDTO;
import com.forumly.forumly.entity.Post;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = {UserMappers.class, CategoryMappers.class, CommentMappers.class})
public interface PostMappers {

    @Mapping(target = "upvotes", expression = "java((int) post.getVotes().stream().filter(v -> v.getType() == com.forumly.forumly.entity.Vote.VoteType.UPVOTE).count())")
    @Mapping(target = "downvotes", expression = "java((int) post.getVotes().stream().filter(v -> v.getType() == com.forumly.forumly.entity.Vote.VoteType.DOWNVOTE).count())")
    PostDTO toDTO(Post post);

    Post toEntity(PostDTO dto);
}
