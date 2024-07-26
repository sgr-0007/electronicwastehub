package com.team.ewaste.service.impl;

import com.team.ewaste.pojo.BO.DeviceDetailBO;
import com.team.ewaste.pojo.DO.UserDO;
import com.team.ewaste.pojo.DTO.DeviceUpdateDetailDTO;
import com.team.ewaste.repo.UserRepo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.team.ewaste.pojo.DO.DeviceDetailDO;
import com.team.ewaste.repo.DeviceDetailRepo;
import com.team.ewaste.service.DeviceService;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * @author Dai
 */
@Service
@Slf4j
public class DeviceServiceImpl implements DeviceService{

    @Autowired
    private DeviceDetailRepo deviceRepository;
    @Autowired
    private UserRepo userRepo;

    public DeviceDetailDO getDeviceById(int devicedetailedId) {
        return deviceRepository.findById(devicedetailedId);
    }

    public void updateDevice(DeviceDetailDO device) {
        deviceRepository.save(device);
    }

    @Override
    public List<DeviceDetailBO> getAllDevices() {
        Iterable<DeviceDetailDO> deviceRepositoryAll = deviceRepository.findAll();
        List<DeviceDetailDO> deviceList = StreamSupport.stream(deviceRepositoryAll.spliterator(), false)
                .collect(Collectors.toList());

        List<DeviceDetailBO> deviceDetailBOList = new ArrayList<>();
        for (DeviceDetailDO deviceDetailDO : deviceList) {
            DeviceDetailBO deviceDetailBO = new DeviceDetailBO();
            BeanUtils.copyProperties(deviceDetailDO, deviceDetailBO);
            UserDO userDO = userRepo.findByUserId(deviceDetailDO.getUserId());
            String username = userDO.getName();
            deviceDetailBO.setName(username);
            deviceDetailBOList.add(deviceDetailBO);
        }

        return deviceDetailBOList;
    }

    @Override
    @Transactional
    public void updateDeviceDetailById(DeviceUpdateDetailDTO deviceUpdateDetailDTO) {
        DeviceDetailDO deviceDetailDO = deviceRepository.findById(deviceUpdateDetailDTO.getDeviceDetailsId());
        if (deviceDetailDO == null) {
            log.error("update device detail has error, deviceDetailDO is null");
            return;
        }

        deviceRepository.updateByDeviceDetailsId(deviceUpdateDetailDTO.getDeviceDetailsId(),
                deviceUpdateDetailDTO.getModel(),
                deviceUpdateDetailDTO.getUserId(),
                deviceUpdateDetailDTO.getBrand(),
                deviceUpdateDetailDTO.getDeviceClassificationId(),
                deviceUpdateDetailDTO.getDeviceTypeId(),
                deviceUpdateDetailDTO.getExpectedValue(),
                deviceUpdateDetailDTO.getStatusId());
    }
}