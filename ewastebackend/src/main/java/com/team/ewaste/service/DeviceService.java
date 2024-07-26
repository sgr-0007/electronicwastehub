package com.team.ewaste.service;

import com.team.ewaste.pojo.BO.DeviceDetailBO;
import com.team.ewaste.pojo.DO.DeviceDetailDO;
import com.team.ewaste.pojo.DTO.DeviceUpdateDetailDTO;

import java.util.List;

public interface DeviceService {
    public DeviceDetailDO getDeviceById(int devicedetailedId);
    public void updateDevice(DeviceDetailDO device);

    /**
     * Get all devices
     * @return
     */
    List<DeviceDetailBO> getAllDevices();

    /**
     * update device detail by device id
     * @param deviceUpdateDetailDTO
     */
    void updateDeviceDetailById(DeviceUpdateDetailDTO deviceUpdateDetailDTO);
}
