package com.team.ewaste.service.impl;

import com.team.ewaste.repo.DeviceDetailRepo;
import com.team.ewaste.service.ImageService;
import lombok.extern.slf4j.Slf4j;
import org.junit.Test;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

/**
 * @author Kyle
 * @date 2024/04/11
 */
@Slf4j
@Service
public class ImageServiceImpl implements ImageService {

    private final DeviceDetailRepo deviceDetailRepo;

    public ImageServiceImpl(DeviceDetailRepo deviceDetailRepo) {
        this.deviceDetailRepo = deviceDetailRepo;
    }

    @Override
    @Transactional
    public void uploadImage(Integer devicedetailsd, String decodedBytes) {
        deviceDetailRepo.updateImageDataByDeviceDetailsId(devicedetailsd, decodedBytes);
    }

    @Override
    public String getImage(Integer devicedetailsid) {
        return deviceDetailRepo.getImageDataByDeviceDetailsId(devicedetailsid);
    }
}
