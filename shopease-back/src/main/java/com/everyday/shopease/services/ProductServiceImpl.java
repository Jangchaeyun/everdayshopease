package com.everyday.shopease.services;

import com.everyday.shopease.dto.ProductDto;
import com.everyday.shopease.entities.Product;
import com.everyday.shopease.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {
    @Autowired
    private ProductRepository productRepository;

    @Override
    public Product addProduct(ProductDto product) {

        return null;
    }

    @Override
    public List<Product> getAllProducts() {
        List<Product> products = productRepository.findAll();

        // products을 productDto로 매핑하는 작업
        return products;
    }

    private Product createProduct (ProductDto productdto) {
        Product product = new Product();
        product.setName(productdto.getName());
        product.setDescription(productdto.getDescription());
        product.setBrand(productdto.getBrand());
        product.setNewArrival(productdto.isNewArrival());
        product.setPrice(productdto.getPrice());

        return product;
    }
}
