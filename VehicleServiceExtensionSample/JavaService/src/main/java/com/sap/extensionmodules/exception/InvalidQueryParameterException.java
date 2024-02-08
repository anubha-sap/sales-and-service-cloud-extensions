package com.sap.extensionmodules.exception;


import com.sap.extensionmodules.dtos.Error;

public class InvalidQueryParameterException extends BaseException {
    public InvalidQueryParameterException(Error error) {
        super(error);
    }

    public InvalidQueryParameterException(String message) {
        super(message);
    }
}
