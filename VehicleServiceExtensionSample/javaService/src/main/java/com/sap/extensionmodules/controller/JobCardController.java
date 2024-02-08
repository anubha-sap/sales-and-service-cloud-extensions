package com.sap.extensionmodules.controller;

import com.sap.cloud.sdk.services.openapi.core.OpenApiRequestException;
import com.sap.extensionmodules.Utils.StatusUtil;
import com.sap.extensionmodules.commons.Constants;
import com.sap.extensionmodules.commons.JCStatus;
import com.sap.extensionmodules.commons.ServiceStatus;
import com.sap.extensionmodules.dtos.JobCardDto;
import com.sap.extensionmodules.dtos.JobCardServicesDto;
import com.sap.extensionmodules.dtos.JobCardServicesUpdateDto;
import com.sap.extensionmodules.dtos.JobCardValidationResponse;
import com.sap.extensionmodules.dtos.StatusDto;
import com.sap.extensionmodules.exception.APIExceptionHandler;
import com.sap.extensionmodules.exception.CustomNotFoundException;
import com.sap.extensionmodules.exception.CustomValidationException;
import com.sap.extensionmodules.exception.ErrorResponse;
import javassist.NotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.sap.extensionmodules.service.JobCardService;

import java.rmi.ServerException;
import java.util.*;

import static com.sap.extensionmodules.commons.APIConstants.*;

@RestController
@Slf4j
@RequestMapping(SERVICE_PREFIX + REST_PATH_JOBCARDS)
public class JobCardController {
    @Autowired
    JobCardService jobCardService;
    @Autowired
    StatusUtil statusUtil;

    @PostMapping()
    public ResponseEntity<?> createJobCard(@RequestParam String sourceid,
                                           @RequestParam String sourceType) {
        try {
            log.info("Creating job card for service form with id {}",sourceid);
            JobCardDto dto = jobCardService.createJobCard(sourceid, sourceType);
            return ResponseEntity.status(HttpStatus.CREATED).body(dto);
        } catch (CustomValidationException e) {
            log.error(e.getMessage());
            ErrorResponse errorResponse = new ErrorResponse(HttpStatus.BAD_REQUEST.value(),
                    "Bad Request", e.getDetails());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        } catch (CustomNotFoundException e) {
            log.error(e.getMessage());
            ErrorResponse errorResponse = new ErrorResponse(e.getCode(), e.getMessage());
            return ResponseEntity.status(e.getCode()).body(errorResponse);
        } catch (OpenApiRequestException e) {
            log.error(e.getMessage());
            ErrorResponse errorResponse = new ErrorResponse(HttpStatus.NOT_FOUND.value(),
                    "Cannot read Case data");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        } catch (ServerException e) {
            log.error(e.getMessage());
            ErrorResponse errorResponse = new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(),
                    "Cannot update Case data");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        } catch (NotFoundException e) {
            log.error(e.getMessage());
            ErrorResponse errorResponse = new ErrorResponse(HttpStatus.NOT_FOUND.value(), e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        } catch (Exception e) {
            log.error(e.getMessage());
            ErrorResponse errorResponse = new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(),
                    e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    //find all job cards or find by case ID
    @GetMapping()
    public ResponseEntity<?> findAll
    (@RequestParam(value = Constants.QUERY_OPTION_FILTER, required = false)
     Optional<String> filter, @RequestHeader(value = HttpHeaders.ACCEPT_LANGUAGE, required = false) String
             language) {
        try {
            List<JobCardDto> dtoList = jobCardService.findAll(filter);
            String lang = (language != null) ? language : "en-US";
            for (JobCardDto dto : dtoList) {
                statusUtil.addStatusDescription(dto, lang);
            }
            log.info("Found {} job cards", dtoList.size());
            return ResponseEntity.status(HttpStatus.OK).body(dtoList);
        } catch (Exception e) {
            log.error("Error retrieving job cards: {}", e.getMessage());
            ErrorResponse errorResponse = new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(),
                    e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
//                    throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage(), e);
        }
    }

    @GetMapping("/{jobCardId}")
    public ResponseEntity<?> findOne(@PathVariable String
                                             jobCardId, @RequestHeader(value = HttpHeaders.ACCEPT_LANGUAGE, required = false) String language) {
        try {
            JobCardDto dto = jobCardService.findOne(jobCardId);
            String lang = (language != null) ? language : "en-US";
            statusUtil.addStatusDescription(dto, lang);
            log.info("Found job card with ID {}: {}", jobCardId, dto);
            return ResponseEntity.status(HttpStatus.OK).body(dto);
        } catch (CustomNotFoundException e) {
            log.warn("Job card not found with ID {}: {}", jobCardId, e.getMessage());
            ErrorResponse errorResponse = new ErrorResponse(e.getCode(), e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        } catch (Exception e) {
            log.error("Error retrieving job card with ID {}: {}", jobCardId, e.getMessage());
            ErrorResponse errorResponse = new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(),
                    e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }

    }

    //   PATCH request with ifMatch
    @PatchMapping("/{jobCardId}/services/{jobCardServiceId}")
    public ResponseEntity<?> updateJobCardService(@PathVariable String jobCardId,
                                                  @PathVariable String jobCardServiceId,
                                                  @RequestBody JobCardServicesUpdateDto jobCardServicesUpdateDto,
                                                  @RequestHeader(name = HttpHeaders.IF_MATCH, required = false) String ifMatch) throws APIExceptionHandler {
        try {
            JobCardServicesDto dto = jobCardService.updateJobCardService(jobCardId, jobCardServiceId, jobCardServicesUpdateDto, ifMatch);
            log.info("Job card updated successfully: {}", dto);
            return ResponseEntity.status(HttpStatus.OK).body(dto);
        } catch (APIExceptionHandler preconditionRequiredException) {
            log.error("Precondition required: {}",preconditionRequiredException.getMessage());
            ErrorResponse errorResponse = new ErrorResponse(preconditionRequiredException.getHttpStatus().value(), preconditionRequiredException.getMessage());
            return ResponseEntity.status(preconditionRequiredException.getHttpStatus()).body(errorResponse);
        } catch (OpenApiRequestException e) {
            log.error("OpenAPI request error: {}",e.getMessage());
            ErrorResponse errorResponse = new ErrorResponse(HttpStatus.NOT_FOUND.value(),
                    "Cannot read Case data");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        } catch (CustomNotFoundException e) {
            log.error("Job card not found with jobcardId {} and jobCardServiceId {}: {}", jobCardId,jobCardServiceId,e.getMessage());
            ErrorResponse errorResponse = new ErrorResponse(e.getCode(), e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        } catch (ServerException e) {
            log.error("Server exception: {}",e.getMessage());
            ErrorResponse errorResponse = new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(),
                    "Cannot update Case data");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        } catch (Exception e) {
            log.error("Error updating job card with jobcardId {} and jobCardServiceId {}: {}", jobCardId,jobCardServiceId,e.getMessage());
            ErrorResponse errorResponse = new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(),
                    e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @DeleteMapping("/{jobCardId}")
    public ResponseEntity<?> remove(@PathVariable String jobCardId) {
        try {
            jobCardService.remove(jobCardId);
            Map<String, Object> response = Map.of("raw", Collections.emptyList(), "affected", 1);
            log.info("Job card deleted successfully with ID: {}", jobCardId);
            return ResponseEntity.ok(response);
            // return ResponseEntity.status(HttpStatus.OK).body(jobCardService.remove(jobCardId));
        } catch (CustomNotFoundException e) {
            log.error("Job card not found with jobcardId {}: {}", jobCardId,e.getMessage());
            ErrorResponse errorResponse = new ErrorResponse(e.getCode(), e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        } catch (Exception e) {
            log.error("Error deleting job card with jobcardId {}: {}", jobCardId,e.getMessage());
            ErrorResponse errorResponse = new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(),
                    e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);

        }
    }

    @GetMapping("/{jobCardId}/services") //find all jobCardServices related to the jobCardId
    public ResponseEntity<?> findAllJobCardServices(@PathVariable String
                                                            jobCardId, @RequestHeader(value = HttpHeaders.ACCEPT_LANGUAGE, required = false) String language) {
        try {
            List<JobCardServicesDto> dtoList = jobCardService.findAllJobCardServices(jobCardId);
            String lang = (language != null) ? language : "en-US";
            for (JobCardServicesDto dto : dtoList) {
                dto.setStatusDescription(statusUtil.getDescription(dto.getStatus(), lang));
            }
            log.info("Found {} services with Job card ID: {}", dtoList.size(), jobCardId);
            return ResponseEntity.status(HttpStatus.OK).body(dtoList);
        } catch (CustomNotFoundException e) {
            log.error("Job card not found with jobcardId {}: {}", jobCardId,e.getMessage());
            ErrorResponse errorResponse = new ErrorResponse(e.getCode(), e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        } catch (Exception e) {
            log.error("Error retrieving job card services with ID {}: {}", jobCardId, e.getMessage());
            ErrorResponse errorResponse = new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(),
                    e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @GetMapping("/{jobCardId}/services/{jobCardServiceId}")
    public ResponseEntity<?> findOneJobCardService(@PathVariable String jobCardId,
                                                   @PathVariable String jobCardServiceId, @RequestHeader(value = HttpHeaders.ACCEPT_LANGUAGE, required = false) String
                                                           language) {
        try {
            JobCardServicesDto dto = jobCardService.findOneJobCardService(jobCardServiceId);
            String lang = (language != null) ? language : "en-US";
            dto.setStatusDescription(statusUtil.getDescription(dto.getStatus(), lang));
            log.info("Found job card service with ID {}: {}", jobCardServiceId, dto);
            return ResponseEntity.status(HttpStatus.OK).body(dto);
        } catch (CustomNotFoundException e) {
            log.error("Job card service not found with ID {}: {}", jobCardServiceId,e.getMessage());
            ErrorResponse errorResponse = new ErrorResponse(e.getCode(), e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        } catch (Exception e) {
            log.error("Error retrieving job card service with ID {}: {}", jobCardServiceId, e.getMessage());
            ErrorResponse errorResponse = new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(),
                    e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @GetMapping("/statuses")
    public ResponseEntity<List<StatusDto>> findAllJCStatuses
            (@RequestHeader(value = HttpHeaders.ACCEPT_LANGUAGE, required = false) String language) {
        List<StatusDto> dtoList = new ArrayList<>();
        String lang = (language != null) ? language : "en-US";
        for (JCStatus s : JCStatus.values()) {
            String desc = statusUtil.getDescription(s.toString(), lang);
            StatusDto dto = new StatusDto(s.toString(), desc);
            dtoList.add(dto);
        }
        return ResponseEntity.status(HttpStatus.OK).body(dtoList);
    }

    @GetMapping("/services/statuses")
    public ResponseEntity<List<StatusDto>> findAllJCServiceStatuses
            (@RequestHeader(value = HttpHeaders.ACCEPT_LANGUAGE, required = false) String language) {
        List<StatusDto> dtoList = new ArrayList<>();
        String lang = (language != null) ? language : "en-US";
        for (ServiceStatus s : ServiceStatus.values()) {
            String desc = statusUtil.getDescription(s.toString(), lang);
            StatusDto dto = new StatusDto(s.toString(), desc);
            dtoList.add(dto);
        }
        log.info("Found {} services statuses", dtoList.size());
        return ResponseEntity.status(HttpStatus.OK).body(dtoList);
    }

    @PostMapping("/validations")
    public ResponseEntity<?> findValidationStatus(@RequestBody Map<String, Object> body) {
        try{
            log.info("Calling job card validation service.");
            String entityName = (String) body.get("entity");
            Map<String, Object> sCompleteAggregateEntity = (Map<String, Object>) body.get("currentImage");
            JobCardValidationResponse response = jobCardService.findValidationStatusService(entityName, sCompleteAggregateEntity);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }
        catch (Exception e) {
            log.error("Error in job card validation : {} ",  e.getMessage());
            ErrorResponse errorResponse = new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(),
                    e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

}
