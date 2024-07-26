package com.team.ewaste.service.impl;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.team.ewaste.model.PaymentRequest;
import com.team.ewaste.service.PaymentService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class PaymentServiceImpl implements PaymentService {

    @Value("${stripe.api.key}")
    private String stripeSecretKey;

    public PaymentIntent createPaymentIntent(PaymentRequest request) throws StripeException {
        Stripe.apiKey = stripeSecretKey;

        Map<String, Object> params = new HashMap<>();
        params.put("currency", request.getCurrency());
        params.put("amount", request.getAmount());
        params.put("description", request.getDescription());

        // Optional: Set customer information
        if (request.getCustomerId() != null) {
            params.put("customer", request.getCustomerId());
        }

        // Optional: Set payment method information
        if (request.getPaymentMethodId() != null) {
            params.put("payment_method", request.getPaymentMethodId());
        }

        // Optional: Set confirmation method (automatic or manual)
        if (request.getConfirmationMethod() != null) {
            params.put("confirm", request.getConfirmationMethod());
        }

        return PaymentIntent.create(params);
    }

}
