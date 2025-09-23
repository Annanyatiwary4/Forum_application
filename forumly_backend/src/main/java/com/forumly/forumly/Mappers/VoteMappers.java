package com.forumly.forumly.Mappers;

import com.forumly.forumly.dto.VoteDTO;
import com.forumly.forumly.entity.Vote;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import java.util.List;

@Mapper(componentModel = "spring", uses = {UserMappers.class})
public interface VoteMappers {
    @Mapping(target = "postId", source = "post.id")
    @Mapping(target = "username", source = "user.username")
    @Mapping(target = "type", expression = "java(vote.getType().name())")
    VoteDTO toDTO(Vote vote);
    List<VoteDTO> toDtoList(List<Vote> votes);

    @Mapping(target = "post", ignore = true)  // set in service
    @Mapping(target = "user", ignore = true)  // set in service

    @Mapping(target = "type", expression = "java(com.forumly.forumly.entity.Vote.VoteType.valueOf(dto.getType()))")
    Vote toEntity(VoteDTO dto);
}
