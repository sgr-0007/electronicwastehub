package com.team.ewaste.service.impl;

import com.team.ewaste.pojo.VO.StatisticsDataVO;
import com.team.ewaste.repo.AccountInfoRepo;
import com.team.ewaste.repo.DeviceDetailRepo;
import com.team.ewaste.repo.DeviceTypeRepo;
import com.team.ewaste.service.StatisticsService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

/**
 * @author Kyle
 * @date 2024/04/23
 */
@Service
@Slf4j
public class StatisticsServiceImpl implements StatisticsService {

    private final AccountInfoRepo accountInfoRepo;
    private final DeviceTypeRepo deviceTypeRepo;
    private final DeviceDetailRepo deviceDetailRepo;

    public StatisticsServiceImpl(AccountInfoRepo accountInfoRepo, DeviceTypeRepo deviceTypeRepo, DeviceDetailRepo deviceDetailRepo) {
        this.accountInfoRepo = accountInfoRepo;
        this.deviceTypeRepo = deviceTypeRepo;
        this.deviceDetailRepo = deviceDetailRepo;
    }

    @Override
    public StatisticsDataVO getAllStatistics() {

        Integer countAllNumberOwner = accountInfoRepo.countAllOwnerByRole();
        Integer countAllNumberSmartphone = deviceTypeRepo.countSmartphoneByDeviceTypeId();
        Integer countAllNumberTablet = deviceTypeRepo.countTabletByDeviceTypeId();
        Integer countAllNumberLaptop = deviceTypeRepo.countLaptopByDeviceTypeId();
        Integer countAllNumberDevice = deviceDetailRepo.countAllDevice();

        return StatisticsDataVO.builder()
                .totalNumberOfOwners(countAllNumberOwner)
                .totalNumberOfDevices(countAllNumberDevice)
                .totalNumberOfTablets(countAllNumberTablet)
                .totalNumberOfSmartphones(countAllNumberSmartphone)
                .totalNumberOfLaptops(countAllNumberLaptop)
                .build();
    }
}
