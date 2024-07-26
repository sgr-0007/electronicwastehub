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
 * Data objects for QR Code usage
 */
@Setter
@Getter
@Entity
@Table(name = "tblqrusage")
@Data
@Builder
@Accessors(chain = true)
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class QRUsageDO implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "qrusageid", columnDefinition = "BINARY(16)")
    private String qrUsageId; 


    @Column(name = "isused")
    private Boolean isUsed;
}
