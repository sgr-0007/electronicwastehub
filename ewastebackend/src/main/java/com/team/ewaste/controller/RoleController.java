package com.team.ewaste.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.team.ewaste.common.response.Result;
import com.team.ewaste.service.impl.RoleServiceImpl;
/**
 * @author Dai
 */

@RestController
@RequestMapping("/staff")
public class RoleController {

    @Autowired
    private RoleServiceImpl roleService;

    /**
     * Admin update  other account's role by id
     * @param adminUserId admin id
     * @param memberUserId member user to be updated
     * @param role role number
     * @return
     */
    @PutMapping("/updateRole")
    public Result<?> upgradeRole(@RequestParam("adminUserId") int adminUserId,
                                              @RequestParam("memberUserId") int memberUserId,
                                              @RequestParam("role") String role){
        try {
            roleService.upgradeRole(adminUserId, memberUserId, role);
            return Result.success();
        } catch (Exception e) {
            return Result.error(e.getMessage());
        }
    }
}