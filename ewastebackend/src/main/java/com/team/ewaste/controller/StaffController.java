package com.team.ewaste.controller;

import com.team.ewaste.common.response.Result;
import com.team.ewaste.pojo.BO.AccountInfoBO;
import com.team.ewaste.pojo.DTO.DeviceDetailDTO;
import com.team.ewaste.service.StaffService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author Kyle
 * @date 2024/03/02
 * <p>
 * Staff Controller
 */
@Slf4j
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/staff")
@Api(tags = "Staff")
public class StaffController {

    private final StaffService staffService;

    public StaffController(StaffService staffService) {
        this.staffService = staffService;
    }

    /**
     * create device detail
     * @param deviceDetailDTO
     * @return
     */
    @PostMapping("/device/detail")
    @ApiOperation("create device detail")
    public ResponseEntity<Map<String, Object>> createDeviceDetail(@RequestBody DeviceDetailDTO deviceDetailDTO) {
        Integer deviceDetailId = staffService.createDeviceDetail(deviceDetailDTO);
        if (deviceDetailId == 0) {
            return ResponseEntity.badRequest().body(Collections.singletonMap("message", "Staff failed to create new device details"));
        }

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("deviceDetailId", deviceDetailId);
        return ResponseEntity.ok(response);
    }

    /**
     * view devices' status
     * @param deviceDetailId
     * @return
     */
    @GetMapping("/device/status/{deviceDetailId}")
    @ApiOperation("view devices' status")
    public Result<?> viewDeviceStatus(@PathVariable Integer deviceDetailId) {
        String status = staffService.viewDeviceStatus(deviceDetailId);
        return Result.success(status);
    }

    /**
     * update devices' status
     * @param deviceDetailsId
     * @param statusId
     * @return
     */
    @PutMapping("/device/status")
    @ApiOperation("update devices' status")
    public Result<?> updateDeviceStatus(@RequestParam("deviceDetailsId") Integer deviceDetailsId, @RequestParam("statusId") Integer statusId) {
        staffService.updateDeviceStatus(deviceDetailsId, statusId);
        return Result.success();
    }

    @PutMapping("/device/referral")
    @ApiOperation("update devices' referral")
    public Result<?> updateDeviceReferral(@RequestParam("deviceDetailsId") Integer deviceDetailsId) {
        staffService.updateDeviceReferral(deviceDetailsId);
        return Result.success();
    }

    @PutMapping("/user/loyaltypoints")
    @ApiOperation("update owners' loyal")
    public Result<?> updateLoyaltyPoints(@RequestParam("loyaltyPoints") Integer loyaltyPoints, @RequestParam("userId") Integer userId) {
        staffService.updateLoyaltyPoints(loyaltyPoints, userId);
        return Result.success();
    }

    /**
     * query page user
     * @return
     */
    @GetMapping("/findall/user")
    @ApiOperation("find all user")
    public Result<List<AccountInfoBO>> findAllUsers() {
        return Result.success(staffService.findAllUsers());
    }

    @PutMapping("/device/classify")
    @ApiOperation("classify device")
    public Result<?> updateClassifyDevice(@RequestParam Integer deviceClassificationId, @RequestParam String deviceClassification) {
        staffService.updateClassifyDevice(deviceClassificationId, deviceClassification);
        return Result.success();
    }

}
