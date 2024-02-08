package com.sap.extensionmodules.repository;

import com.sap.extensionmodules.commons.Constants;
import com.sap.extensionmodules.exception.CustomNotFoundException;
import com.sap.extensionmodules.entity.Services;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

import static com.sap.extensionmodules.commons.Constants.Messages.SERVICE_RESOURCE_NOT_FOUND;

@Repository
public class ServicesRepository {
    @Autowired
    private ServicesRepositoryInterface servicesRepo;

    public Services create(Services entity) {
        try {
            return servicesRepo.save(entity);
        } catch (DataIntegrityViolationException e) {
            throw new CustomNotFoundException(HttpStatus.INTERNAL_SERVER_ERROR.value(), Constants.Messages.UNIQUE_KEY_CONSTRAINT_FAILED);
        } catch (DataAccessException e) {
            throw new CustomNotFoundException(HttpStatus.INTERNAL_SERVER_ERROR.value(), Constants.Messages.DB_ERROR);
        }
    }

    public List<Services> findAll() {
        try {
            List<Services> entities = new ArrayList<>();
            servicesRepo.findAll().forEach(entities::add);
            return entities;
        } catch (DataAccessException e) {
            throw new CustomNotFoundException(HttpStatus.INTERNAL_SERVER_ERROR.value(), Constants.Messages.DB_ERROR);
        }
    }

    public Services findById(String id) throws NotFoundException {
        try {
            Services entity = servicesRepo.findById(id);
            if (entity == null) {
                throw new NotFoundException(SERVICE_RESOURCE_NOT_FOUND);
            }
            return entity;
        } catch (DataAccessException e) {
            throw new CustomNotFoundException(HttpStatus.INTERNAL_SERVER_ERROR.value(), Constants.Messages.DB_ERROR);
        }
    }

    public Services update(Services entity) {
        try {
            entity = servicesRepo.save(entity);
            return entity;
        } catch (DataAccessException e) {
            throw new CustomNotFoundException(HttpStatus.INTERNAL_SERVER_ERROR.value(), Constants.Messages.DB_ERROR);
        }
    }

    public void delete(Services entity) throws NotFoundException {
        try {
            servicesRepo.delete(entity);
        } catch (DataAccessException e) {
            throw new CustomNotFoundException(HttpStatus.INTERNAL_SERVER_ERROR.value(), Constants.Messages.DB_ERROR);
        }
    }
}
