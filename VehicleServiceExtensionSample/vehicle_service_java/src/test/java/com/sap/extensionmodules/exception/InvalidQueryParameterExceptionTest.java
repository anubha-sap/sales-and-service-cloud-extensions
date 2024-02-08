package com.sap.extensionmodules.exception;


import com.sap.extensionmodules.dtos.Error;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class InvalidQueryParameterExceptionTest {
    @Test
    @DisplayName("Test InvalidQueryParameterException - String")
    public void testInvalidQueryParameterExceptionString() {
        assertEquals(
                new InvalidQueryParameterException("test").getClass(),
                InvalidQueryParameterException.class);
    }

    @Test
    @DisplayName("Test InvalidQueryParameterException - Error")
    public void testInvalidQueryParameterExceptionError() {
        Error error = Error.builder().build();
        Assertions.assertEquals(
                new InvalidQueryParameterException(error).getClass(),
                InvalidQueryParameterException.class);
    }
}
