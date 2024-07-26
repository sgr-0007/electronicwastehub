package com.team.ewaste.service.impl;

import com.team.ewaste.common.constant.EmailConstant;
import com.team.ewaste.exception.EmailSendingException;
import com.team.ewaste.pojo.BO.SendEmailBO;
import com.team.ewaste.pojo.DO.DeviceDetailDO;
import com.team.ewaste.pojo.DO.DeviceTypeDO;
import com.team.ewaste.pojo.DO.UserDO;
import com.team.ewaste.pojo.DTO.SendEmailDTO;
import com.team.ewaste.repo.DeviceDetailRepo;
import com.team.ewaste.repo.DeviceTypeRepo;
import com.team.ewaste.repo.UserRepo;
import com.team.ewaste.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import javax.mail.internet.MimeMessage;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Objects;

/**
 * @author Kyle
 * @date 2024/03/03
 * <p>
 * User Service
 */
@Slf4j
@Service
public class UserServiceImpl implements UserService {
    private final UserRepo userRepo;
    private final DeviceDetailRepo deviceDetailRepo;
    private final DeviceTypeRepo deviceTypeRepo;

    private final JavaMailSender mailSender;

    public UserServiceImpl(UserRepo userRepo, DeviceDetailRepo deviceDetailRepo, DeviceTypeRepo deviceTypeRepo, JavaMailSender mailSender) {
        this.userRepo = userRepo;
        this.deviceDetailRepo = deviceDetailRepo;
        this.deviceTypeRepo = deviceTypeRepo;
        this.mailSender = mailSender;
    }

    @Override
    @Async
    public void sendEmail(SendEmailDTO sendEmailDTO) {
        if (Objects.isNull(sendEmailDTO)) {
            throw new IllegalArgumentException("Email send request is invalid.");
        }
        Integer userId = sendEmailDTO.getUserId();
        Integer deviceDetailsId = sendEmailDTO.getDeviceDetailsId();

        UserDO userDO = userRepo.findByUserId(userId);
        if (Objects.isNull(userDO)) {
            throw new IllegalArgumentException("User does not exist.");
        }

        DeviceDetailDO deviceDetailDO = deviceDetailRepo.findByDeviceDetailsId(deviceDetailsId);
        if (Objects.isNull(deviceDetailDO)) {
            throw new IllegalArgumentException("Device does not exist.");
        }

        DeviceTypeDO deviceTypeDO = deviceTypeRepo.findByDeviceTypeId(deviceDetailDO.getDeviceTypeId());
        if (Objects.isNull(deviceTypeDO)) {
            throw new IllegalArgumentException("Device type does not exist.");
        }

        SendEmailBO sendEmailBO = new SendEmailBO()
                .setUserEmail(userDO.getUserEmail())
                .setModel(deviceDetailDO.getModel())
                .setDeviceType(deviceTypeDO.getDeviceType())
                .setValue(deviceDetailDO.getExpectedValue());

        sendHtmlTemplateEmail(sendEmailBO);
    }

    /**
     * Send Email
     * @param sendEmailBO
     */
    private void sendHtmlTemplateEmail(SendEmailBO sendEmailBO) {
        String userEmail = sendEmailBO.getUserEmail();
        try {
            MimeMessage message = mailSender.createMimeMessage();

            message.setFrom(EmailConstant.EMAIL_SENDER);
            message.setRecipients(MimeMessage.RecipientType.TO, userEmail);
            message.setSubject(EmailConstant.EMAIL_SUBJECT);

            String htmlTemplate = readFile();
            // set email content
            String htmlContent = htmlTemplate.replace("${user}", userEmail.substring(0, userEmail.indexOf("@")))
                    .replace("${model}", sendEmailBO.getModel())
                    .replace("${deviceType}", sendEmailBO.getDeviceType());

            // set email content type
            message.setContent(htmlContent, EmailConstant.EMAIL_CONTENT_TYPE);
            // send email
            mailSender.send(message);
            log.info("Email successfully sent to user: {}", userEmail);
        } catch (Exception e) {
            // Record email sending exceptions
            log.error("Failed to send email for user: {}", userEmail);
            throw new EmailSendingException("Failed to send email for user: " + userEmail, e);
        }
    }

    /**
     * Read file
     * @return
     * @throws IOException
     */
    private String readFile() throws IOException {
        Path path = Paths.get("src/main/resources/email.html");
        return Files.readString(path, StandardCharsets.UTF_8);
    }
}
