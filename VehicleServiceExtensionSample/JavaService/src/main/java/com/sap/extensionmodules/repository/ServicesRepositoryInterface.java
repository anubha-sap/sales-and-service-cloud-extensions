package com.sap.extensionmodules.repository;

import com.sap.extensionmodules.entity.Services;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ServicesRepositoryInterface extends CrudRepository<Services, Long> {

    Services findById(String id);
}
