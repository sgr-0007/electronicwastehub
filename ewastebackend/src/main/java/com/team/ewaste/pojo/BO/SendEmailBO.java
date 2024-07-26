package com.team.ewaste.pojo.BO;

import lombok.*;
import lombok.experimental.Accessors;

import java.io.Serializable;

/**
 * @author Kyle
 * @date 2024/03/03
 * <p>
 * business object for send email to user
 */
@Data
@EqualsAndHashCode
@Builder
@Accessors(chain = true)
@AllArgsConstructor
@NoArgsConstructor
public class SendEmailBO implements Serializable {
    private String userEmail;
    private String model;
    private String deviceType;
    private double value;
}
