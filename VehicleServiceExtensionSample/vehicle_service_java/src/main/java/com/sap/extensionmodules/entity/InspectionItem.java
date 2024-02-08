package com.sap.extensionmodules.entity;

import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@Entity
@ToString
@Table(name = "\"inspection_item\"")
public class InspectionItem {
    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    @Column(name ="\"id\"", unique=true)
    private String id;

    @Column(name ="\"description\"")
    private String description;

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
