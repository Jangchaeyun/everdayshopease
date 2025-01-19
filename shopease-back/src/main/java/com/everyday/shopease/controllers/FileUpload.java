package com.everyday.shopease.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/file")
@CrossOrigin
public class FileUpload {
    @PostMapping
    public ResponseEntity<?> fileUpload() {


        return new ResponseEntity<>(HttpStatus.OK);
    }
}
