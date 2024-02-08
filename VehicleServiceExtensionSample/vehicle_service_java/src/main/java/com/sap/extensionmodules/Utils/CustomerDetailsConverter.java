package com.sap.extensionmodules.Utils;

import com.fasterxml.jackson.core.type.TypeReference;
import com.sap.extensionmodules.dtos.CustomerDetails;

import javax.persistence.Converter;

@Converter(autoApply = false)
public class CustomerDetailsConverter extends JpaConverterJson<CustomerDetails> {

    public CustomerDetailsConverter() {
        super(new TypeReference<>() {
        });
    }

}
