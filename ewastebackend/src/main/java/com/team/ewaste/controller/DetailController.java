package com.team.ewaste.controller;

import com.team.ewaste.common.response.Result;
import com.team.ewaste.pojo.BO.DeviceDetailBO;
import com.team.ewaste.pojo.DTO.DeviceUpdateDetailDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.team.ewaste.pojo.DO.DeviceDetailDO;
import com.team.ewaste.service.impl.DeviceServiceImpl;

import java.util.List;

/**
 * @author Dai
 */
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/devices")
public class DetailController {

    @Autowired
    private DeviceServiceImpl deviceService;
    /**
     * Staff update device details
     * @param devicedetailedId
     * @param expectedvalue
     * @param datatransferfee
     * @param isactive
     * @return
     */
    @PutMapping("/info/{devicedetailedId}")
    public Result<?> updateDevice( @PathVariable int devicedetailedId,
                                                @RequestParam(value = "expectedvalue",required = false) Double expectedvalue,
                                                @RequestParam(value = "datatransferfee",required = false) Double datatransferfee,
                                                @RequestParam(value = "isactive",required = false) Boolean isactive) {
        // find the device from device id
        DeviceDetailDO existingDevice = deviceService.getDeviceById(devicedetailedId);
        
        // not exist device detail id
        if (existingDevice == null) {
            return Result.error("Device not found");
        }
        
        // update the not null value to the current devide detail
        if (expectedvalue != null) {
            existingDevice.setExpectedValue(expectedvalue);
        }
        if (datatransferfee!= null) {
            existingDevice.setDataTransferFee(datatransferfee);
        }

        if (isactive!= null) {
            existingDevice.setIsActive(isactive);
        }

        //save the updated devide detail
        deviceService.updateDevice(existingDevice);
        
        return Result.success();    
    }

    /**
     * Staff update device visibility
     * @param devicedetailedId
     * @param isvisible
     * @return
     */
    @PutMapping("/visibility/{devicedetailedId}")
    public Result<?> updateVisivility(@PathVariable int devicedetailedId, @RequestParam("isvisible") Boolean isvisible) {
        // find the device from device id
        DeviceDetailDO existingDevice = deviceService.getDeviceById(devicedetailedId);
        
        // not exist device detail id
        if (existingDevice == null) {
            return Result.error("device not found");
        }

        // TODO isvisible=true,set statusId=2, (but isvisible=false,not set statusId=1)
        if(isvisible){
            existingDevice.setStatusId(2);
        }
        existingDevice.setIsActive(isvisible);
        deviceService.updateDevice(existingDevice);
        return Result.success();
    }

    @GetMapping("/all/devicesdetail")
    public Result getAllDevicesDetail() {
        List<DeviceDetailBO> deviceDetailBOList = deviceService.getAllDevices();
        return Result.success(deviceDetailBOList);
    }

    @PostMapping("/update/devicedetail")
    public Result updateDeviceDetailById(@RequestBody DeviceUpdateDetailDTO deviceUpdateDetailDTO) {
        deviceService.updateDeviceDetailById(deviceUpdateDetailDTO);
        return Result.success();
    }
}