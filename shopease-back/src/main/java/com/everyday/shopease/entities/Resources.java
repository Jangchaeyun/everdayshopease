package com.everyday.shopease.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Entity
@Table(name = "product_resouces")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Resources {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String url;

    @Column(nullable = false)
    private String isPrimary;

    @Column(nullable = false)
    private String type;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;
}
