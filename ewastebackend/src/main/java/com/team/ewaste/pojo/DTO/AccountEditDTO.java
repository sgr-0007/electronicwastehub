package com.team.ewaste.pojo.DTO;

import lombok.*;
import lombok.experimental.Accessors;

import java.io.Serializable;

/**
 * @author Kyle
 * @date 2024/03/03
 */

@Data
@Builder
@Accessors(chain = true)
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class AccountEditDTO implements Serializable {
    private Integer userId;
    private String userEmail;
    private String password;
    private Integer roleId;
    private String role;
    private Boolean isActive;
    private String name;
}
