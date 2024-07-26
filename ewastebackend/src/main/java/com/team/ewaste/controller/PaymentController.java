package com.team.ewaste.controller;

import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.team.ewaste.model.PaymentRequest;
import com.team.ewaste.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/payment")

public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @PostMapping("/createPaymentLink")
    public ResponseEntity<String> createPaymentIntent(@RequestBody PaymentRequest request) throws StripeException {
        PaymentIntent paymentIntent = paymentService.createPaymentIntent(request);
        String clientSecret = paymentIntent.getClientSecret();
        return ResponseEntity.ok(clientSecret);
    }
}

