package com.sap.extensionmodules.dtos;
import lombok.*;

import java.util.List;
import java.util.Map;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class JobCardValidationResponse {
    private Map<String, Object> data;
    private List<Map<String,Object>> info;
    private List<JobCardValidationError> error;
}
