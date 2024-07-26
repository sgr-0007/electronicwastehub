package com.team.ewaste.repo;

import com.team.ewaste.pojo.DO.DeviceDetailDO;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

/**
 * @author Kyle
 * @date 2024/02/26
 * 
 * @editor Dai
 * @date 2024.3.12
 */
public interface DeviceDetailRepo extends PagingAndSortingRepository<DeviceDetailDO, Long> {
    DeviceDetailDO findByDeviceDetailsId(Integer deviceDetailsId);

    @Modifying
    @Query("update DeviceDetailDO set statusId=:statusId where deviceDetailsId = :deviceDetailsId")
    Integer updateStatusIdByDeviceDetailsId(@Param("deviceDetailsId") Integer deviceDetailsId, @Param("statusId") Integer statusId);

    @Modifying
    @Query("update DeviceDetailDO set referral=1 where deviceDetailsId = :deviceDetailsId")
    Integer updateReferralByDeviceDetailsId(@Param("deviceDetailsId") Integer deviceDetailsId);

    @Query("SELECT d FROM DeviceDetailDO d WHERE d.id = :id")
    DeviceDetailDO findById(@Param("id") Integer id);

    @Modifying
    @Query("UPDATE DeviceDetailDO d SET d.model = :model, d.userId = :userId, d.brand = :brand, " +
            "d.deviceClassificationId = :deviceClassificationId, d.deviceTypeId = :deviceTypeId, " +
            "d.expectedValue = :expectedValue,d.statusId = :statusId WHERE d.deviceDetailsId = :deviceDetailsId")
    void updateByDeviceDetailsId(@Param("deviceDetailsId") Integer deviceDetailsId,
                                 @Param("model") String model,
                                 @Param("userId") Integer userId,
                                 @Param("brand") String brand,
                                 @Param("deviceClassificationId") Integer deviceClassificationId,
                                 @Param("deviceTypeId") Integer deviceTypeId,
                                 @Param("expectedValue") Double expectedValue,
                                 @Param("statusId") Integer statusId);

    @Modifying
    @Query("UPDATE DeviceDetailDO d SET d.imageData = :imageData WHERE d.deviceDetailsId = :deviceDetailsId")
    void updateImageDataByDeviceDetailsId(@Param("deviceDetailsId") Integer deviceDetailsId, @Param("imageData") String imageData);

    @Query("SELECT d.imageData FROM DeviceDetailDO d WHERE d.deviceDetailsId = :deviceDetailsId")
    String getImageDataByDeviceDetailsId(@Param("deviceDetailsId") Integer deviceDetailsId);

    @Query(value = "SELECT COUNT(d) FROM DeviceDetailDO d")
    Integer countAllDevice();

}