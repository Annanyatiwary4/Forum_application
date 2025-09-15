package com.forumly.forumly.Mappers;


import com.forumly.forumly.dto.UserDTO;
import com.forumly.forumly.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface  UserMappers {
    UserMappers INSTANCE = Mappers.getMapper(UserMappers.class);
    UserDTO toDTO(User user);
}
