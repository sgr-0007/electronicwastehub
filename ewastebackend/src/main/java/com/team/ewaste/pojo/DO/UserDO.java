package com.team.ewaste.pojo.DO;

import lombok.*;
import lombok.experimental.Accessors;

import javax.persistence.*;
import java.io.Serializable;

/**
 * @author Haoyu
 * @date 2024/02/25
 * <p>
 * Data objects for user
 */
@Getter
@Setter
@Entity
@Table(name = "tblusers")
@Data
@Builder
@Accessors(chain = true)
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class UserDO implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "userid")
    private Integer userId;

    @Column(name = "useremail")
    private String userEmail;

    @Column(name = "name")
    private String name;

    private String password;

    @Column(name = "isactive")
    private Boolean isActive;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = false)
    @JoinColumn(name = "roleid")
    private RoleDO roleId;

    @Column(name = "loyaltypoints")
    private Integer loyaltyPoints;
}


