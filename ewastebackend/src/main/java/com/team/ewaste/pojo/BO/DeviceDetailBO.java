package com.team.ewaste.pojo.BO;

import lombok.*;
import lombok.experimental.Accessors;

import java.io.Serializable;
import java.util.Date;

/**
 * @author Kyle
 * @date 2024/03/02
 * <p>
 * Business Object Device Detail
 */
@Data
@Builder
@Accessors(chain = true)
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class DeviceDetailBO implements Serializable {
    private Integer deviceDetailsId;
    private Integer userId;
    private Integer imageId;
    private String name;
    private String brand;
    private String model;
    private Integer deviceTypeId;
    private Integer deviceClassificationId;
    private Double expectedValue;
    private Double dataTransferFee;
    private Integer statusId;
    private Boolean isDraft;
    private Boolean isActive;
    private String imageData;
    private Date createdDate;
    private String cex;
    private Integer payment;
    private Integer referral;




}
