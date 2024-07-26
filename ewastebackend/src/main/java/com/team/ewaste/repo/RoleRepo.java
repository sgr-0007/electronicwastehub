package com.team.ewaste.repo;

import com.team.ewaste.pojo.DO.DeviceDetailDO;
import com.team.ewaste.pojo.DO.DeviceTypeDO;
import com.team.ewaste.pojo.DO.RoleDO;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

/**
 * 
 * @author dai
 */
public interface RoleRepo extends PagingAndSortingRepository<RoleDO, Long> {
    @Query("SELECT d FROM RoleDO d WHERE d.id = :id")
    RoleDO findById(@Param("id") Integer id);

    @Query("SELECT d FROM RoleDO d WHERE d.role = :role")
    RoleDO findByRole(@Param("role") String role);
}
