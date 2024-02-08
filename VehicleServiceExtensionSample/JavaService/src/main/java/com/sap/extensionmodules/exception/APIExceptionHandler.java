package com.sap.extensionmodules.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class APIExceptionHandler extends RuntimeException {

    public APIExceptionHandler(HttpStatus httpStatus, String message) {
        super(message);
        this.httpStatus = httpStatus;
    }

    private final HttpStatus httpStatus;

    public static APIExceptionHandler preconditionRequired(String message) {
        return new APIExceptionHandler(HttpStatus.PRECONDITION_REQUIRED, message);
    }
}

