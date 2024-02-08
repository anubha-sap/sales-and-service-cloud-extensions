package com.sap.extensionmodules.exception;

import java.util.List;

public class ErrorResponse {
    private final ErrorDetail error;

    public ErrorResponse(int code, String message) {
        this.error = new ErrorDetail(code, message);
    }

    public ErrorResponse(int code, String message, List<ErrorInfo> details) {
        this.error = new ErrorDetail(code, message, details);
    }

    public ErrorDetail getError() {
        return error;
    }

    public static class ErrorDetail {
        private final int code;
        private final String message;
        private final List<ErrorInfo> details;

        public ErrorDetail(int code, String message) {
            this.code = code;
            this.message = message;
            this.details = null;
        }

        public ErrorDetail(int code, String message, List<ErrorInfo> details) {
            this.code = code;
            this.message = message;
            this.details = details;
        }

        public int getCode() {
            return code;
        }

        public String getMessage() {
            return message;
        }

        public List<ErrorInfo> getDetails() {
            return details;
        }
    }

    public static class ErrorInfo {
        private final String message;
        private final String target;
        private final String value;

        public ErrorInfo(String message, String target, String value) {
            this.message = message;
            this.target = target;
            this.value = value;
        }

        public String getMessage() {
            return message;
        }

        public String getTarget() {
            return target;
        }

        public String getValue() {
            return value;
        }
    }
}
