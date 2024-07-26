package com.team.ewaste.pojo.DO;

import lombok.*;
import lombok.experimental.Accessors;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

/**
 * @author Haoyu
 * @date 2024/02/25
 * <p>
 * Data objects for role
 */
@Entity
@Table(name = "tblrole")
@Data
@Builder
@Accessors(chain = true)
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class RoleDO implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "roleid")
    private Integer roleId;
    private String role;
}
