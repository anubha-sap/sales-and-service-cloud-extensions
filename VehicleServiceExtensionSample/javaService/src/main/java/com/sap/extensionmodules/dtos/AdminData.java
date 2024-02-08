package com.sap.extensionmodules.dtos;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class AdminData {
    private String createdOn;
    private String updatedOn;
    private String createdBy;
    private String updatedBy;
}
