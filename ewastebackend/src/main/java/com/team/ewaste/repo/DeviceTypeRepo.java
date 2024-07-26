package com.team.ewaste.repo;

import com.team.ewaste.pojo.DO.DeviceTypeDO;
import com.team.ewaste.pojo.DO.RoleDO;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

/**
 * @author Kyle
 * @date 2024/02/26
 * 
 * @editor Dai
 */
public interface DeviceTypeRepo extends PagingAndSortingRepository<DeviceTypeDO, Long> {
    DeviceTypeDO findByDeviceTypeId(Integer deviceTypeId);
    
    @Query("SELECT d FROM DeviceTypeDO d WHERE d.id = :id")
    DeviceTypeDO findById(@Param("id") Integer id);

    @Query("SELECT COUNT(d.deviceTypeId) FROM DeviceTypeDO d WHERE d.deviceTypeId = 1 OR d.deviceType = 'Smartphone'")
    Integer countSmartphoneByDeviceTypeId();

    @Query("SELECT COUNT(d.deviceTypeId) FROM DeviceTypeDO d WHERE d.deviceTypeId = 2 OR d.deviceType = 'Laptop'")
    Integer countLaptopByDeviceTypeId();

    @Query("SELECT COUNT(d.deviceTypeId) FROM DeviceTypeDO d WHERE d.deviceTypeId = 3 OR d.deviceType = 'Tablet'")
    Integer countTabletByDeviceTypeId();
}
