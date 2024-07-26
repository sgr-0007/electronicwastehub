package com.team.ewaste.controller;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;


import com.google.zxing.BarcodeFormat;
import com.google.zxing.EncodeHintType;
import com.google.zxing.WriterException;
import com.google.zxing.qrcode.QRCodeWriter;
import com.team.ewaste.pojo.DO.QRUsageDO;
import com.team.ewaste.service.impl.QRcodeServiceImpl;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.client.j2se.MatrixToImageWriter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.team.ewaste.common.response.*;; // Import the correct Result class

@RestController
@RequestMapping("/qrcode")
public class QRcodeController {

    @Autowired
    private QRcodeServiceImpl QRService;

    /**
     * generate QR codes from a random uuid 
     * @return qrcode in byte array format
     */
    @GetMapping("/generate")
    public Result<byte[]> generateQRCode() { // Parameterize Result with byte[]
        String code = generateRandomCode();
        
        byte[] qrCodeImageBase64 = generateQRCodeImageBase64(code);
        if(qrCodeImageBase64!=null){
            QRUsageDO qrUsage = new QRUsageDO();
            qrUsage.setQrUsageId(code);
            qrUsage.setIsUsed(false);
            QRService.updateState(qrUsage);
            
            return Result.success(qrCodeImageBase64);
        }else{
            return Result.error("QR Code generation failed");
        }
    }

    /**
     * button click to find and update the qrcode status
     * @param qrCode
     * @return
     */
    @PostMapping("/decode/{qrCode}")
    public Result<?> decodeQRCode(@PathVariable String qrCode) {
        QRUsageDO qrUsage=QRService.getDeviceById(qrCode);
        if (qrUsage==null) {
            return Result.error("QR Code not found");
        }else{
            if(qrUsage.getIsUsed()==true) {
                return Result.error("QR Code has been used");
            }else{
                // Mark the QR code as used
                qrUsage.setIsUsed(true);
                
                QRService.updateState(qrUsage);
                return Result.success();
            }
        }
    }

    /**
     * generate uuid
     * @return uuid in String format
     */
    private String generateRandomCode() {
        return UUID.randomUUID().toString();
    }


    /**
     * generate qr code
     * @param code
     * @return qr code image in byte array format
     */
    private byte[] generateQRCodeImageBase64(String code) {
        QRCodeWriter qrCodeWriter = new QRCodeWriter();
        Map<EncodeHintType, Object> hints = new HashMap<>();
        hints.put(EncodeHintType.CHARACTER_SET, "UTF-8");
        try {
            BitMatrix bitMatrix = qrCodeWriter.encode(code, BarcodeFormat.QR_CODE, 200, 200, hints);
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            MatrixToImageWriter.writeToStream(bitMatrix, "PNG", outputStream);
            byte[] imageBytes = outputStream.toByteArray();
            return imageBytes;
        } catch (WriterException | IOException e) {
            e.printStackTrace();
            return null;
        }
    }

}