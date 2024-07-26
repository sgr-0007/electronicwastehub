package com.team.ewaste.pojo.BO;

import com.team.ewaste.pojo.DO.RoleDO;
import lombok.*;
import lombok.experimental.Accessors;
import javax.persistence.*;
import java.io.Serializable;

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
public class AccountLoginBO implements Serializable {
    private Integer userId;
    private String userEmail;
    private String password;
    private Integer roleId;
    private String role;
}
