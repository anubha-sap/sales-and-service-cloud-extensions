package com.sap.extensionmodules.controller;

import com.sap.cloud.sdk.services.openapi.core.OpenApiRequestException;
import com.sap.extensionmodules.Utils.StatusUtil;
import com.sap.extensionmodules.commons.Constants;
import com.sap.extensionmodules.commons.SFStatus;
import com.sap.extensionmodules.dtos.ServiceFormDto;
import com.sap.extensionmodules.dtos.StatusDto;
import com.sap.extensionmodules.exception.APIExceptionHandler;
import com.sap.extensionmodules.exception.ErrorResponse;
import com.sap.extensionmodules.service.ServiceFormService;
import javassist.NotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.servlet.http.HttpSession;
import java.rmi.ServerException;
import java.util.*;

import static com.sap.extensionmodules.commons.APIConstants.*;

@RestController
@Slf4j
@RequestMapping(SERVICE_PREFIX + REST_PATH_SERVICE_FORM)
public class ServiceFormController {
    @Autowired
    private ServiceFormService serviceFormService;

    @Autowired
    StatusUtil statusUtil;

    private HttpSession session;

    @PostMapping
    public ResponseEntity<?> create(@RequestBody ServiceFormDto serviceFormDto) throws Exception {
        try {
            log.info("Creating service form: {}", serviceFormDto);
            serviceFormDto = serviceFormService.create(serviceFormDto);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(serviceFormDto);
        } catch (OpenApiRequestException e) {
            log.error("OpenAPI request error: {}", e.getMessage());
            ErrorResponse errorResponse = new ErrorResponse(HttpStatus.NOT_FOUND.value(), e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        } catch (ServerException e) {
            log.error("Server exception: {}", e.getMessage());
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR, "Cannot update Case data", e);
        } catch (Exception e) {
            log.error("Unexpected error during creation: {}", e.getMessage());
            ErrorResponse errorResponse = new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @GetMapping
    public ResponseEntity<?> findAll(@RequestHeader(value = HttpHeaders.ACCEPT_LANGUAGE, required = false) String language,
                                     @RequestParam(value = Constants.QUERY_OPTION_FILTER, required = false)
                                     Optional<String> filter) {
        try {
            List<ServiceFormDto> dtoList = serviceFormService.findAll(filter);
            String lang = (language != null) ? language : "en-US";
            for (ServiceFormDto dto : dtoList) {
                dto.setStatusDescription(statusUtil.getDescription(dto.getStatus(), lang));
            }
            log.info("Found {} service forms", dtoList.size());
            return ResponseEntity.status(HttpStatus.OK)
                    .body(dtoList);
        } catch (Exception e) {
            log.error("Error retrieving all service forms: {}", e.getMessage());
            ErrorResponse errorResponse = new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @GetMapping(REST_PATH_ID)
    public ResponseEntity<?> findById(@PathVariable String id, @RequestHeader(value = HttpHeaders.ACCEPT_LANGUAGE, required = false) String language) {
        ServiceFormDto dto;
        try {
            dto = serviceFormService.findById(id);
            String lang = (language != null) ? language : "en-US";
            dto.setStatusDescription(statusUtil.getDescription(dto.getStatus(), lang));
            log.info("Found service form by ID {}: {}", id, dto);
            return ResponseEntity.status(HttpStatus.OK)
                    .body(dto);
        } catch (NotFoundException e) {
            log.warn("Service form not found by ID {}: {}", id, e.getMessage());
            ErrorResponse errorResponse = new ErrorResponse(HttpStatus.NOT_FOUND.value(), e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        } catch (Exception e) {
            log.error("Error retrieving service form by ID {}: {}", id, e.getMessage());
            ErrorResponse errorResponse = new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @GetMapping(REST_PATH_SERVICES_STATUSES)
    public ResponseEntity<?> findAllSFStatus(@RequestHeader(value = HttpHeaders.ACCEPT_LANGUAGE, required = false) String language) {
        try {
            List<StatusDto> dtoList = new ArrayList<>();
            String lang = (language != null) ? language : "en-US";
            for (SFStatus s : SFStatus.values()) {
                String desc = statusUtil.getDescription(s.toString(), lang);
                StatusDto dto = new StatusDto(s.toString(), desc);
                dtoList.add(dto);
            }
            log.info("Found {} service form statuses", dtoList.size());
            return ResponseEntity.status(HttpStatus.OK).body(dtoList);
        } catch (Exception e) {
            log.error("Error retrieving service form statuses {}",e.getMessage());
            ErrorResponse errorResponse = new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @PatchMapping(REST_PATH_ID)
    public ResponseEntity<?> update(@PathVariable String id,
                                                 @RequestBody ServiceFormDto dto,
                                                 @RequestHeader(name = HttpHeaders.IF_MATCH, required = false) String ifMatch) {
        try {
            ServiceFormDto result = serviceFormService.update(id, dto, ifMatch);
            log.info("Service form updated successfully: {}", result);
            return ResponseEntity.status(HttpStatus.OK)
                    .body(result);
        } catch (APIExceptionHandler preconditionRequiredException) {
            log.error("Precondition required: {}", preconditionRequiredException.getMessage());
            ErrorResponse errorResponse = new ErrorResponse(preconditionRequiredException.getHttpStatus().value(), preconditionRequiredException.getMessage());
            return ResponseEntity.status(preconditionRequiredException.getHttpStatus()).body(errorResponse);
        } catch (NotFoundException e) {
            log.error("Service form not found for update by ID {}: {}", id, e.getMessage());
            ErrorResponse errorResponse = new ErrorResponse(HttpStatus.NOT_FOUND.value(), e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        } catch (Exception e) {
            log.error("Error updating service form by ID {}: {}", id, e.getMessage());
            ErrorResponse errorResponse = new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @DeleteMapping(REST_PATH_ID)
    public ResponseEntity<?> delete(@PathVariable String id) {
        try {
            serviceFormService.delete(id);
            log.info("Service form deleted successfully with ID: {}", id);
            Map<String, Object> response = Map.of("raw", Collections.emptyList(), "affected", 1);
            return ResponseEntity.ok(response);
        } catch (NotFoundException e) {
            log.error("Service form not found for deletion by ID {}: {}", id, e.getMessage());
            ErrorResponse errorResponse = new ErrorResponse(HttpStatus.NOT_FOUND.value(), e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        } catch (Exception e) {
            log.error("Error deleting service form by ID {}: {}", id, e.getMessage());
            ErrorResponse errorResponse = new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }
}
