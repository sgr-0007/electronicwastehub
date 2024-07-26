package com.team.ewaste.controller;

import com.team.ewaste.common.response.Result;
import com.team.ewaste.pojo.DTO.AccountEditDTO;
import com.team.ewaste.pojo.DTO.AccountLoginDTO;
import com.team.ewaste.pojo.DTO.AccountRegisterDTO;
import com.team.ewaste.pojo.VO.AccountLoginVO;
import com.team.ewaste.service.AccountService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;

/**
 * @author Kyle
 * @date 2024/02/27
 */
@Slf4j
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/account")
@Api(tags = "Account")
public class AccountController {

    private final AccountService accountService;

    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

    @PostMapping("/login")
    @ApiOperation("Account Login")
    public Result<AccountLoginVO> login(@RequestBody AccountLoginDTO accountLoginDTO) {
        AccountLoginVO accountLoginVO = accountService.login(accountLoginDTO);
        if (Objects.isNull(accountLoginVO)) {
            return Result.error("User Not Found");
        }
        return new Result<>(1, "", accountLoginVO);
    }

    @PostMapping("/register")
    @ApiOperation("User Registration")
    public Result<?> register(@RequestBody AccountRegisterDTO accountRegisterDTO) {
        accountService.register(accountRegisterDTO);
        return Result.success();
    }

    /**
     * Edit User Info
     * @param accountEditDTO
     * @return
     */
    @PutMapping("/edit/info")
    @ApiOperation("Edit user info")
    public Result<?> editInfo(@RequestBody AccountEditDTO accountEditDTO) {
        accountService.editUserInfo(accountEditDTO);
        return Result.success();
    }
}
