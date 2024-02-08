package com.sap.extensionmodules.controller;

import com.sap.extensionmodules.dtos.InspectionItemDto;
import com.sap.extensionmodules.exception.APIExceptionHandler;
import com.sap.extensionmodules.service.InspectionItemService;
import com.sap.extensionmodules.exception.ErrorResponse;
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
@RequestMapping(SERVICE_PREFIX + REST_PATH_INSPECTION_ITEMS)
public class InspectionItemController {

    @Autowired
    InspectionItemService inspectionItemService;

    @PostMapping()
    public ResponseEntity<?> create(@RequestBody InspectionItemDto inspectionItemDto) {

        try {
            inspectionItemDto = inspectionItemService.create(inspectionItemDto);
            log.info("Inspection item created successfully: {}", inspectionItemDto);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(inspectionItemDto);
        } catch (Exception e) {
            log.error("Error creating inspection item: {}", e.getMessage());
            ErrorResponse errorResponse = new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @GetMapping()
    public ResponseEntity<?> findAll() {
        try {
            List<InspectionItemDto> dtoList = inspectionItemService.findAll();
            log.info("Found {} inspection items", dtoList.size());
            return ResponseEntity.status(HttpStatus.OK)
                    .body(dtoList);
        } catch (Exception e) {
            log.error("Error retrieving all inspection items: {}", e.getMessage());
            ErrorResponse errorResponse = new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @GetMapping(REST_PATH_ID)
    public ResponseEntity<?> findById(@PathVariable String id) {
        try {
            InspectionItemDto dto = inspectionItemService.findById(id);
            log.info("Found inspection item by ID {}: {}", id, dto);
            return ResponseEntity.status(HttpStatus.OK).body(dto);
        } catch (NotFoundException e) {
            log.warn("Inspection item not found by ID {}: {}", id, e.getMessage());
            ErrorResponse errorResponse = new ErrorResponse(HttpStatus.NOT_FOUND.value(), e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        } catch (Exception e) {
            log.error("Error retrieving inspection item by ID {}: {}", id, e.getMessage());
            ErrorResponse errorResponse = new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @PatchMapping(REST_PATH_ID)
    public ResponseEntity<?> update(@PathVariable String id,
                                    @RequestBody InspectionItemDto dto,
                                    @RequestHeader(name = HttpHeaders.IF_MATCH, required = false) String ifMatch) throws APIExceptionHandler {
        try {
            InspectionItemDto result = inspectionItemService.update(id, dto, ifMatch);
            log.info("Inspection item updated successfully: {}", result);
            return ResponseEntity.status(HttpStatus.OK)
                    .body(result);
        } catch (APIExceptionHandler preconditionRequiredException) {
            log.warn("Precondition required: {}", preconditionRequiredException.getMessage());
            ErrorResponse errorResponse = new ErrorResponse(preconditionRequiredException.getHttpStatus().value(), preconditionRequiredException.getMessage());
            return ResponseEntity.status(preconditionRequiredException.getHttpStatus()).body(errorResponse);
        } catch (NotFoundException e) {
            log.warn("Inspection item not found for update by ID {}: {}", id, e.getMessage());
            ErrorResponse errorResponse = new ErrorResponse(HttpStatus.NOT_FOUND.value(), e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        } catch (Exception e) {
            log.error("Error updating inspection item by ID {}: {}", id, e.getMessage());
            ErrorResponse errorResponse = new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @DeleteMapping(REST_PATH_ID)
    public ResponseEntity<?> delete(@PathVariable String id) throws NotFoundException {
        try {
            inspectionItemService.delete(id);
            log.info("Inspection item deleted successfully with ID: {}", id);
            Map<String, Object> response = Map.of("raw", Collections.emptyList(), "affected", 1);
            return ResponseEntity.ok(response);
        } catch (NotFoundException e) {
            log.warn("Inspection item not found for deletion by ID {}: {}", id, e.getMessage());
            ErrorResponse errorResponse = new ErrorResponse(HttpStatus.NOT_FOUND.value(), e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        } catch (Exception e) {
            log.error("Error deleting inspection item by ID {}: {}", id, e.getMessage());
            ErrorResponse errorResponse = new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }
}
