package com.sap.extensionmodules.repository;

import com.sap.extensionmodules.entity.JobCardServices;
import org.springframework.data.repository.CrudRepository;

public interface JobCardServicesRepositoryInterface extends CrudRepository<JobCardServices, Long> {
    JobCardServices findById(String jobCardServiceId);
    //List<JobCardServices> findByJobCardId(String jobCardId);
}
