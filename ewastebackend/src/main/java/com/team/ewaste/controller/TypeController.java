package com.team.ewaste.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.team.ewaste.common.response.Result;
import com.team.ewaste.service.impl.typeServiceImpl;
/**
 * @author Dai
 */

@RestController
@RequestMapping("/staff/device")
public class TypeController {

    @Autowired
    private typeServiceImpl deviceService;
    /**
     * Staff update the device type and classification id
     * @param deviceId
     * @param newClassificationId
     * @param newDeviceTypeId
     * @return
     */
    @PutMapping("/type")
    public Result<?> update(@RequestParam("devicedetailid") int deviceId,
                                         @RequestParam("devicetypeid") int newClassificationId,
                                         @RequestParam("deviceclassificationid") int newDeviceTypeId) {
        try {
            deviceService.update(deviceId, newClassificationId, newDeviceTypeId);
            return Result.success();
        } catch (Exception e) {
            return Result.error(e.getMessage());
        }
    }
}