package com.team.ewaste.pojo.VO;

import lombok.*;
import lombok.experimental.Accessors;

import java.io.Serializable;

/**
 * @author Kyle
 * @date 2024/04/23
 */
@Data
@EqualsAndHashCode
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Accessors(chain = true)
public class StatisticsDataVO implements Serializable {

    private Integer totalNumberOfOwners;
    private Integer totalNumberOfDevices;
    private Integer totalNumberOfSmartphones;
    private Integer totalNumberOfLaptops;
    private Integer totalNumberOfTablets;

}
