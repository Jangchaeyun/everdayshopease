package com.everyday.shopease.services;

import com.everyday.shopease.dto.ProductDto;
import com.everyday.shopease.dto.ProductResourceDto;
import com.everyday.shopease.dto.ProductVariantDto;
import com.everyday.shopease.entities.*;
import com.everyday.shopease.repositories.ProductRepository;
import com.everyday.shopease.specification.ProductSpecification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService {
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryService categoryService;

    @Override
    public Product addProduct(ProductDto productDto) {
        Product product = mapToProductEntity(productDto);

        return productRepository.save(product);
    }

    @Override
    public List<Product> getAllProducts(UUID categoryId, UUID typeId) {
        Specification<Product> productSpecification = Specification.where(null);

        if (null != categoryId) {
            productSpecification = productSpecification.and(ProductSpecification.hasCategoryId(categoryId));
        }

        if (null != typeId) {
            productSpecification = productSpecification.and(ProductSpecification.hasCategoryTypeId(typeId));
        }

        List<Product> products = productRepository.findAll(productSpecification);

        // products을 productDto로 매핑하는 작업
        return products;
    }

    private Product mapToProductEntity (ProductDto productdto) {
        Product product = new Product();
        product.setName(productdto.getName());
        product.setDescription(productdto.getDescription());
        product.setBrand(productdto.getBrand());
        product.setNewArrival(productdto.isNewArrival());
        product.setPrice(productdto.getPrice());
        product.setRating(productdto.getRating());

        Category category = categoryService.getCategory(productdto.getCategoryId());
        if (null != category) {
            product.setCategory(category);
            UUID categoryTypeId = productdto.getCategoryTypeId();
            CategoryType categoryType = category.getCategoryTypes().stream().filter(categoryType1 -> categoryType1.getId().equals(categoryTypeId)).findFirst().orElse(null);
            product.setCategoryType(categoryType);
        }

        if (null != productdto.getVariants()) {
            product.setProductVariants(mapToProductVariant(productdto.getVariants(), product));
        }

        if (null != productdto.getProductResources()) {
            product.setResources(mapToProductResources(productdto.getProductResources(), product));
        }

        return productRepository.save(product);
    }

    private List<Resources> mapToProductResources(List<ProductResourceDto> productResources, Product product) {
        return productResources.stream().map(productResourceDto -> {
            Resources resources = new Resources();
            resources.setName(productResourceDto.getName());
            resources.setType(productResourceDto.getType());
            resources.setUrl(productResourceDto.getUrl());
            resources.setIsPrimary(productResourceDto.getIsPrimary());
            resources.setProduct(product);

            return resources;
        }).collect(Collectors.toList());
    }

    private List<ProductVariant> mapToProductVariant(List<ProductVariantDto> productVariantDtos, Product product) {
        return productVariantDtos.stream().map(productVariantDto -> {
            ProductVariant productVariant = new ProductVariant();
            productVariant.setColor(productVariantDto.getColor());
            productVariant.setSizes(productVariantDto.getSize());
            productVariant.setStockQuantity(productVariantDto.getStockQuantity());
            productVariant.setProduct(product);

            return productVariant;
        }).collect(Collectors.toList());
    }
}
