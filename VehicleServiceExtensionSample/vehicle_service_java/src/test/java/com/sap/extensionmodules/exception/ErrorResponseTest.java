package com.sap.extensionmodules.exception;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;
public class ErrorResponseTest {

    @Test
    void testGetError() {
        int code = 404;
        String message = "Not Found";
        List<ErrorResponse.ErrorInfo> details = null;
        ErrorResponse errorResponse = new ErrorResponse(code, message);

        ErrorResponse.ErrorDetail expectedErrorDetail = new ErrorResponse.ErrorDetail(code, message);
        assertEquals(expectedErrorDetail.getCode(), errorResponse.getError().getCode());
        assertEquals(expectedErrorDetail.getMessage(), errorResponse.getError().getMessage());
    }

    @Test
    void testGetErrorWithDetails() {
        int code = 500;
        String message = "Internal Server Error";
        List<ErrorResponse.ErrorInfo> details = List.of(new ErrorResponse.ErrorInfo("Error", "Target", "Value"));
        ErrorResponse errorResponse = new ErrorResponse(code, message, details);

        ErrorResponse.ErrorDetail expectedErrorDetail = new ErrorResponse.ErrorDetail(code, message, details);
        assertEquals(expectedErrorDetail.getCode(), errorResponse.getError().getCode());
        assertEquals(expectedErrorDetail.getMessage(), errorResponse.getError().getMessage());
        assertEquals(expectedErrorDetail.getDetails().get(0).getMessage(),
                errorResponse.getError().getDetails().get(0).getMessage());
        assertEquals(expectedErrorDetail.getDetails().get(0).getTarget(),
                errorResponse.getError().getDetails().get(0).getTarget());
        assertEquals(expectedErrorDetail.getDetails().get(0).getValue(),
                errorResponse.getError().getDetails().get(0).getValue());
    }

    @Test
    void testGetCode() {
        int code = 404;
        String message = "Not Found";
        ErrorResponse.ErrorDetail errorDetail = new ErrorResponse.ErrorDetail(code, message);

        assertEquals(code, errorDetail.getCode());
    }

    @Test
    void testGetMessage() {
        int code = 404;
        String message = "Not Found";
        ErrorResponse.ErrorDetail errorDetail = new ErrorResponse.ErrorDetail(code, message);

        assertEquals(message, errorDetail.getMessage());
    }

    @Test
    void testGetDetails() {
        int code = 500;
        String message = "Internal Server Error";
        List<ErrorResponse.ErrorInfo> details = List.of(new ErrorResponse.ErrorInfo("Error", "Target", "Value"));
        ErrorResponse.ErrorDetail errorDetail = new ErrorResponse.ErrorDetail(code, message, details);

        assertEquals(details, errorDetail.getDetails());
    }

    @Test
    void testErrorInfoGetters() {
        String errorMessage = "Error Message";
        String target = "Target";
        String value = "Value";
        ErrorResponse.ErrorInfo errorInfo = new ErrorResponse.ErrorInfo(errorMessage, target, value);

        assertEquals(errorMessage, errorInfo.getMessage());
        assertEquals(target, errorInfo.getTarget());
        assertEquals(value, errorInfo.getValue());
    }

    @Test
    void testErrorDetailWithMock() {
        // Mocking the List
        List<ErrorResponse.ErrorInfo> mockedDetails = Mockito.mock(List.class);

        // Creating the error detail with mocked List
        ErrorResponse.ErrorDetail errorDetail = new ErrorResponse.ErrorDetail(500, "Test Message", mockedDetails);

        // Stubbing behavior for the mocked List
        ErrorResponse.ErrorInfo errorInfo = new ErrorResponse.ErrorInfo("Error", "Target", "Value");
        when(mockedDetails.get(0)).thenReturn(errorInfo);

        // Verifying the behavior
        assertEquals(errorInfo, errorDetail.getDetails().get(0));
    }
}
