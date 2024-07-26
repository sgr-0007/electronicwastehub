package com.team.ewaste.service.impl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.team.ewaste.pojo.DO.QRUsageDO;
import com.team.ewaste.repo.QRUsageRepo;
import com.team.ewaste.service.QRcodeService;

/**
 * @author Dai
 */

@Service
public class QRcodeServiceImpl implements QRcodeService {
    @Autowired
    private QRUsageRepo QRrepo;

    public QRUsageDO getDeviceById(String code) {
        return QRrepo.findById(code).orElse(null);
    }

    public void updateState(QRUsageDO qr) {
        QRrepo.save(qr);
    }
}
