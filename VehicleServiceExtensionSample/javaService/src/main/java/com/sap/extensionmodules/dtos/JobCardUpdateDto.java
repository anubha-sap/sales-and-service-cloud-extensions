package com.sap.extensionmodules.dtos;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;


@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class JobCardUpdateDto {
    private String message = "Invalid status. Valid values are:";
    private String status;
}