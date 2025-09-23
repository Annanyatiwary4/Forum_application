package com.forumly.forumly.Mappers;

import com.forumly.forumly.dto.CategoryDTO;
import com.forumly.forumly.entity.Category;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface CategoryMappers {

    @Mapping(target = "postCount", expression = "java(category.getPosts().size())")
    CategoryDTO toDTO(Category category);
}
