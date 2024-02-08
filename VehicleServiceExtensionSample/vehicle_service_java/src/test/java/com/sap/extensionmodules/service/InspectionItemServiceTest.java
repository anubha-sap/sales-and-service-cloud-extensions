package com.sap.extensionmodules.service;

import com.sap.extensionmodules.commons.Constants;
import com.sap.extensionmodules.dtos.AdminData;
import com.sap.extensionmodules.dtos.InspectionItemDto;
import com.sap.extensionmodules.entity.InspectionItem;
import com.sap.extensionmodules.exception.SecurityContextNotFoundException;
import com.sap.extensionmodules.mappers.VehicleServiceMapper;
import com.sap.extensionmodules.security.RequestContext;
import com.sap.extensionmodules.security.RequestContextProvider;
import com.sap.extensionmodules.repository.InspectionItemRepository;
import javassist.NotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class InspectionItemServiceTest {

    @Mock
    private InspectionItemRepository inspectionItemRepository;

    @Mock
    RequestContextProvider requestContextProvider;

    @Mock
    private VehicleServiceMapper mapper;

    @InjectMocks
    private InspectionItemService inspectionItemService;

    Constants.ExtensionFields extFields;

    Constants.CaseStatus caseStatus;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testCreate_Success() throws SecurityContextNotFoundException {
        InspectionItem inspectionItem = new InspectionItem("3f32e6e4-8bf2-411e-90a6-87e27f663f4b","Check for toolkits",false,"2024-01-09 10:45:27.445000000","2024-01-10 04:05:10.101000000","b4042340-3a8b-42b3-b983-5db33caa331b","b4042340-3a8b-42b3-b983-5db33caa331b");

        when(inspectionItemRepository.create(Mockito.any())).thenReturn(inspectionItem);

        InspectionItem inspectionItem2 = new InspectionItem("3f32e6e4-8bf2-411e-90a6-87e27f663f4b","Check for toolkits",false,"2024-01-09 10:45:27.445000000","2024-01-10 04:05:10.101000000","b4042340-3a8b-42b3-b983-5db33caa331b","b4042340-3a8b-42b3-b983-5db33caa331b");

        InspectionItemDto.InspectionItemDtoBuilder builderResult = InspectionItemDto.builder();
        AdminData adminData = AdminData.builder()
                .createdBy("b4042340-3a8b-42b3-b983-5db33caa331b")
                .createdOn("2024-01-09 10:45:27.445000000")
                .updatedBy("b4042340-3a8b-42b3-b983-5db33caa331b")
                .updatedOn("2024-01-09 10:45:27.445000000")
                .build();
        InspectionItemDto buildResult = builderResult.adminData(adminData)
                .description("Check for toolkits")
                .id("3f32e6e4-8bf2-411e-90a6-87e27f663f4b")
                .build();
        when(mapper.InspectionItemToDto(Mockito.any())).thenReturn(buildResult);
        when(mapper.inspectionItemDtoToInspectionItem(Mockito.any()))
                .thenReturn(inspectionItem2);
        RequestContext.RequestContextBuilder authTokenResult = RequestContext.builder().authToken("ABC123");
        RequestContext.RequestContextBuilder destinationResult = authTokenResult.caseStatus(caseStatus)
                .destination(null);
        RequestContext buildResult2 = destinationResult.extensionFields(extFields)
                .language("en")
                .userId("3f32e6e4-8bf2-411e-90a6-87e27f663f4b")
                .userToken("ABC123")
                .build();
        when(requestContextProvider.getRequestContext()).thenReturn(buildResult2);
        InspectionItemDto dto = new InspectionItemDto();

        inspectionItemService.create(dto);

        verify(mapper).InspectionItemToDto(Mockito.any());
        verify(mapper).inspectionItemDtoToInspectionItem(Mockito.any());
        verify(inspectionItemRepository).create(Mockito.any());
        verify(requestContextProvider, atLeast(1)).getRequestContext();
        AdminData adminData2 = dto.getAdminData();
        assertEquals("3f32e6e4-8bf2-411e-90a6-87e27f663f4b", adminData2.getCreatedBy());
        assertEquals("3f32e6e4-8bf2-411e-90a6-87e27f663f4b", adminData2.getUpdatedBy());
    }

    @Test
    void testFindAll_Success() {
        when(inspectionItemRepository.findAll()).thenReturn(new ArrayList<>());

        List<InspectionItemDto> actualFindAllResult = inspectionItemService.findAll();

        verify(inspectionItemRepository).findAll();
        assertTrue(actualFindAllResult.isEmpty());
    }

    @Test
    void testFindAll() {
        InspectionItem inspectionItem = new InspectionItem("3f32e6e4-8bf2-411e-90a6-87e27f663f4b","Check for toolkits",false,"2024-01-09 10:45:27.445000000","2024-01-10 04:05:10.101000000","b4042340-3a8b-42b3-b983-5db33caa331b","b4042340-3a8b-42b3-b983-5db33caa331b");

        List<InspectionItem> inspectionItemList = new ArrayList<>();
        inspectionItemList.add(inspectionItem);
        when(inspectionItemRepository.findAll()).thenReturn(inspectionItemList);
        InspectionItemDto.InspectionItemDtoBuilder builderResult = InspectionItemDto.builder();
        AdminData adminData = AdminData.builder()
                .createdBy("b4042340-3a8b-42b3-b983-5db33caa331b")
                .createdOn("2024-01-09 10:45:27.445000000")
                .updatedBy("b4042340-3a8b-42b3-b983-5db33caa331b")
                .updatedOn("b4042340-3a8b-42b3-b983-5db33caa331b")
                .build();
        InspectionItemDto buildResult = builderResult.adminData(adminData)
                .description("Check for toolkits")
                .id("3f32e6e4-8bf2-411e-90a6-87e27f663f4b")
                .build();
        when(mapper.InspectionItemToDto(Mockito.any())).thenReturn(buildResult);

        List<InspectionItemDto> actualFindAllResult = inspectionItemService.findAll();

        verify(mapper).InspectionItemToDto(Mockito.any());
        verify(inspectionItemRepository).findAll();
        assertEquals(1, actualFindAllResult.size());
    }

    @Test
    void testFindById_Success() throws NotFoundException {
        InspectionItem inspectionItem = new InspectionItem("3f32e6e4-8bf2-411e-90a6-87e27f663f4b","Check for toolkits",false,"2024-01-09 10:45:27.445000000","2024-01-10 04:05:10.101000000","b4042340-3a8b-42b3-b983-5db33caa331b","b4042340-3a8b-42b3-b983-5db33caa331b");
        when(inspectionItemRepository.findById(Mockito.any())).thenReturn(inspectionItem);
        InspectionItemDto.InspectionItemDtoBuilder builderResult = InspectionItemDto.builder();
        AdminData adminData = AdminData.builder()
                .createdBy("b4042340-3a8b-42b3-b983-5db33caa331b")
                .createdOn("2024-01-09 10:45:27.445000000")
                .updatedBy("b4042340-3a8b-42b3-b983-5db33caa331b")
                .updatedOn("2024-01-09 10:45:27.445000000")
                .build();
        InspectionItemDto buildResult = builderResult.adminData(adminData)
                .description("Check for toolkits")
                .id("3f32e6e4-8bf2-411e-90a6-87e27f663f4b")
                .build();
        when(mapper.InspectionItemToDto(Mockito.any())).thenReturn(buildResult);

        inspectionItemService.findById("3f32e6e4-8bf2-411e-90a6-87e27f663f4b");

        verify(mapper).InspectionItemToDto(Mockito.any());
        verify(inspectionItemRepository).findById(Mockito.any());
    }
    
    @Test
    void testUpdate() throws NotFoundException {
        InspectionItem inspectionItem = new InspectionItem();
        String id = "3f32e6e4-8bf2-411e-90a6-87e27f663f4b";
        String ifMatch = "someIfMatchValue";
        AdminData adminData = AdminData.builder()
                .createdOn("2024-01-09 10:45:27.445000000")
                .updatedOn("2024-01-10 04:05:10.101000000")
                .createdBy("b4042340-3a8b-42b3-b983-5db33caa331b")
                .updatedBy("b4042340-3a8b-42b3-b983-5db33caa331b")
                .build();
        InspectionItemDto dto = new InspectionItemDto("3f32e6e4-8bf2-411e-90a6-87e27f663f4b","Check for toolkits",false,adminData);

        InspectionItem existingInspectionItem = new InspectionItem("3f32e6e4-8bf2-411e-90a6-87e27f663f4b","Check for toolkits",false,"2024-01-09 10:45:27.445000000","2024-01-10 04:05:10.101000000","b4042340-3a8b-42b3-b983-5db33caa331b","b4042340-3a8b-42b3-b983-5db33caa331b");

        when(mapper.InspectionItemToDto(inspectionItemRepository.findById(id))).thenReturn(dto).thenReturn(dto);
        when(requestContextProvider.getRequestContext()).thenReturn(RequestContext.builder().userId("someUserId").build());

        AdminData updatedAdminData = new AdminData();
        updatedAdminData.setUpdatedBy("someUserId");
        updatedAdminData.setUpdatedOn("currentTimestamp");  // Replace with actual timestamp

        dto.setAdminData(updatedAdminData);

        doNothing().when(mapper).updateInspectionItem(dto, inspectionItem);
        when(inspectionItemRepository.update(inspectionItem)).thenReturn(existingInspectionItem);

        InspectionItemDto result = inspectionItemService.update(id, dto, ifMatch);

        assertNotNull(result);
        assertEquals(id, result.getId());
        assertEquals(dto.getDescription(), result.getDescription());
        assertEquals("someUserId", result.getAdminData().getUpdatedBy());
    }
    
    @Test
    public void testUpdate_InvalidId() throws NotFoundException {
        setUp();
        String id = "123";
        String ifMatch = "abc";
        InspectionItemDto dto = new InspectionItemDto();
        dto.setDescription("Check Carburetor Condition");

        when(inspectionItemRepository.findById(id)).thenReturn(null);

        assertThrows(NotFoundException.class, () -> inspectionItemService.update(id, dto, ifMatch));
    }

    @Test
    public void testUpdate_NullExistingInspectionItem() throws NotFoundException {
        setUp();
        String id = "123";
        String ifMatch = "abc";
        InspectionItemDto dto = new InspectionItemDto();
        dto.setDescription("Check Carburetor Condition");

        when(inspectionItemRepository.findById(id)).thenReturn(null);

        assertThrows(NotFoundException.class, () -> inspectionItemService.update(id, dto, ifMatch));
    }

    @Test
    public void testUpdate_NullUserId() throws NotFoundException {
        setUp();
        String id = "123";
        String ifMatch = "abc";
        InspectionItemDto dto = new InspectionItemDto();
        dto.setDescription("Check Carburetor Condition");

        InspectionItem existingInspectionItem = new InspectionItem();
        existingInspectionItem.setId(id);
        existingInspectionItem.setDescription("Check Carburetor");

        when(inspectionItemRepository.findById(id)).thenReturn(existingInspectionItem);
        when(mapper.InspectionItemToDto(existingInspectionItem)).thenReturn(dto);
        RequestContext.RequestContextBuilder authTokenResult = RequestContext.builder().authToken("ABC123");
        RequestContext.RequestContextBuilder destinationResult = authTokenResult.caseStatus(caseStatus)
                .destination(null);
        RequestContext buildResult2 = destinationResult.extensionFields(extFields)
                .language("en")
                .userId("3f32e6e4-8bf2-411e-90a6-87e27f663f4b")
                .userToken("ABC123")
                .build();
        when(requestContextProvider.getRequestContext()).thenReturn(buildResult2);

        assertThrows(Exception.class, () -> inspectionItemService.update(id, dto, ifMatch));
    }

    @Test
    public void testUpdate_NullRepositoryResult() throws NotFoundException {
        setUp();
        String id = "123";
        String ifMatch = "abc";
        InspectionItemDto dto = new InspectionItemDto();
        dto.setDescription("Check Carburetor Condition");

        InspectionItem existingInspectionItem = new InspectionItem();
        existingInspectionItem.setId(id);
        existingInspectionItem.setDescription("Check Carburetor");

        when(inspectionItemRepository.findById(id)).thenReturn(existingInspectionItem);
        when(mapper.InspectionItemToDto(existingInspectionItem)).thenReturn(dto);
        RequestContext.RequestContextBuilder authTokenResult = RequestContext.builder().authToken("ABC123");
        RequestContext.RequestContextBuilder destinationResult = authTokenResult.caseStatus(caseStatus)
                .destination(null);
        RequestContext buildResult2 = destinationResult.extensionFields(extFields)
                .language("en")
                .userId("3f32e6e4-8bf2-411e-90a6-87e27f663f4b")
                .userToken("ABC123")
                .build();
        when(requestContextProvider.getRequestContext()).thenReturn(buildResult2);
        when(inspectionItemRepository.update(any(InspectionItem.class))).thenReturn(null);

        assertThrows(Exception.class, () -> inspectionItemService.update(id, dto, ifMatch));
    }

    @Test
    public void testUpdate_NullDtoResult() throws NotFoundException {
        setUp();
        String id = "123";
        String ifMatch = "abc";
        InspectionItemDto dto = new InspectionItemDto();
        dto.setDescription("Check Carburetor Condition");

        InspectionItem existingInspectionItem = new InspectionItem();
        existingInspectionItem.setId(id);
        existingInspectionItem.setDescription("Check Carburetor");

        InspectionItem updatedInspectionItem = new InspectionItem();
        updatedInspectionItem.setId(id);
        updatedInspectionItem.setDescription(dto.getDescription());

        when(inspectionItemRepository.findById(id)).thenReturn(existingInspectionItem);
        when(mapper.InspectionItemToDto(existingInspectionItem)).thenReturn(dto);
        RequestContext.RequestContextBuilder authTokenResult = RequestContext.builder().authToken("ABC123");
        RequestContext.RequestContextBuilder destinationResult = authTokenResult.caseStatus(caseStatus)
                .destination(null);
        RequestContext buildResult2 = destinationResult.extensionFields(extFields)
                .language("en")
                .userId("3f32e6e4-8bf2-411e-90a6-87e27f663f4b")
                .userToken("ABC123")
                .build();
        when(requestContextProvider.getRequestContext()).thenReturn(buildResult2);
        when(inspectionItemRepository.update(any(InspectionItem.class))).thenReturn(updatedInspectionItem);
        when(mapper.InspectionItemToDto(updatedInspectionItem)).thenReturn(null);

        assertThrows(Exception.class, () -> inspectionItemService.update(id, dto, ifMatch));
    }

    @Test
    void testDelete() throws NotFoundException {
        InspectionItem inspectionItem = new InspectionItem("3f32e6e4-8bf2-411e-90a6-87e27f663f4b","Check for toolkits",false,"2024-01-09 10:45:27.445000000","2024-01-10 04:05:10.101000000","b4042340-3a8b-42b3-b983-5db33caa331b","b4042340-3a8b-42b3-b983-5db33caa331b");
        doNothing().when(inspectionItemRepository).delete(Mockito.any());
        when(inspectionItemRepository.findById(Mockito.any())).thenReturn(inspectionItem);
        InspectionItemDto.InspectionItemDtoBuilder builderResult = InspectionItemDto.builder();
        AdminData adminData = AdminData.builder()
                .createdBy("b4042340-3a8b-42b3-b983-5db33caa331b")
                .createdOn("2024-01-09 10:45:27.445000000")
                .updatedBy("b4042340-3a8b-42b3-b983-5db33caa331b")
                .updatedOn("2024-01-09 10:45:27.445000000")
                .build();
        InspectionItemDto buildResult = builderResult.adminData(adminData)
                .description("Check for toolkits")
                .id("3f32e6e4-8bf2-411e-90a6-87e27f663f4b")
                .build();
        when(mapper.InspectionItemToDto(Mockito.any())).thenReturn(buildResult);

        inspectionItemService.delete("3f32e6e4-8bf2-411e-90a6-87e27f663f4b");

        verify(mapper).InspectionItemToDto(Mockito.any());
        verify(inspectionItemRepository).delete(Mockito.any());
        verify(inspectionItemRepository).findById(Mockito.any());
    }

    @Test
    void testDelete_DataAccessException() {
        String id = "42";
        NotFoundException exception = assertThrows(NotFoundException.class, () -> inspectionItemService.delete(id));
        assertEquals(Constants.Messages.INSPECTION_ITEM_RESOURCE_NOT_FOUND, exception.getMessage());
    }

}

