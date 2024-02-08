package com.sap.extensionmodules.exception;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;
public class CustomValidationExceptionTest {

    @Test
    void testGetCode() {
        int code = 500;
        CustomValidationException exception = new CustomValidationException(code, "Test Message", List.of());

        assertEquals(code, exception.getCode());
    }

    @Test
    void testGetMessage() {
        String message = "Test Message";
        CustomValidationException exception = new CustomValidationException(500, message, List.of());

        assertEquals(message, exception.getMessage());
    }

    @Test
    void testGetDetails() {
        List<ErrorResponse.ErrorInfo> details = List.of(new ErrorResponse.ErrorInfo("Error", "Target", "Value"));
        CustomValidationException exception = new CustomValidationException(500, "Test Message", details);

        assertEquals(details, exception.getDetails());
    }

    @Test
    void testToString() {
        int code = 500;
        String message = "Test Message";
        List<ErrorResponse.ErrorInfo> details = List.of(new ErrorResponse.ErrorInfo("Error", "Target", "Value"));
        CustomValidationException exception = new CustomValidationException(code, message, details);

        String expectedToString = "CustomValidationException{" +
                "code=" + code +
                ", message='" + message + '\'' +
                ", details=" + details +
                '}';

        assertEquals(expectedToString, exception.toString());
    }

    @Test
    void testCustomValidationExceptionWithMock() {
        List<ErrorResponse.ErrorInfo> mockedDetails = Mockito.mock(List.class);
        CustomValidationException exception = new CustomValidationException(500, "Test Message", mockedDetails);
        ErrorResponse.ErrorInfo errorInfo = new ErrorResponse.ErrorInfo("Error", "Target", "Value");
        when(mockedDetails.get(0)).thenReturn(errorInfo);
        assertEquals(errorInfo, exception.getDetails().get(0));
    }
}
