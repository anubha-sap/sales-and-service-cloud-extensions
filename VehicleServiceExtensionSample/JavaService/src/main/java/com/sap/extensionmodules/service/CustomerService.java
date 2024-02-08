package com.sap.extensionmodules.service;

import com.sap.cloud.sdk.cloudplatform.connectivity.HttpDestination;
import com.sap.cnsmodules.accounts.api.AccountApi;
import com.sap.cnsmodules.accounts.model.AccountReadResponse;
import com.sap.cnsmodules.individualCustomer.api.IndividualCustomerApi;
import com.sap.cnsmodules.individualCustomer.model.IndividualCustomerReadResponse;
import com.sap.extensionmodules.dtos.CustomerDetails;
import com.sap.extensionmodules.security.RequestContextProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class CustomerService {
    CustomerDetails customerDetails = new CustomerDetails();
    @Autowired
    RequestContextProvider requestContextProvider;

    public CustomerDetails getAccountInfo(UUID id)
    {
        String authToken = requestContextProvider.getRequestContext().getAuthToken();
        final HttpDestination destination = requestContextProvider.getRequestContext().getDestination();
        System.out.println(destination+"calling account api");
        AccountApi accountApi = new AccountApi(destination);
        AccountReadResponse account = accountApi.getAccountDetails(authToken, id);

        customerDetails.setName(account.getValue().getFormattedName());
        if(account.getValue().getDefaultCommunication() != null)
            customerDetails.setContactNumber(account.getValue().getDefaultCommunication().getPhoneFormattedNumber());

        return customerDetails;
    }
    public CustomerDetails getIndividualCustomerInfo(UUID id)
    {
        String authToken = requestContextProvider.getRequestContext().getAuthToken();
        final HttpDestination destination = requestContextProvider.getRequestContext().getDestination();
        IndividualCustomerApi individualCustomerApi = new IndividualCustomerApi(destination);
        IndividualCustomerReadResponse individualCustomer = individualCustomerApi.getIndividualCustomerDetails(authToken, id);
        customerDetails.setName(individualCustomer.getValue().getFormattedName());
        if (individualCustomer.getValue().getDefaultCommunication() != null)
            customerDetails.setContactNumber(individualCustomer.getValue().getDefaultCommunication().getPhoneFormattedNumber());

        return customerDetails;
    }

}
