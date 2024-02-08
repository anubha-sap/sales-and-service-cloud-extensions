package com.sap.extensionmodules.repository;

import com.sap.extensionmodules.Utils.ServiceFormSpecification;
import com.sap.extensionmodules.commons.Constants;
import com.sap.extensionmodules.exception.CustomNotFoundException;
import com.sap.extensionmodules.entity.ServiceForm;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

import static com.sap.extensionmodules.commons.Constants.Messages.SERVICE_FORM_RESOURCE_NOT_FOUND;

@Repository
public class ServiceFormRepository {

    @Autowired
    private ServiceFormRepositoryInterface serviceRepo;

    public ServiceForm create(ServiceForm entity) {
        try {
            entity = serviceRepo.save(entity);
            return entity;
        } catch (DataIntegrityViolationException e) {
            throw new CustomNotFoundException(HttpStatus.INTERNAL_SERVER_ERROR.value(), Constants.Messages.UNIQUE_KEY_CONSTRAINT_FAILED);
        } catch (DataAccessException e) {
            throw new CustomNotFoundException(HttpStatus.INTERNAL_SERVER_ERROR.value(), Constants.Messages.DB_ERROR);
        }
    }

    public List<ServiceForm> findAll(ServiceFormSpecification spec) {
        try {
            return new ArrayList<>(serviceRepo.findAll(spec));
        } catch (DataAccessException e) {
            throw new CustomNotFoundException(HttpStatus.INTERNAL_SERVER_ERROR.value(), Constants.Messages.DB_ERROR);
        }
    }

    public ServiceForm findById(String id) throws NotFoundException {
        try {
            ServiceForm entity = serviceRepo.findById(id);
            if (entity == null) {
                throw new NotFoundException(SERVICE_FORM_RESOURCE_NOT_FOUND);
            }
            return entity;
        } catch (DataAccessException e) {
            throw new CustomNotFoundException(HttpStatus.INTERNAL_SERVER_ERROR.value(), Constants.Messages.DB_ERROR);
        }
    }

    public void delete(ServiceForm entity) throws NotFoundException {
        try {
            if (entity == null) {
                throw new NotFoundException(SERVICE_FORM_RESOURCE_NOT_FOUND);
            }
            serviceRepo.delete(entity);
        } catch (DataAccessException e) {
            throw new CustomNotFoundException(HttpStatus.INTERNAL_SERVER_ERROR.value(), Constants.Messages.DB_ERROR);
        }
    }

    public ServiceForm update(ServiceForm serviceForm) {
        try {
            return serviceRepo.save(serviceForm);
        } catch (DataAccessException e) {
            throw new CustomNotFoundException(HttpStatus.INTERNAL_SERVER_ERROR.value(), Constants.Messages.DB_ERROR);
        }
    }
}
