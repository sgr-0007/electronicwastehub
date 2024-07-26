package com.team.ewaste.service.impl;

import com.team.ewaste.pojo.BO.AccountLoginBO;
import com.team.ewaste.pojo.DO.RoleDO;
import com.team.ewaste.pojo.DO.UserDO;
import com.team.ewaste.pojo.DTO.AccountEditDTO;
import com.team.ewaste.pojo.DTO.AccountLoginDTO;
import com.team.ewaste.pojo.DTO.AccountRegisterDTO;
import com.team.ewaste.pojo.VO.AccountLoginVO;
import com.team.ewaste.repo.RoleRepo;
import com.team.ewaste.repo.UserRepo;
import com.team.ewaste.service.AccountService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.Objects;

/**
 * @author Haoyu
 * @date 2024/03/02
 */

@Service
@Slf4j
public class AccountServiceImpl implements AccountService {
    private final UserRepo userRepo;
    private final RoleRepo roleRepo ;

    public AccountServiceImpl(UserRepo userRepo, RoleRepo roleRepo) {
        this.userRepo = userRepo;
        this.roleRepo = roleRepo;
    }

    @Override
    public AccountLoginVO login(AccountLoginDTO accountLoginDTO) {
        AccountLoginBO accountLoginBO = new AccountLoginBO();
        BeanUtils.copyProperties(accountLoginDTO, accountLoginBO);
        UserDO userDO = userRepo.searchByUserEmail(accountLoginBO.getUserEmail());
        if (Objects.isNull(userDO)) {
            return null;
        }
        if (!accountLoginDTO.getPassword().equals(userDO.getPassword())) {
            return null;
        }
        if(!userDO.getIsActive())
        {
            return new AccountLoginVO()
                    .setActive(false);
        }

        return new AccountLoginVO()
                .setId(userDO.getUserId())
                .setUserEmail(userDO.getUserEmail())
                .setRoleId(userDO.getRoleId().getRoleId())
                .setRole(userDO.getRoleId().getRole())
                .setActive(true);
    }

    @Override
    public void register(AccountRegisterDTO accountRegisterDTO) {
        RoleDO roleDO;
        roleDO= roleRepo.findById(accountRegisterDTO.getRoleId());
        UserDO userDO = new UserDO();
        BeanUtils.copyProperties(accountRegisterDTO, userDO);
        userDO.setRoleId(roleDO);
        userRepo.save(userDO);
    }

    @Override
    public void editUserInfo(AccountEditDTO accountEditDTO) {

        RoleDO roleDO;
        roleDO= roleRepo.findById(accountEditDTO.getRoleId());

        // data object User
        UserDO userDO ;
        userDO= userRepo.findById(accountEditDTO.getUserId());
        userDO.setUserEmail(accountEditDTO.getUserEmail());
        userDO.setName(accountEditDTO.getName());
        userDO.setIsActive(accountEditDTO.getIsActive());

        userDO.setRoleId(roleDO);

        userRepo.save(userDO);
    }
}
