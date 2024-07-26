package com.team.ewaste.repo;

import com.team.ewaste.pojo.DO.StatusDO;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;

/**
 * @author Kyle
 * @date 2024/02/26
 */
public interface StatusRepo extends PagingAndSortingRepository<StatusDO, Long> {

    StatusDO findByStatusId(@Param("statusId") Integer statusId);

    @Transactional
    @Modifying
    @Query("Update StatusDO st set st.status=:status where st.statusId=:statusId")
    Integer updateByStatusId(@Param("statusId") Integer statusId, @Param("status") String status);
}
