package com.everyday.shopease.services;

import com.everyday.shopease.dto.ProductDto;
import com.everyday.shopease.entities.Product;

import java.util.List;

public interface ProductService {
    public Product addProduct(ProductDto product);
    public List<Product> getAllProducts();
}
