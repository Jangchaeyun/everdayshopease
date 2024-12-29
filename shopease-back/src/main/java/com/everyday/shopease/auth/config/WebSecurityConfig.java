package com.everyday.shopease.auth.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig {
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.authorizeHttpRequests((authorize) -> authorize
                .requestMatchers("/v3/api-dots/**", "/swagger-ui.html", "/swagger-ui/**").permitAll()
                .requestMatchers(HttpMethod.GET,"/api/products", "/api/category").permitAll()
                .anyRequest().authenticated());
        return http.build();
    }
}
