package com.team.ewaste.pojo.VO;

import lombok.Data;
import lombok.experimental.Accessors;

/**
 * @author Kyle
 * @date 2024/04/10
 */
@Data
@Accessors(chain = true)
public class PaymentVO {
    private String clientSecretKey;
}
