package com.team.ewaste.pojo.DTO;

import lombok.*;
import lombok.experimental.Accessors;

import java.io.Serializable;

/**
 * @author Kyle
 * @date 2024/04/07
 * <p>
 * dto for update device detail
 */
@Data
@Builder
@Accessors(chain = true)
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class DeviceUpdateDetailDTO implements Serializable {
    private Integer deviceDetailsId;
    private Integer userId;
    private String model;
    private String brand;
    private Integer deviceClassificationId;
    private Integer deviceTypeId;
    private Double expectedValue;
    private Integer statusId;
}
