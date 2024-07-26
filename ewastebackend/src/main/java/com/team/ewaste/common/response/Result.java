package com.team.ewaste.common.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serializable;

/**
 * @author Haoyu
 * @date 2024/03/02
 */

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Result<T> implements Serializable {

    private Integer code; // Coding: 1 for success, 0 and other numbers for failure
    private String msg; // error msg
    private T data; // data

    public static <T> Result<T> success() {
        Result<T> result = new Result<T>();
        result.code = 1;
        return result;
    }

    public static <T> Result<T> success(T object) {
        Result<T> result = new Result<T>();
        result.data = object;
        result.code = 1;
        return result;
    }

    public static <T> Result<T> error(String msg) {
        Result result = new Result();
        result.msg = msg;
        result.code = 0;
        return result;
    }

}