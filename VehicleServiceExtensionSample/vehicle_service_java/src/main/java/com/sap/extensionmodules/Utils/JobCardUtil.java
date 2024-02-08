package com.sap.extensionmodules.Utils;

import com.sap.extensionmodules.commons.Constants.CustomLogicErrorCode;
import com.sap.extensionmodules.commons.Constants.Messages;
import com.sap.extensionmodules.dtos.JobCardValidationError;

public class JobCardUtil {
    public static JobCardValidationError getCustomLogicErrorDetails( String target, String message) {

        JobCardValidationError error = new JobCardValidationError(
                String.format("%s.%s", CustomLogicErrorCode.CASE_SERVICE, target),
                message != null ? message : Messages.CASE_STATUS_DISABLED,
                target != null ? "caseId/" + target : ""
        );

        return error;
    }
}
