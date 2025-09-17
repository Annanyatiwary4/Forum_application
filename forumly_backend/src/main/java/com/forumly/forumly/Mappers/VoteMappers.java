package com.forumly.forumly.Mappers;

import com.forumly.forumly.dto.VoteDTO;
import com.forumly.forumly.entity.Vote;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = {UserMappers.class})
public interface VoteMappers {

    @Mapping(target = "type", expression = "java(vote.getType().name())")
    VoteDTO toDTO(Vote vote);

    @Mapping(target = "type", expression = "java(com.forumly.forumly.entity.Vote.VoteType.valueOf(dto.getType()))")
    Vote toEntity(VoteDTO dto);
}
