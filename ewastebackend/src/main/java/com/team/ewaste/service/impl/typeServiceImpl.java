package com.team.ewaste.service.impl;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.team.ewaste.pojo.DO.DeviceClassificationDO;
import com.team.ewaste.pojo.DO.DeviceDetailDO;
import com.team.ewaste.pojo.DO.DeviceTypeDO;
import com.team.ewaste.repo.DeviceClassificationRepo;
import com.team.ewaste.repo.DeviceDetailRepo;
import com.team.ewaste.repo.DeviceTypeRepo;
import com.team.ewaste.service.typeService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class typeServiceImpl implements typeService{

    /**
     * @author Dai
     * 
     */
    @Autowired
    private DeviceDetailRepo DeviceDetailRepo;

    /**
     * update the device classifications and types by the device id
     * @param deviceId
     * @param newClassificationId
     * @param newDeviceTypeId
     */
    public void update(int deviceId, int newClassificationId, int newDeviceTypeId) {
        DeviceDetailDO detailDO = DeviceDetailRepo.findById(deviceId);
        if (detailDO != null) {
            detailDO.setDeviceTypeId(newDeviceTypeId);
            detailDO.setDeviceClassificationId(newClassificationId);
            DeviceDetailRepo.save(detailDO);
        } else {
            log.error("not found device with id:" + deviceId);
        }

    }
}