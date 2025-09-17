package com.forumly.forumly.Mappers;

import com.forumly.forumly.dto.CommentDTO;
import com.forumly.forumly.entity.Comment;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import java.util.List;

@Mapper(componentModel = "spring", uses = {UserMappers.class})
public interface CommentMappers {

    @Mapping(target = "replies", source = "replies")
    CommentDTO toDTO(Comment comment);
    List<CommentDTO> toDtoList(List<Comment> comments);
    Comment toEntity(CommentDTO dto);
}
