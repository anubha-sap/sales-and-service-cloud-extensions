package com.sap.extensionmodules.service;

import com.sap.extensionmodules.commons.Constants;
import com.sap.extensionmodules.dtos.AdminData;
import com.sap.extensionmodules.dtos.ServicesDto;
import com.sap.extensionmodules.entity.Services;
import com.sap.extensionmodules.mappers.VehicleServiceMapper;
import com.sap.extensionmodules.repository.ServicesRepository;
import com.sap.extensionmodules.security.RequestContext;
import com.sap.extensionmodules.security.RequestContextProvider;
import javassist.NotFoundException;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

class ServicesServiceTest {

    @InjectMocks
    private ServicesService servicesService;

    @Mock
    private ServicesRepository servicesRepository;

    @Mock
    private RequestContextProvider requestContextProvider;

    @Mock
    private VehicleServiceMapper mapper;

    @Mock
    private Constants.ExtensionFields extFields;

    @Mock
    private Constants.CaseStatus caseStatus;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testCreate_Success() {
        ServicesDto inputDto = createSampleServicesDto();
        Services entity = createSampleServicesEntity();

        when(requestContextProvider.getRequestContext()).thenReturn(createSampleRequestContext());
        when(mapper.ServicesDtoToServices(inputDto)).thenReturn(entity);
        when(servicesRepository.create(entity)).thenReturn(entity);
        when(mapper.ServicesToDto(entity)).thenReturn(inputDto);

        ServicesDto result = servicesService.create(inputDto);

        Assertions.assertNotNull(result);
        Assertions.assertEquals(inputDto, result);

        verify(requestContextProvider, atLeast(1)).getRequestContext();
        verify(mapper).ServicesDtoToServices(inputDto);
        verify(servicesRepository).create(entity);
        verify(mapper).ServicesToDto(entity);
    }

    @Test
    void testCreate_Failure() {
        ServicesDto inputDto = createSampleServicesDto();
        RuntimeException exception = new RuntimeException("Some error");

        when(requestContextProvider.getRequestContext()).thenReturn(createSampleRequestContext());
        when(mapper.ServicesDtoToServices(inputDto)).thenReturn(createSampleServicesEntity());
        when(servicesRepository.create(any())).thenThrow(exception);

        assertThrows(RuntimeException.class, () -> servicesService.create(inputDto));

        verify(requestContextProvider, atLeast(1)).getRequestContext();
        verify(mapper).ServicesDtoToServices(inputDto);
        verify(servicesRepository).create(any());
    }

    @Test
    void testFindAll_Success() {
        List<Services> entities = Arrays.asList(
                createSampleServicesEntity(),
                createSampleServicesEntity(),
                createSampleServicesEntity()
        );

        List<ServicesDto> expectedDtoList = entities.stream()
                .map(mapper::ServicesToDto)
                .toList();

        when(servicesRepository.findAll()).thenReturn(entities);

        List<ServicesDto> result = servicesService.findAll();

        Assertions.assertNotNull(result);
        Assertions.assertEquals(expectedDtoList.size(), result.size());
        Assertions.assertTrue(result.containsAll(expectedDtoList));

        verify(servicesRepository).findAll();
    }

    @Test
    void testFindAll_EmptyList() {
        when(servicesRepository.findAll()).thenReturn(Collections.emptyList());

        List<ServicesDto> result = servicesService.findAll();

        Assertions.assertNotNull(result);
        Assertions.assertTrue(result.isEmpty());

        verify(servicesRepository).findAll();
        verifyNoInteractions(mapper);
    }

    @Test
    void testFindById_Success() throws NotFoundException {
        String serviceId = "245fe633-ed8d-44c1-9f87-28cae09abe06";
        Services sampleEntity = createSampleServicesEntity();
        ServicesDto expectedDto = createSampleServicesDto();

        when(servicesRepository.findById(serviceId)).thenReturn(sampleEntity);
        when(mapper.ServicesToDto(sampleEntity)).thenReturn(expectedDto);

        ServicesDto result = servicesService.findById(serviceId);

        Assertions.assertNotNull(result);
        Assertions.assertEquals(expectedDto, result);

        verify(servicesRepository).findById(serviceId);
        verify(mapper).ServicesToDto(sampleEntity);
    }

    @Test
    void testFindById_NotFound() throws NotFoundException {
        String serviceId = "nonexistent-id";

        when(servicesRepository.findById(serviceId)).thenThrow(NotFoundException.class);

        assertThrows(NotFoundException.class, () -> servicesService.findById(serviceId));

        verify(servicesRepository).findById(serviceId);
        verifyNoInteractions(mapper);
    }

    @Test
    void testUpdate_Success() throws NotFoundException {
        Services services = new Services();
        String serviceId = "245fe633-ed8d-44c1-9f87-28cae09abe06";
        String ifMatch = "validIfMatchValue";

        ServicesDto inputDto = createSampleServicesDto();

        Services existingService = createSampleServicesEntity();

        when(mapper.ServicesToDto(servicesRepository.findById(serviceId))).thenReturn(inputDto).thenReturn(inputDto);
        when(requestContextProvider.getRequestContext()).thenReturn(RequestContext.builder().userId("someUserId").build());

        AdminData updatedAdminData = new AdminData();
        updatedAdminData.setUpdatedBy("someUserId");
        updatedAdminData.setUpdatedOn("currentTimestamp");

        inputDto.setAdminData(updatedAdminData);

        doNothing().when(mapper).updateServices(inputDto, services);
        when(servicesRepository.update(services)).thenReturn(existingService);

        ServicesDto result = servicesService.update(serviceId, inputDto, ifMatch);

        Assertions.assertNotNull(result);
        Assertions.assertEquals(inputDto, result);
        assertEquals(inputDto.getService(), result.getService());
        assertEquals("someUserId", result.getAdminData().getUpdatedBy());
    }



    @Test
    void testUpdate_ServiceNotFound() throws NotFoundException {
        String serviceId = "nonexistent-id";
        ServicesDto inputDto = createSampleServicesDto();
        String ifMatch = "validIfMatchValue";

        when(servicesRepository.findById(serviceId)).thenReturn(null);

        assertThrows(NotFoundException.class, () -> servicesService.update(serviceId, inputDto, ifMatch));

        verify(servicesRepository).findById(serviceId);
    }

    @Test
    void testDelete_Success() throws NotFoundException {
        String serviceId = "245fe633-ed8d-44c1-9f87-28cae09abe06";
        Services entity = createSampleServicesEntity();
        ServicesDto expectedDto = createSampleServicesDto();

        when(servicesRepository.findById(serviceId)).thenReturn(entity);
        when(mapper.ServicesToDto(entity)).thenReturn(expectedDto);

        ServicesDto result = servicesService.delete(serviceId);

        Assertions.assertNotNull(result);
        assertEquals(expectedDto, result);

        verify(servicesRepository).findById(serviceId);
        verify(mapper).ServicesToDto(entity);
        verify(servicesRepository).delete(entity);
    }

    @Test
    void testDelete_NotFound() throws NotFoundException {
        String serviceId = "nonExistingId";

        when(servicesRepository.findById(serviceId)).thenReturn(null);

        assertThrows(NotFoundException.class, () -> servicesService.delete(serviceId));

        verify(servicesRepository).findById(serviceId);
        verifyNoMoreInteractions(mapper, servicesRepository);
    }

    private RequestContext createSampleRequestContext() {
        return RequestContext.builder()
                .authToken("ABC123")
                .caseStatus(caseStatus)
                .destination(null)
                .extensionFields(extFields)
                .language("en")
                .userId("3f32e6e4-8bf2-411e-90a6-87e27f663f4b")
                .userToken("ABC123")
                .build();
    }

    private ServicesDto createSampleServicesDto() {
        return new ServicesDto(
                "245fe633-ed8d-44c1-9f87-28cae09abe06",
                "Shock Replacement",
                "3500",
                1000,
                6000,
                false,
                createSampleAdminData()
        );
    }

    private Services createSampleServicesEntity() {
        return new Services("245fe633-ed8d-44c1-9f87-28cae09abe06",
                "Shock Replacement",
                "3500",
                1000,
                6000,
                false,
                "2024-01-02 11:05:05.242000000",
                "2024-01-02 11:05:05.242000000,",
                "e12ed5b2-a3d9-439e-b689-b85775f3936e",
                "e12ed5b2-a3d9-439e-b689-b85775f3936e");
    }

    private AdminData createSampleAdminData() {
        return new AdminData(
                "2024-01-02 11:05:05.242000000",
                "2024-01-02 11:05:05.242000000",
                "e12ed5b2-a3d9-439e-b689-b85775f3936e",
                "e12ed5b2-a3d9-439e-b689-b85775f3936e"
        );
    }
}

