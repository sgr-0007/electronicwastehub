package com.team.ewaste.service.impl;

import com.team.ewaste.pojo.DO.RoleDO;
import com.team.ewaste.pojo.DO.UserDO;
import com.team.ewaste.repo.UserRepo;
import com.team.ewaste.service.RoleService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

/**
 * @author Dai
 * <p>
 * admin update role for members to staff
 */
@Slf4j
@Service
public class RoleServiceImpl implements RoleService {

    private final UserRepo userRepository;

    public RoleServiceImpl(UserRepo userRepository) {
        this.userRepository = userRepository;
    }

    public void upgradeRole(int adminUserId, int memberUserId, String role) {
        UserDO adminUser = userRepository.findById(adminUserId);
        if (adminUser == null) {
            log.error("Admin user not found with ID: {}", adminUserId);
            return;
        }

        // TODO: adminUser.getRoleId().getRole().equals("admin")) will print err,
        //  need change to !adminUser.getRoleId().getRole().equals("admin")
        if (adminUser.getRoleId().getRole().equals("admin")) {
            log.error("Admin user does not have permission to upgrade roles.");
            return;
        }

        UserDO memberUser = userRepository.findById(memberUserId);
        if (memberUser == null) {
            log.error("Member user not found with ID: {}", memberUserId);
            return;
        }

        // update to role 1: employee
        //not update to admin
        RoleDO roleDO = memberUser.getRoleId();
        roleDO.setRole(role);
        memberUser.setRoleId(roleDO);
        userRepository.save(memberUser);
    }
}

