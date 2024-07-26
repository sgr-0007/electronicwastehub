package com.team.ewaste.pojo.DO;

import lombok.*;
import lombok.experimental.Accessors;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

/**
 * @author Haoyu
 * @date 2024/02/26
 * <p>
 * Data objects for device details
 */
@Getter
@Setter
@Entity
@Table(name = "tbldevicedetails")
@Data
@Builder
@Accessors(chain = true)
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class DeviceDetailDO implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "devicedetailsid")
    private Integer deviceDetailsId;

    //@OneToOne
    @Column(name = "userid")
    private Integer userId;

    private String model;

    private String brand;


    //@OneToOne
    @Column(name = "devicetypeid")
    private Integer deviceTypeId;

    //@OneToOne
    @Column(name = "deviceclassificationid")
    private Integer deviceClassificationId;

    @Column(name = "expectedvalue")
    private Double expectedValue;

    @Column(name = "datatransferfee")
    private Double dataTransferFee;

    //@OneToOne
    @Column(name = "statusid")
    private Integer statusId;

    private Double bonus;

    @Column(name = "isdraft")
    private Boolean isDraft;

    @Column(name = "isactive")
    private Boolean isActive;

    @Column(name = "cex")
    private String cex;

    @Column(name = "payment")
    private Integer payment;

    @Column(name = "referral")
    private Integer referral;

    @Column(name = "imagedata")
    @Lob
    private String imageData;

    @Column(name = "createddate",updatable = false)
    @CreationTimestamp
    private Date createdDate;
}
