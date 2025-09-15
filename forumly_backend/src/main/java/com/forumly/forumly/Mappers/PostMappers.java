package com.forumly.forumly.Mappers;

import com.forumly.forumly.dto.PostDTO;
import com.forumly.forumly.entity.Post;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring",uses={UserMappers.class,CategoryMappers.class})

public interface PostMappers {
    PostMappers INSTANCE = Mappers.getMapper(PostMappers.class);

    PostDTO toDTO(Post post);
}
