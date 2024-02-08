package com.sap.extensionmodules.repository;

import com.sap.extensionmodules.Utils.ServiceFormSpecification;
import com.sap.extensionmodules.dtos.*;
import com.sap.extensionmodules.exception.CustomNotFoundException;
import com.sap.extensionmodules.entity.ServiceForm;
import javassist.NotFoundException;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.DataIntegrityViolationException;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class ServiceFormRepositoryTest {

    @InjectMocks
    private ServiceFormRepository serviceFormRepository;

    @Mock
    private ServiceFormRepositoryInterface serviceRepo;

    @Test
    void testCreate_Success() {
        ServiceForm inputEntity = createSampleServiceFormEntity();
        when(serviceRepo.save(Mockito.any())).thenReturn(inputEntity);

        ServiceForm actualCreateResult = serviceFormRepository.create(inputEntity);

        verify(serviceRepo).save(Mockito.any());
        assertSame(inputEntity, actualCreateResult);
    }

    @Test
    void testCreate_DataIntegrityViolationException() {
        ServiceForm inputEntity = createSampleServiceFormEntity();
        when(serviceRepo.save(Mockito.any()))
                .thenThrow(new DataIntegrityViolationException("Msg"));

        assertThrows(CustomNotFoundException.class, () -> serviceFormRepository.create(inputEntity));
        verify(serviceRepo).save(Mockito.any());
    }

    @Test
    void testCreate_DataAccessException() {
        ServiceForm inputEntity = createSampleServiceFormEntity();
        when(serviceRepo.save(Mockito.any()))
                .thenThrow(new DataAccessException("Msg") {});

        assertThrows(CustomNotFoundException.class, () -> serviceFormRepository.create(inputEntity));
        verify(serviceRepo).save(Mockito.any());
    }

    @Test
    void testFindAll_Success() {
        ServiceFormSpecification spec = mock(ServiceFormSpecification.class);
        when(serviceRepo.findAll(spec)).thenReturn(new ArrayList<>());

        List<ServiceForm> actualResult = serviceFormRepository.findAll(spec);

        verify(serviceRepo).findAll(spec);
        assertTrue(actualResult.isEmpty());
    }

    @Test
    void testFindAll_DataAccessException() {
        ServiceFormSpecification spec = mock(ServiceFormSpecification.class);
        when(serviceRepo.findAll(spec)).thenThrow(new DataAccessException("Msg") {});

        assertThrows(CustomNotFoundException.class, () -> serviceFormRepository.findAll(spec));
        verify(serviceRepo).findAll(spec);
    }

    @Test
    void testFindById_Success() throws NotFoundException {
        String id = "42";
        ServiceForm entity = createSampleServiceFormEntity();
        when(serviceRepo.findById(id)).thenReturn(entity);

        ServiceForm actualResult = serviceFormRepository.findById(id);

        verify(serviceRepo).findById(id);
        assertSame(entity, actualResult);
    }

    @Test
    void testFindById_NotFoundException() {
        String id = "42";
        when(serviceRepo.findById(id)).thenReturn(null);

        assertThrows(NotFoundException.class, () -> serviceFormRepository.findById(id));
        verify(serviceRepo).findById(id);
    }

    @Test
    void testFindById_DataAccessException() {
        String id = "42";
        when(serviceRepo.findById(id)).thenThrow(new DataAccessException("Msg") {});

        assertThrows(CustomNotFoundException.class, () -> serviceFormRepository.findById(id));
        verify(serviceRepo).findById(id);
    }

    @Test
    void testDelete_Success() throws NotFoundException {
        ServiceForm entity = createSampleServiceFormEntity();

        serviceFormRepository.delete(entity);

        verify(serviceRepo).delete(entity);
    }

    @Test
    void testDelete_NotFoundException() {
        assertThrows(NotFoundException.class, () -> serviceFormRepository.delete(null));
    }

    @Test
    void testDelete_DataAccessException() {
        ServiceForm entity = createSampleServiceFormEntity();
        doThrow(new DataAccessException("Msg") {}).when(serviceRepo).delete(entity);

        assertThrows(CustomNotFoundException.class, () -> serviceFormRepository.delete(entity));
        verify(serviceRepo).delete(entity);
    }

    @Test
    void testUpdate_Success() {
        ServiceForm inputEntity = createSampleServiceFormEntity();
        when(serviceRepo.save(Mockito.any())).thenReturn(inputEntity);

        ServiceForm actualUpdateResult = serviceFormRepository.update(inputEntity);

        verify(serviceRepo).save(Mockito.any());
        assertSame(inputEntity, actualUpdateResult);
    }

    @Test
    void testUpdate_DataAccessException() {
        ServiceForm inputEntity = createSampleServiceFormEntity();
        when(serviceRepo.save(Mockito.any()))
                .thenThrow(new DataAccessException("Msg") {});

        assertThrows(CustomNotFoundException.class, () -> serviceFormRepository.update(inputEntity));
        verify(serviceRepo).save(Mockito.any());
    }

    private ServiceForm createSampleServiceFormEntity() {
        RegisteredProduct registeredProduct = new RegisteredProduct(
                "KH1234DF",
                "2023-06-01T00:00:00Z",
                "TATA Nexon XMA"
        );

        AdminData adminData = AdminData.builder()
                .createdOn("2024-01-09 10:45:27.445000000")
                .updatedOn("2024-01-10 04:05:10.101000000")
                .createdBy("b4042340-3a8b-42b3-b983-5db33caa331b")
                .updatedBy("b4042340-3a8b-42b3-b983-5db33caa331b")
                .build();

        List<ServicesDto> servicesProposed = List.of(
                new ServicesDto(
                        "2e9f0979-020d-4cf7-a4c8-3da0e8e49ec1",
                        "Change Engine Oil",
                        "4499",
                        2300,
                        4500,
                        true,
                        adminData
                ),
                new ServicesDto(
                        "2e9f0979-020d-4cf7-a4c8-3da0e8e49ec2",
                        "Oil Filter",
                        "3400",
                        1000,
                        6000,
                        true,
                        adminData
                )
        );

        List<InspectionItemDto> inspectionItems = List.of(
                new InspectionItemDto(
                        "3f32e6e4-8bf2-411e-90a6-87e27f663f4b",
                        "Check for body damage, dents, or scratches",
                        false,
                        adminData
                ),
                new InspectionItemDto(
                        "11f83129-c5af-4dff-82ef-e372f29b8f01",
                        "Inspect lights (headlights, taillights, brake lights, turn signals).",
                        false,
                        adminData
                ),
                new InspectionItemDto(
                        "ff53693c-71d2-493a-80c8-d58433bc8b52",
                        "Inspect the engine for oil leaks.",
                        false,
                        adminData
                ),
                new InspectionItemDto(
                        "129daa0c-fadc-4714-bddc-9a1eb9b3f480",
                        "Verify the condition of the serpentine belt.",
                        false,
                       adminData
                ),
                new InspectionItemDto(
                        "ff304083-b125-4cb4-b024-235322010614",
                        "Check transmission fluid level and condition.",
                        false,
                    adminData
                ),
                new InspectionItemDto(
                        "ea8dc1e7-1359-4973-9035-3a18035b1e41",
                        "Verify the condition of the brake pads and brake fluid.",
                        false,
                    adminData
                )
        );

        return ServiceForm.builder()
                .id("9e5e42ae-28c2-41dc-80f3-5c97c5efebd4")
                .displayId(1)
                .caseId("52bae7b3-8c35-11ee-b2e1-fff1214a8fa0")
                .caseDisplayId("815")
                .registeredProduct(registeredProduct)
                .customerComplaints("C1")
                .milometer(5667)
                .servicesProposed(servicesProposed)
                .inspectionItems(inspectionItems)
                .notes("N1")
                .status("Z02")
                .createdOn("2024-01-10 03:45:51.624000000")
                .updatedOn("2024-01-10 04:03:43.627000000")
                .createdBy("b4042340-3a8b-42b3-b983-5db33caa331b")
                .updatedBy("b4042340-3a8b-42b3-b983-5db33caa331b")
                .build();
    }

}

