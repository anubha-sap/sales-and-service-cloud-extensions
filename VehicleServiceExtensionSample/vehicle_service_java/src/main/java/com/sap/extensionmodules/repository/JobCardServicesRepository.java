package com.sap.extensionmodules.repository;

import com.sap.extensionmodules.commons.Constants;
import com.sap.extensionmodules.exception.CustomNotFoundException;
import com.sap.extensionmodules.entity.JobCardServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Repository;

@Repository
public class JobCardServicesRepository {
    @Autowired
    private JobCardServicesRepositoryInterface jobCardServicesRepo;

    public JobCardServices findOneBy(String jobCardServiceId) {
        try {
            JobCardServices entity = jobCardServicesRepo.findById(jobCardServiceId);
            if (entity == null) {
                throw new CustomNotFoundException(HttpStatus.NOT_FOUND.value(), Constants.Messages.JOBCARD_ID_NOT_FOUND);
            }
            return entity;
        } catch (DataAccessException e) {
            throw new CustomNotFoundException(HttpStatus.INTERNAL_SERVER_ERROR.value(), Constants.Messages.DB_ERROR);

        }
    }

    public JobCardServices update(JobCardServices entity) {
        try {
            entity = jobCardServicesRepo.save(entity);
            return entity;
        } catch (DataIntegrityViolationException e) {
            throw new CustomNotFoundException(HttpStatus.INTERNAL_SERVER_ERROR.value(), Constants.Messages.UNIQUE_KEY_CONSTRAINT_FAILED);
        } catch (DataAccessException e) {
            throw new CustomNotFoundException(HttpStatus.INTERNAL_SERVER_ERROR.value(), Constants.Messages.DB_ERROR);

        }
    }


}