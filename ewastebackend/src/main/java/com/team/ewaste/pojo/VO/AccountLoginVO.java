package com.team.ewaste.pojo.VO;

import lombok.*;
import lombok.experimental.Accessors;

import java.io.Serializable;

/**
 * @author Haoyu
 * @date 2024/03/02
 */

@Data
@EqualsAndHashCode
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Accessors(chain = true)
public class AccountLoginVO implements Serializable {
    private Integer id;
    private String userEmail;
    private Integer roleId;
    private String role;
    private boolean isActive;
}
