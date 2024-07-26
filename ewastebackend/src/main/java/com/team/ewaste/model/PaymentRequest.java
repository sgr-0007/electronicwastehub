package com.team.ewaste.model;

public class PaymentRequest {
    private String currency;
    private Long amount;
    private String description;
    private String customerId;
    private String paymentMethodId;
    private String confirmationMethod;

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public Long getAmount() {
        return amount;
    }

    public void setAmount(Long amount) {
        this.amount = amount;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCustomerId() {
        return customerId;
    }

    public void setCustomerId(String customerId) {
        this.customerId = customerId;
    }

    public String getPaymentMethodId() {
        return paymentMethodId;
    }

    public void setPaymentMethodId(String paymentMethodId) {
        this.paymentMethodId = paymentMethodId;
    }

    public String getConfirmationMethod() {
        return confirmationMethod;
    }

    public void setConfirmationMethod(String confirmationMethod) {
        this.confirmationMethod = confirmationMethod;
    }
}

