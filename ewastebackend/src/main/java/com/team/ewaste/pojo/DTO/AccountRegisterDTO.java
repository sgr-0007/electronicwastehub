package com.team.ewaste.pojo.DTO;

import com.sun.istack.NotNull;
import lombok.*;
import lombok.experimental.Accessors;

/**
 * @author Haoyu
 * @date 2024/03/02
 */

@Data
@Builder
@Accessors(chain = true)
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class AccountRegisterDTO {
    private String userEmail;
    private String password;
    private String role;
    private String name;
    private Boolean isActive;
    private Integer roleId;

}
