package com.team.ewaste.model;
public class ThirdPartyListings {
    private Long id;
    private String provider;
    private String deviceName;
    private double expectedValue;
    private double referralFee;

    public ThirdPartyListings() {
    }

    public ThirdPartyListings(Long id, String provider, String deviceName, double expectedValue, double referralFee) {
        this.id = id;
        this.provider = provider;
        this.deviceName = deviceName;
        this.expectedValue = expectedValue;
        this.referralFee = referralFee;
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getProvider() {
        return provider;
    }

    public void setProvider(String provider) {
        this.provider = provider;
    }

    public String getDeviceName() {
        return deviceName;
    }

    public void setDeviceName(String deviceName) {
        this.deviceName = deviceName;
    }

    public double getExpectedValue() {
        return expectedValue;
    }

    public void setExpectedValue(double expectedValue) {
        this.expectedValue = expectedValue;
    }

    public double getReferralFee() {
        return referralFee;
    }

    public void setReferralFee(double referralFee) {
        this.referralFee = referralFee;
    }
}


