package com.team.ewaste.service;

import com.team.ewaste.pojo.BO.AccountInfoBO;
import com.team.ewaste.pojo.DTO.DeviceDetailDTO;

import java.util.List;

/**
 * @author Kyle
 * @date 2024/03/02
 */
public interface StaffService {
    /**
     * create device detail
     * @param deviceDetailDTO
     * @return count
     */
    Integer createDeviceDetail(DeviceDetailDTO deviceDetailDTO);

    /**
     * view devices' status
     * @param deviceDetailId
     * @return status
     */
    String viewDeviceStatus(Integer deviceDetailId);

    /**
     * update devices' status
     * @param statusId
     * @param deviceDetailsId
     */
    void updateDeviceStatus(Integer deviceDetailsId, Integer statusId);


    void updateDeviceReferral(Integer deviceDetailsId);


    void updateLoyaltyPoints(Integer loyaltyPoints, Integer userId);


    /**
     *
     * query page user
     * @return
     */
    List<AccountInfoBO> findAllUsers();

    void updateClassifyDevice(Integer deviceClassificationId, String deviceClassification);
}
