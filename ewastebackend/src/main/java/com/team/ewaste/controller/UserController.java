package com.team.ewaste.controller;

import com.team.ewaste.common.response.Result;
import com.team.ewaste.pojo.DTO.SendEmailDTO;
import com.team.ewaste.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

/**
 * @author Kyle
 * @date 2024/03/03
 */
@Slf4j
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/user")
@Api(tags = "User")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    /**
     * Send Email
     * @param sendEmailDTO
     * @return
     */
    @ApiOperation("Send Email")
    @PostMapping("/device/secureemaillink")
    public Result<Void> sendEmail(@RequestBody SendEmailDTO sendEmailDTO) {
        userService.sendEmail(sendEmailDTO);
        return Result.success();
    }
}
