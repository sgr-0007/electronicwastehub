package com.team.ewaste.pojo.DO;

import lombok.*;
import lombok.experimental.Accessors;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.io.Serializable;

/**
 * @author Haoyu
 * @date 2024/02/26
 * <p>
 * Data objects for referral
 */
@Entity
@Table(name = "tblreferral")
@Data
@Builder
@Accessors(chain = true)
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class ReferralDO implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "referralid")
    private Integer referralId;

    @Column(name = "devicedetailsid")
    private Integer deviceDetailsId;

    @Column(name = "ownerid")
    private Integer ownerId;

    @Column(name = "referralpoints")
    private Double referralPoints;
}
