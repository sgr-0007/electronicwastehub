package com.team.ewaste.service;

import com.team.ewaste.pojo.DO.QRUsageDO;

public interface QRcodeService {
    public QRUsageDO getDeviceById(String code);
    public void updateState(QRUsageDO qr);
}
