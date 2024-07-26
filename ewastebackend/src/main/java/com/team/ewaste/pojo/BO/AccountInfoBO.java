package com.team.ewaste.pojo.BO;

import lombok.*;
import lombok.experimental.Accessors;

import javax.persistence.Entity;
import javax.persistence.Id;
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
@Entity
public class AccountInfoBO implements Serializable {
    @Id
    private Integer userid;
    private String useremail;
    private String password;
    private Integer roleid;
    private Boolean isactive;
    private String role;
    private  String name;
    private  Integer loyaltypoints;


}
