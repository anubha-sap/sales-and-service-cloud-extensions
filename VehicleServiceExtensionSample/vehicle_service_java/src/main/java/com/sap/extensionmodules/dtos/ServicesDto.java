package com.sap.extensionmodules.dtos;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.sap.extensionmodules.commons.APIConstants;
import lombok.*;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ServicesDto {
    private String id;
    private String service;
    private String price;
    private Integer minMileage;
    private Integer maxMileage;
    private Boolean isSelected = false;
    private AdminData adminData;
    private final String source = APIConstants.JAVA_SERVICE;

    public ServicesDto(String id, String service, String price, Boolean isSelected) {
        this.id = id;
        this.service = service;
        this.price = price;
        this.isSelected = isSelected;
    }
}

