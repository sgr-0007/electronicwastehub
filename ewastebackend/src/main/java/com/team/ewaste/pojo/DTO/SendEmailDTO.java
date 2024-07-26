package com.team.ewaste.pojo.DTO;

import lombok.*;
import lombok.experimental.Accessors;

import java.io.Serializable;

/**
 * @author Kyle
 * @date 2024/03/03
 * <p>
 * dto for send email to user
 */
@Data
@EqualsAndHashCode
@Builder
@Accessors(chain = true)
@AllArgsConstructor
@NoArgsConstructor
public class SendEmailDTO implements Serializable {
    private Integer userId;
    private Integer deviceDetailsId;
}
