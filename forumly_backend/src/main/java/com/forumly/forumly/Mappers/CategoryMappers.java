package com.forumly.forumly.Mappers;

import com.forumly.forumly.dto.CategoryDTO;
import com.forumly.forumly.entity.Category;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface  CategoryMappers {
    CategoryMappers INSTANCE = Mappers.getMapper(CategoryMappers.class);

     @Mapping(target = "postCount", expression = "java(category.getPosts().size())")
    CategoryDTO toDTO(Category category);
}
