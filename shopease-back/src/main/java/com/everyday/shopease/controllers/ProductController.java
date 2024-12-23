package com.everyday.shopease.controllers;

import com.everyday.shopease.dto.ProductDto;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductController {
    @GetMapping
    public List<ProductDto> getAllProducts() {
        return Collections.EMPTY_LIST;
    }

    // create Product
    @PostMapping
    public ProductDto createProduct(@RequestBody ProductDto product) {
        return null;
    }
}
