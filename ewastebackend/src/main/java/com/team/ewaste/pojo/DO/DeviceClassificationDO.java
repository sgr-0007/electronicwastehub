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
 * Data objects for device classification
 */
@Entity
@Table(name = "tbldeviceclassification")
@Data
@Builder
@Accessors(chain = true)
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class DeviceClassificationDO implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "deviceclassificationid")
    private Integer deviceClassificationId;

    @Column(name = "deviceclassification")
    private String deviceClassification;
}
