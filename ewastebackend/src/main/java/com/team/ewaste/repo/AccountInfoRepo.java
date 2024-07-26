package com.team.ewaste.repo;
import com.team.ewaste.pojo.BO.AccountInfoBO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AccountInfoRepo extends JpaRepository<AccountInfoBO,Integer> {

    @Query(value = "SELECT u.name, u.userid, u.password, u.useremail, u.roleid, u.isactive,r.role,u.loyaltypoints FROM tblusers u join tblrole r on u.roleid = r.roleid", nativeQuery = true)
    List<AccountInfoBO> findAllUser();

    @Query(value = "SELECT COUNT(u.userid) FROM tblusers u JOIN tblrole r ON u.roleid = r.roleid WHERE r.roleid = 2 OR r.role = 'owner'", nativeQuery = true)
    Integer countAllOwnerByRole();


}
