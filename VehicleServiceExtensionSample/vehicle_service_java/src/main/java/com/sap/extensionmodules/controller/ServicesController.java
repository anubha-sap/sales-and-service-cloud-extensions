package com.sap.extensionmodules.controller;

import com.sap.extensionmodules.dtos.ServicesDto;
import com.sap.extensionmodules.exception.APIExceptionHandler;
import com.sap.extensionmodules.exception.ErrorResponse;
import com.sap.extensionmodules.service.ServicesService;
import javassist.NotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Map;

import static com.sap.extensionmodules.commons.APIConstants.*;

@Controller
@Slf4j
@RequestMapping(SERVICE_PREFIX + REST_PATH_SERVICES)
public class ServicesController {

    @Autowired
    private ServicesService servicesService;

    @PostMapping
    public ResponseEntity<?> create(@RequestBody ServicesDto servicesDto) {
        try {
            servicesDto = servicesService.create(servicesDto);
            log.info("Service created successfully: {}", servicesDto);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(servicesDto);
        } catch (Exception e) {
            log.error("Error creating service: {}", e.getMessage());
            ErrorResponse errorResponse = new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @GetMapping
    public ResponseEntity<?> findAll() {
        try {
            List<ServicesDto> dto = servicesService.findAll();
            log.info("Found {} services", dto.size());
            return ResponseEntity.status(HttpStatus.OK)
                    .body(dto);
        } catch (Exception e) {
            log.error("Error retrieving all services: {}", e.getMessage());
            log.error(e.getMessage());
            ErrorResponse errorResponse = new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @GetMapping(REST_PATH_ID)
    public ResponseEntity<?> findById(@PathVariable String id) {
        try {
            ServicesDto dto = servicesService.findById(id);
            log.info("Found service by ID {}: {}", id, dto);
            return ResponseEntity.status(HttpStatus.OK)
                    .body(dto);
        } catch (NotFoundException e) {
            log.warn("Service not found by ID {}: {}", id, e.getMessage());
            ErrorResponse errorResponse = new ErrorResponse(HttpStatus.NOT_FOUND.value(), e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        } catch (Exception e) {
            log.error("Error retrieving service by ID {}: {}", id, e.getMessage());
            ErrorResponse errorResponse = new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @PatchMapping(REST_PATH_ID)
    public ResponseEntity<?> update(@PathVariable String id,
                                    @RequestBody ServicesDto servicesDto,
                                    @RequestHeader(name = HttpHeaders.IF_MATCH, required = false) String ifMatch) {
        try {
            ServicesDto result = servicesService.update(id, servicesDto, ifMatch);
            log.info("Service updated successfully: {}", result);
            return ResponseEntity.status(HttpStatus.OK)
                    .body(result);
        } catch (APIExceptionHandler preconditionRequiredException) {
            log.warn("Precondition required: {}", preconditionRequiredException.getMessage());
            ErrorResponse errorResponse = new ErrorResponse(preconditionRequiredException.getHttpStatus().value(), preconditionRequiredException.getMessage());
            return ResponseEntity.status(preconditionRequiredException.getHttpStatus()).body(errorResponse);
        } catch (NotFoundException e) {
            log.warn("Service not found for update by ID {}: {}", id, e.getMessage());
            ErrorResponse errorResponse = new ErrorResponse(HttpStatus.NOT_FOUND.value(), e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        } catch (Exception e) {
            log.error("Error updating service by ID {}: {}", id, e.getMessage());
            ErrorResponse errorResponse = new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @DeleteMapping(REST_PATH_ID)
    public ResponseEntity<?> delete(@PathVariable String id) {
        try {
            servicesService.delete(id);
            log.info("Service deleted successfully with ID: {}", id);
            Map<String, Object> response = Map.of("raw", Collections.emptyList(), "affected", 1);
            return ResponseEntity.ok(response);
        } catch (NotFoundException e) {
            log.warn("Service not found for deletion by ID {}: {}", id, e.getMessage());
            ErrorResponse errorResponse = new ErrorResponse(HttpStatus.NOT_FOUND.value(), e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        } catch (Exception e) {
            log.error("Error deleting service by ID {}: {}", id, e.getMessage());
            ErrorResponse errorResponse = new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }
}
