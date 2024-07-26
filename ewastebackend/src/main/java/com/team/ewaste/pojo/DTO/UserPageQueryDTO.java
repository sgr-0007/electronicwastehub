package com.team.ewaste.pojo.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

import java.io.Serializable;

/**
 * @author Kyle
 * @date 2024/03/06
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Accessors(chain = true)
public class UserPageQueryDTO implements Serializable {
    // page number
    private int page;

    // display number of records per page
    private int pageSize;
}
