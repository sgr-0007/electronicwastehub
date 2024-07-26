package com.team.ewaste.service;

import com.team.ewaste.pojo.DTO.SendEmailDTO;

/**
 * @author Kyle
 * @date 2024/03/03
 */
public interface UserService {
    /**
     * Send Email
     * @param sendEmailDTO
     */
    void sendEmail(SendEmailDTO sendEmailDTO);
}
