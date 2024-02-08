package com.sap.extensionmodules.exception;

public class CustomNotFoundException extends RuntimeException{
    private final int code;
    private final String message;

    public CustomNotFoundException(int code, String message) {
        this.code = code;
        this.message = message;
    }

    public int getCode() {
        return code;
    }

    @Override
    public String getMessage() {
        return message;
    }
}
