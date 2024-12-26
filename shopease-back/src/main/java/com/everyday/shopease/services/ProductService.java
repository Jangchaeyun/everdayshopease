package com.everyday.shopease.services;

import com.everyday.shopease.dto.ProductDto;
import com.everyday.shopease.entities.Product;

import java.util.List;
import java.util.UUID;

public interface ProductService {
    public Product addProduct(ProductDto product);
    List<Product> getAllProducts(UUID categoryId, UUID typeId);
}
