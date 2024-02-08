package com.sap.extensionmodules.entity;

import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@Entity
@ToString
@Table(name = "\"services\"")
public class Services {

    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    @Column(name ="\"id\"", unique=true)
    private String id;

    @Column(name = "\"service\"")
    private String service;

    @Column(name = "\"price\"")
    private String price;

    @Column(name = "\"minMileage\"")
    private Integer minMileage;

    @Column(name = "\"maxMileage\"")
    private Integer maxMileage;

    @Column(name = "\"isSelected\"")
    private Boolean isSelected;

    @Column(name = "\"createdOn\"")
    private String createdOn;

    @Column(name = "\"updatedOn\"")
    private String updatedOn;

    @Column(name = "\"createdBy\"")
    private String createdBy;

    @Column(name = "\"updatedBy\"")
    private String updatedBy;

//    @Column(name = "\"adminData\"")
//    private AdminData adminData;
}
