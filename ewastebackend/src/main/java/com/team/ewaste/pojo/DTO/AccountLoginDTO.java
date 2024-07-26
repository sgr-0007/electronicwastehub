package com.team.ewaste.pojo.DTO;

import lombok.*;
import lombok.experimental.Accessors;
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
public class AccountLoginDTO implements Serializable {
    private String userEmail;
    private String password;
}
