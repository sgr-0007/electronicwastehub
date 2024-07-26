package com.team.ewaste.pojo.DTO;

import lombok.*;
import lombok.experimental.Accessors;

import java.io.Serializable;
import java.util.Date;

/**
 * @author Kyle
 * @date 2024/03/02
 * <p>
 * Data Transfer Object Device Detail
 */
@Data
@Builder
@Accessors(chain = true)
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class DeviceDetailDTO implements Serializable {
    private Integer userId;
    private String model;
    private String brand;
    private String deviceType;
    private String deviceClassification;
    private Integer deviceTypeId;
    private Integer deviceClassificationId;
    private Double expectedValue;
    private Double dataTransferFee;
    private Boolean isDraft;
    private Boolean isActive;
    private Integer statusId;
    private Date createdDate;
    private String cex;
    private Integer payment;
    private Integer referral;


}
