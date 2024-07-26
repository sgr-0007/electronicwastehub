package com.team.ewaste.pojo.VO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ThirdPartyListingVO {
    private String provider;
    private String deviceName;
    private double expectedValue;
}

