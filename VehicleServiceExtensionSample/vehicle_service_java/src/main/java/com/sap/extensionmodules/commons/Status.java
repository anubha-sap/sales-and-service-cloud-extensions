package com.sap.extensionmodules.commons;

public enum Status {
    NEW("NEW"),
    DRAFT("DRAFT"),
    BOOKED("BOOKED"),
    IN_PROGRESS("IN_PROGRESS"),
    COMPLETED("COMPLETED"),
    SCHEDULED("SCHEDULED");

    private final String value;

    Status(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
