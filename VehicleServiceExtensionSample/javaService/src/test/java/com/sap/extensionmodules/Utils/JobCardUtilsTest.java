package com.sap.extensionmodules.Utils;

import com.sap.extensionmodules.commons.Constants;
import com.sap.extensionmodules.dtos.JobCardValidationError;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class JobCardUtilsTest {

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
    }
    @Test
    public void testGetCustomLogicErrorDetails() {

        String target = "123";
        String message = "Custom error message";
        JobCardValidationError result = JobCardUtil.getCustomLogicErrorDetails(target, message);
        assertEquals("caseService_customLogic.123", result.getCode());
        assertEquals("Custom error message", result.getMessage());
        assertEquals("caseId/123", result.getTarget());
    }
    @Test
    void testGetCustomLogicErrorDetails_NullMessage() {

        String target = "456";
        JobCardValidationError result = JobCardUtil.getCustomLogicErrorDetails(target, null);
        assertEquals("caseService_customLogic.456", result.getCode());
        assertEquals(Constants.Messages.CASE_STATUS_DISABLED, result.getMessage());
        assertEquals("caseId/456", result.getTarget());
    }

    @Test
    void testGetCustomLogicErrorDetails_NullTarget() {

        String message = "Another custom error message";
        JobCardValidationError result = JobCardUtil.getCustomLogicErrorDetails(null, message);
        assertEquals("caseService_customLogic.null", result.getCode());
        assertEquals("Another custom error message", result.getMessage());
        assertEquals("", result.getTarget());
    }
}
