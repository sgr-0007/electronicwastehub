package com.team.ewaste.common.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;

/**
 * @author Kyle
 * @date 2024/03/06
 * <p>
 * Encapsulate paging query results
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PageResult implements Serializable {
    // total page size
    private long totalPageSize;
    // total page size
    private long totalElements;
    // list of data
    private List<?> records;
}