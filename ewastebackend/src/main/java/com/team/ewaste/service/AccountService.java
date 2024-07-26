package com.team.ewaste.service;

import com.team.ewaste.pojo.DTO.AccountEditDTO;
import com.team.ewaste.pojo.DTO.AccountLoginDTO;
import com.team.ewaste.pojo.DTO.AccountRegisterDTO;
import com.team.ewaste.pojo.VO.AccountLoginVO;

/**
 * @author Haoyu
 * @date 2024/03/02
 */

public interface AccountService {
    AccountLoginVO login(AccountLoginDTO accountLoginDTO);
    void register(AccountRegisterDTO accountRegisterDTO);

    /**
     * edit user infomation
     * @param accountEditDTO
     * @return
     */
    void editUserInfo(AccountEditDTO accountEditDTO);
}
