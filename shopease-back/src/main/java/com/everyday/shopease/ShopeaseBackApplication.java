package com.everyday.shopease;

import com.stripe.Stripe;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Arrays;
import java.util.Collections;

@SpringBootApplication
public class ShopeaseBackApplication {

    @Value("${stripe.secret}")
    private String stripeSecret;

    public static void main(String[] args) {
        SpringApplication.run(ShopeaseBackApplication.class, args);
    }

    @PostConstruct
    public void init(){
        Stripe.apiKey = this.stripeSecret;
    }

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOriginPatterns(Collections.singletonList("*")); // 개발 환경에서는 허용
        config.setAllowedHeaders(Arrays.asList(
                "Origin", "Content-Type", "Accept", "responseType",
                "Authorization", "x-authorization", "Content-Range", "range"
        ));
        config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "OPTIONS", "DELETE", "PATCH"));
        config.setExposedHeaders(Arrays.asList(
                "X-Total-Count", "Content-Range", "Content-Type", "Accept", "X-Requested-With", "remember-me"
        ));
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }

}
