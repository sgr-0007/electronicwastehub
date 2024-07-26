package com.team.ewaste.service;

import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.team.ewaste.model.PaymentRequest;

/**
 * @author Kyle
 * @date 2024/04/10
 */
public interface PaymentService {

    PaymentIntent createPaymentIntent(PaymentRequest request) throws StripeException;

}
