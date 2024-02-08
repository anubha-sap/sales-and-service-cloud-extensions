package com.sap.extensionmodules.Utils;

import com.fasterxml.jackson.core.type.TypeReference;
import com.sap.extensionmodules.dtos.InspectionItemDto;

import javax.persistence.Converter;
import java.util.List;

@Converter(autoApply = false)
public class InspectionItemConverter extends JpaConverterJson<List<InspectionItemDto>> {
    public InspectionItemConverter() {
        super(new TypeReference<>() {
        });
    }
}