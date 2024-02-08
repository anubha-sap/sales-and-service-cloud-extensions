package com.sap.extensionmodules.Utils;

import com.fasterxml.jackson.core.type.TypeReference;
import com.sap.extensionmodules.dtos.RegisteredProduct;

import javax.persistence.Converter;

@Converter(autoApply = false)
public class RegisteredProductConverter extends JpaConverterJson<RegisteredProduct> {
    public RegisteredProductConverter() {
        super(new TypeReference<>() {
        });
    }
}
