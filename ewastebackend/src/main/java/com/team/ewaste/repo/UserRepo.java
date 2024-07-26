package com.team.ewaste.repo;

import com.team.ewaste.pojo.DO.UserDO;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

/**
 * @author Kyle
 * @date 2024/02/26
 */
public interface UserRepo extends PagingAndSortingRepository<UserDO, Long> {

    @Query(value = "select * from tblusers where userEmail=:userEmail", nativeQuery = true)
    UserDO searchByUserEmail(@Param("userEmail") String userEmail);

    UserDO findByUserId(@Param("userId") Integer userId);

    @Query("SELECT d FROM UserDO d WHERE d.id = :id")
    UserDO findById(@Param("id") Integer id);

    @Modifying
    @Query("UPDATE UserDO d SET d.loyaltyPoints = :loyaltyPoints + d.loyaltyPoints WHERE d.userId = :userId")
    Integer updateLoyaltyPointsByUser(@Param("loyaltyPoints") Integer loyaltyPoints, @Param("userId") Integer userId);


}
