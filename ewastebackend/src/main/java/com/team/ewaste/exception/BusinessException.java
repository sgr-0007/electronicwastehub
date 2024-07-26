package com.team.ewaste.exception;

import com.team.ewaste.common.response.Result;
import lombok.Data;

import java.text.MessageFormat;

/**
 * @author Kyle
 * @date 2024/02/26
 *
 * Define business exception classes
 */
@Data
public class BusinessException extends RuntimeException {
    private final int code;
    private final String message;
    private final Result<?> result;

    public BusinessException(Result<?> result) {
        this("", result, null);
    }

    public BusinessException(String message, Result<?> result) {
        this(message, result, null);
    }

    public BusinessException(String message, Result<?> result, Object[] args) {
        super(message == null ? result.getMsg() : message);
        this.code = result.getCode();
        this.result = result;
        this.message = MessageFormat.format(result.getMsg(), args);
    }
}
