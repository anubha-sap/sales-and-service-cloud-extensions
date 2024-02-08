package com.sap.extensionmodules.repository;

import com.sap.extensionmodules.entity.ServiceForm;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.CrudRepository;

public interface ServiceFormRepositoryInterface extends CrudRepository<ServiceForm, Long> , JpaSpecificationExecutor<ServiceForm> {
    ServiceForm findById(String id);
}
