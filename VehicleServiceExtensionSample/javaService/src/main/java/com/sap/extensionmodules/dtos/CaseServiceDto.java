package com.sap.extensionmodules.dtos;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CaseServiceDto{
    private String processor;
    private String estimatedCompletionDate;
    private String customerName;
    private String caseDisplayId;
    private String contactNumber;
}
