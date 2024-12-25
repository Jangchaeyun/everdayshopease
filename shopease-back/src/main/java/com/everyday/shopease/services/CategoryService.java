package com.everyday.shopease.services;

import com.everyday.shopease.dto.CategoryDto;
import com.everyday.shopease.dto.CategoryTypeDto;
import com.everyday.shopease.entities.Category;
import com.everyday.shopease.entities.CategoryType;
import com.everyday.shopease.repositories.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    public Category getCategory(UUID categoryId) {
        Optional<Category> category = categoryRepository.findById(categoryId);
        return category.orElse(null);
    }

    public Category createCategory(CategoryDto categoryDto) {
        Category category = mapToEntity(categoryDto);
        return categoryRepository.save(category);
    }

    private Category mapToEntity(CategoryDto categoryDto) {
        Category category = Category.builder()
                .code(categoryDto.getCode())
                .name(categoryDto.getName())
                .description(categoryDto.getDescription())
                .categoryTypes(mapToCategoryTypesList(categoryDto.getCategoryTypeList()))
                .build();

        return category;
    }

    private List<CategoryType> mapToCategoryTypesList(List<CategoryTypeDto> categoryTypeList) {
        return categoryTypeList.stream().map(categoryTypeDto -> {
            CategoryType categoryType = new CategoryType();
            categoryType.setCode(categoryTypeDto.getCode());
            categoryType.setName(categoryTypeDto.getName());
            categoryType.setDescription(categoryTypeDto.getDescription());
            return categoryType;
        }).collect(Collectors.toList());
    }
}
