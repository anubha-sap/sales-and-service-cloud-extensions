package com.sap.extensionmodules.Utils;

import org.springframework.stereotype.Service;

@Service
public class UpdateChecker {

    public static void isUpdateOnLatestData(String ifmatch, String updatedOn) {
        if (ifmatch == null || ifmatch.isEmpty()) {
            //throw APIExceptionHandler.preconditionRequired(HTTP_PRECONDITION_REQUIRED);
        }

        if (!updatedOn.equals(ifmatch)) {
            //throw APIExceptionHandler.preconditionFailed(HTTP_PRECONDITION_FAILED);
        }
    }
}

