package com.sap.extensionmodules.dtos;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.sap.extensionmodules.commons.APIConstants;
import lombok.*;

import java.util.List;
import java.util.UUID;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ServiceFormDto {
    private String id;
    private int displayId;
    private UUID caseId;
    private String caseDisplayId;
    private RegisteredProduct registeredProduct;
    private List<String> customerComplaints;
    private int milometer;
    private List<ServicesDto> servicesProposed;
    private List<InspectionItemDto> inspectionItems;
    private List<String> notes;
    private String status;
    private String statusDescription;
    private AdminData adminData;
    private final String source = APIConstants.JAVA_SERVICE;

    public ServiceFormDto(UUID caseId, String caseDisplayId, RegisteredProduct registeredProduct, List<String> customerComplaints, Integer milometer, List<ServicesDto> servicesProposed, List<InspectionItemDto> inspectionItems, List<String> notes, String status) {
        this.caseId = caseId;
        this.caseDisplayId = caseDisplayId;
        this.registeredProduct = registeredProduct;
        this.customerComplaints = customerComplaints;
        this.milometer = milometer;
        this.servicesProposed = servicesProposed;
        this.inspectionItems = inspectionItems;
        this.notes = notes;
        this.status = status;
    }

//    private AdminData adminData;

//    public ServiceFormDto(String id, Integer displayId, String caseId, String caseDisplayId, String registeredProduct, String customerComplaints, Integer milometer, String servicesProposed, String inspectionItems, String notes, String status) {
//        super(id,displayId,caseId,caseDisplayId,registeredProduct,customerComplaints,milometer);
//        this.servicesProposed = servicesProposed;
//        this.inspectionItems = inspectionItems;
//        this.notes = notes;
//        this.status = status;
//    }
}
