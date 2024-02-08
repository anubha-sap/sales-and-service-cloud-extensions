package com.sap.extensionmodules.dtos;
import lombok.*;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class JobCardValidationError {

        private String code;
        private String message;
        private String target;
    }

