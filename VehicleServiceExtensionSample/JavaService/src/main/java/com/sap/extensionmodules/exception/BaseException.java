package com.sap.extensionmodules.exception;

import java.util.Map.Entry;

import com.sap.extensionmodules.dtos.Error;
import lombok.Getter;

public class BaseException extends RuntimeException {

    private final Error error;

    @Getter private final String message;

    public BaseException(Entry<String, String> errorEntry) {
        super(errorEntry.getValue());
        this.message = errorEntry.getValue();
        this.error = null;
    }

    public BaseException(Error error) {
        super(error.getMessage());
        this.message = error.getMessage();
        this.error = error;
    }

    // dummy constructor temporary.
    public BaseException(String mesage) {

        this.error = new Error();
        this.message = error.getMessage();
    }

    public Error getError() {
        return error;
    }
}

