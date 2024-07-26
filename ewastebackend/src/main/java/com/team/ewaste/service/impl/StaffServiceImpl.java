package com.team.ewaste.service.impl;

import com.team.ewaste.pojo.BO.AccountInfoBO;
import com.team.ewaste.pojo.DO.DeviceDetailDO;
import com.team.ewaste.pojo.DO.StatusDO;
import com.team.ewaste.pojo.DTO.DeviceDetailDTO;
import com.team.ewaste.repo.*;
import com.team.ewaste.service.StaffService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Objects;

/**
 * @author Kyle
 * @date 2024/03/02
 * Staff service implementation
 */
@Slf4j
@Service
public class StaffServiceImpl implements StaffService {
    private final DeviceDetailRepo deviceDetailRepo;
    private final DeviceTypeRepo deviceTypeRepo;
    private final DeviceClassificationRepo deviceClassificationRepo;
    private final StatusRepo statusRepo;
    private final UserRepo userRepo;
    private final AccountInfoRepo accountInfoRepo;


    public StaffServiceImpl(DeviceDetailRepo deviceDetailRepo, DeviceTypeRepo deviceTypeRepo, DeviceClassificationRepo deviceClassificationRepo, StatusRepo statusRepo, UserRepo userRepo, AccountInfoRepo accountInfoRepo) {
        this.deviceDetailRepo = deviceDetailRepo;
        this.deviceTypeRepo = deviceTypeRepo;
        this.deviceClassificationRepo = deviceClassificationRepo;
        this.statusRepo = statusRepo;
        this.userRepo = userRepo;
        this.accountInfoRepo = accountInfoRepo;
    }

    @Override
    public Integer createDeviceDetail(DeviceDetailDTO deviceDetailDTO) {
        DeviceDetailDO deviceDetailDO = new DeviceDetailDO()
                .setUserId(deviceDetailDTO.getUserId())
                .setModel(deviceDetailDTO.getModel())
                .setDeviceTypeId(deviceDetailDTO.getDeviceTypeId())
                .setDeviceClassificationId(deviceDetailDTO.getDeviceClassificationId())
                .setExpectedValue(deviceDetailDTO.getExpectedValue())
                .setBrand(deviceDetailDTO.getBrand())
                .setDataTransferFee(deviceDetailDTO.getDataTransferFee())
                .setIsDraft(deviceDetailDTO.getIsDraft())
                .setStatusId(deviceDetailDTO.getStatusId())
                .setIsActive(deviceDetailDTO.getIsActive())
                .setCex(deviceDetailDTO.getCex());

        deviceDetailDO = deviceDetailRepo.save(deviceDetailDO);

        if (Objects.isNull(deviceDetailDO.getDeviceDetailsId())) {
            log.error("Staff failed to create new device details");
            return 0;
        }
        return deviceDetailDO.getDeviceDetailsId();
    }

    @Override
    public String viewDeviceStatus(Integer deviceDetailsId) {
        DeviceDetailDO deviceDetailDO = deviceDetailRepo.findByDeviceDetailsId(deviceDetailsId);
        StatusDO statusDO = statusRepo.findByStatusId(deviceDetailDO.getStatusId());
        return statusDO.getStatus();
    }

    @Override
    @Transactional
    public void updateDeviceStatus(Integer deviceDetailsId, Integer statusId) {
        int count = deviceDetailRepo.updateStatusIdByDeviceDetailsId(deviceDetailsId, statusId);
        if (count == 0) {
            log.error("Staff failed to update device status");
        }
    }
    @Override
    @Transactional
    public void updateDeviceReferral(Integer deviceDetailsId) {
        int count = deviceDetailRepo.updateReferralByDeviceDetailsId(deviceDetailsId);
        if (count == 0) {
            log.error("Staff failed to update device referral");
        }
    }

    /**
     * query page user
     * @return
     */
    @Override
    public List<AccountInfoBO> findAllUsers() {
        List<AccountInfoBO> userDOList = accountInfoRepo.findAllUser();

        return userDOList;
    }

    @Override
    @Transactional
    public void updateLoyaltyPoints(Integer loyaltyPoints, Integer userId) {
       Integer res = userRepo.updateLoyaltyPointsByUser(loyaltyPoints, userId);
        if (res == 0) {
            log.error("Error updating LoyaltyPoints");
        }

    }

    @Override
    @Transactional
    public void updateClassifyDevice(Integer deviceClassificationId, String deviceClassification) {
        int count = deviceClassificationRepo.updateDeviceClassification(deviceClassificationId, deviceClassification);
        if (count == 0) {
            log.error("Device status update failed!!!");
        }
    }
}
