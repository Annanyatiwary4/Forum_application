package com.forumly.forumly.Mappers;

import com.forumly.forumly.dto.CommentDTO;
import com.forumly.forumly.entity.Comment;
import com.forumly.forumly.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import java.util.List;

@Mapper(componentModel = "spring")
public interface CommentMappers {
    @Mapping(target = "author", source = "author.username")   // map User.username → String
    @Mapping(target = "postId", source = "post.id")
    @Mapping(target = "parentCommentId", source = "parentComment.id")
    @Mapping(target = "replies", source = "replies")
    CommentDTO toDTO(Comment comment);

    List<CommentDTO> toDtoList(List<Comment> comments);

     // DTO -> Entity (relations ignored, set them in service)
    @Mapping(target = "author", ignore = true)
    @Mapping(target = "post", ignore = true)
    @Mapping(target = "parentComment", ignore = true)
    @Mapping(target = "replies", ignore = true) // replies handled in entity logic if needed

    Comment toEntity(CommentDTO dto);
     // Optional helper - MapStruct will use this if needed
    default String map(User user) {
        return user != null ? user.getUsername() : null;
    }


    
}

