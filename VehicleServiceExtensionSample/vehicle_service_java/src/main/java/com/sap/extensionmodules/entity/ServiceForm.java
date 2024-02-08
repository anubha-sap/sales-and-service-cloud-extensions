package com.sap.extensionmodules.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.sap.extensionmodules.Utils.InspectionItemConverter;
import com.sap.extensionmodules.Utils.RegisteredProductConverter;
import com.sap.extensionmodules.Utils.ServicesConverter;
import com.sap.extensionmodules.dtos.InspectionItemDto;
import com.sap.extensionmodules.dtos.RegisteredProduct;
import com.sap.extensionmodules.dtos.ServicesDto;
import lombok.*;
import org.hibernate.annotations.Generated;
import org.hibernate.annotations.GenerationTime;
import org.hibernate.annotations.GenericGenerator;


import javax.persistence.*;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@Entity
@ToString
@Table(name = "\"service_form\"")
public class ServiceForm {
    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    @Column(name ="\"id\"", unique=true)
    private String id;

    @Generated(GenerationTime.INSERT)
    @Column(name ="\"displayId\"", insertable = false, updatable = false)
    private Integer displayId;

    @Column(name ="\"caseId\"", unique=true)
    private String caseId;

    @Column(name ="\"caseDisplayId\"", unique=true)
    private String caseDisplayId;

    @Convert(converter = RegisteredProductConverter.class)
    @Column(name ="\"registeredProduct\"")
    private RegisteredProduct registeredProduct;

    @Column(name ="\"customerComplaints\"")
    private String customerComplaints;

    @Column(name ="\"milometer\"")
    private Integer milometer;

    @Convert(converter = ServicesConverter.class)
    @Column(name ="\"servicesProposed\"")
    private List<ServicesDto> servicesProposed;

    @Convert(converter = InspectionItemConverter.class)
    @Column(name ="\"inspectionItems\"")
    private List<InspectionItemDto> inspectionItems;

    @Column(name ="\"notes\"")
    private String notes;

    @Column(name ="\"status\"")
    private String status;

    @Column(name = "\"createdOn\"")
    private String createdOn;

    @Column(name = "\"updatedOn\"")
    private String updatedOn;

    @Column(name = "\"createdBy\"")
    private String createdBy;

    @Column(name = "\"updatedBy\"")
    private String updatedBy;

    @JsonBackReference
    @OneToOne()
    @JoinColumn(name = "\"jobCardId\"", referencedColumnName = "\"id\"")
    private JobCard jobCard;
}
