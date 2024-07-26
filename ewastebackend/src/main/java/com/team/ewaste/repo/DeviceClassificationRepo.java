package com.team.ewaste.repo;

import com.team.ewaste.pojo.DO.DeviceClassificationDO;
import com.team.ewaste.pojo.DO.DeviceTypeDO;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

/**
 * @author Kyle
 * @date 2024/02/26
 * 
 * @editor Dai
 */
public interface DeviceClassificationRepo extends PagingAndSortingRepository<DeviceClassificationDO, Long> {
    @Query("SELECT d FROM DeviceClassificationDO d WHERE d.id = :id")
    DeviceClassificationDO findById(@Param("id") Integer id);

    @Modifying
    @Query("update DeviceClassificationDO set deviceClassification=:deviceClassification where deviceClassificationId = :deviceClassificationId")
    Integer updateDeviceClassification(@Param("deviceClassificationId") Integer deviceClassificationId, @Param("deviceClassification") String deviceClassification);
}

