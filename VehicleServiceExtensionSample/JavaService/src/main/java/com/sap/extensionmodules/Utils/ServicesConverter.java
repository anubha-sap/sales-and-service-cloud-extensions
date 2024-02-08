package com.sap.extensionmodules.Utils;

import com.fasterxml.jackson.core.type.TypeReference;
import com.sap.extensionmodules.dtos.ServicesDto;

import javax.persistence.Converter;
import java.util.List;

@Converter(autoApply = false)
public class ServicesConverter extends JpaConverterJson<List<ServicesDto>> {
    public ServicesConverter() {
        super(new TypeReference<>() {
        });
    }
}