package com.sap.extensionmodules.exception;

import static org.junit.jupiter.api.Assertions.*;
import com.sap.extensionmodules.dtos.Error;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.Map;
import java.util.AbstractMap;

class BaseExceptionTest {

    @Test
    @DisplayName("Test BaseException")
    public void testBaseException() {
        assertEquals(new BaseException("test").getClass(), BaseException.class);
    }

    @Test
    @DisplayName("Test BaseException Error")
    public void testBaseExceptionError() {
        Error error = new Error();
        assertEquals(new BaseException(error).getClass(), BaseException.class);
    }

    @Test
    @DisplayName("Test BaseException GetError")
    public void testBaseExceptionGetError() {
        Error error = new Error();
        assertEquals(new BaseException(error).getError(), error);
    }

    @Test
    public void testBaseExceptionConstructor() {
        Map.Entry<String, String> errorEntry = new AbstractMap.SimpleEntry<>("ERROR_CODE", "Error Message");
        BaseException exception = new BaseException(errorEntry);
        assertEquals("Error Message", exception.getMessage());
        assertNull(exception.getError());
    }
}

