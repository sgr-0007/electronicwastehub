package com.team.ewaste.repo;

import com.team.ewaste.pojo.DO.QRUsageDO;
import org.springframework.data.repository.PagingAndSortingRepository;

/**
 * @author Kyle
 * @date 2024/02/26
 */
public interface QRUsageRepo extends PagingAndSortingRepository<QRUsageDO, String> {
}
