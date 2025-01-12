package com.everyday.shopease.services;

import com.everyday.shopease.auth.entities.User;
import com.everyday.shopease.entities.Order;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@Component
public class PaymentIntentService {
    @PostConstruct
    public void init() {
        Stripe.apiKey = "sk_test_51Qg3pACpsv5WLFk0dOQhl75tEZVEnKFNQVjVnqrDZIMGPeqzsrtGqE7SmAvCkkDwOL1hN9dOUGDRPMrvgjf1bu0300irra5BsI";
    }

    public Map<String, String> createPaymentIntent(Order order) throws StripeException {
        User user = order.getUser();
        Map<String, String> metaData = new HashMap<>();
        metaData.put("orderId",order.getId().toString());
        PaymentIntentCreateParams paymentIntentCreateParams = PaymentIntentCreateParams.builder()
                .setAmount(1000L)
                .setCurrency("krw")
                .putAllMetadata(metaData)
                .setDescription("EverDayShopease")
                .setAutomaticPaymentMethods(
                        PaymentIntentCreateParams.AutomaticPaymentMethods.builder().setEnabled(true).build()
                )
                .build();
        PaymentIntent paymentIntent = PaymentIntent.create(paymentIntentCreateParams);
        Map<String, String> map = new HashMap<>();
        map.put("client_secret", paymentIntent.getClientSecret());
        return map;
    }
}
