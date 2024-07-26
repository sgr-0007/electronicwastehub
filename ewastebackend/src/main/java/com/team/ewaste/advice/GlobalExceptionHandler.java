package com.team.ewaste.advice;

import com.team.ewaste.common.response.Result;
import com.team.ewaste.exception.BusinessException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * @author Kyle
 * @date 2024/02/26
 *
 * Configure global exception handling
 */
@Slf4j
@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(BusinessException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ResponseBody
    public Object handleBusinessException(BusinessException e) {
        log.info(e.getMessage());
        return new Result<>(500, e.getMessage(), null);
    }

    @ExceptionHandler(RuntimeException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ResponseBody
    public Object handleRuntimeException(RuntimeException e) {
        return new Result<>(500, e.getMessage(), null);
    }

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ResponseBody
    public Object handleException(Exception e) {
        return new Result<>(500, e.getMessage(), null);
    }
}
