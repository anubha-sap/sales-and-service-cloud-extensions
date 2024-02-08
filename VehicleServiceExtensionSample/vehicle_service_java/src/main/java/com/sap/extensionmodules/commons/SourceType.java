package com.sap.extensionmodules.commons;

public enum SourceType {
    SERVICE_FORM("service-form");

    private final String value;

    SourceType(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
