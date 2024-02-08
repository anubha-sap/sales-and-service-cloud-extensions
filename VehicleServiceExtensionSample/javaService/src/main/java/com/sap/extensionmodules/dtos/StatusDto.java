package com.sap.extensionmodules.dtos;
import lombok.*;
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class StatusDto {
    private String code;
    private String description;
}
