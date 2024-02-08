package com.sap.extensionmodules.repository;

import com.sap.extensionmodules.commons.Constants;
import com.sap.extensionmodules.exception.CustomNotFoundException;
import com.sap.extensionmodules.entity.InspectionItem;
import javassist.NotFoundException;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
@ContextConfiguration(classes = {InspectionItemRepository.class})
@ExtendWith(SpringExtension.class)
public class InspectionItemRepositoryTest {

    @Autowired
    private InspectionItemRepository inspectionItemRepository;

    @MockBean
    private InspectionItemRepositoryInterface inspectionItemRepositoryInterface;

    @Test
    void testCreate() {
        InspectionItem inspectionItem = createSampleInspectionItemEntity();
        when(inspectionItemRepositoryInterface.save(Mockito.any())).thenReturn(inspectionItem);

        InspectionItem entity = createSampleInspectionItemEntity();

        InspectionItem actualCreateResult = inspectionItemRepository.create(entity);

        verify(inspectionItemRepositoryInterface).save(Mockito.any());
        assertSame(inspectionItem, actualCreateResult);
    }

    @Test
    void testCreate_DataIntegrityViolationException() {
        when(inspectionItemRepositoryInterface.save(Mockito.any()))
                .thenThrow(new DataIntegrityViolationException("Msg"));

        InspectionItem entity = createSampleInspectionItemEntity();

        assertThrows(CustomNotFoundException.class, () -> inspectionItemRepository.create(entity));
        verify(inspectionItemRepositoryInterface).save(Mockito.any());
    }

    @Test
    void testCreate_DataAccessException() {
        when(inspectionItemRepositoryInterface.save(Mockito.any()))
                .thenThrow(new CustomNotFoundException(1, "An error occurred"));

        InspectionItem entity = createSampleInspectionItemEntity();

        assertThrows(CustomNotFoundException.class, () -> inspectionItemRepository.create(entity));
        verify(inspectionItemRepositoryInterface).save(Mockito.any());
    }

    @Test
    void testCreate_CustomNotFoundException() {
        when(inspectionItemRepositoryInterface.save(Mockito.any()))
                .thenThrow(new EmptyResultDataAccessException(3));

        InspectionItem entity = createSampleInspectionItemEntity();

        assertThrows(CustomNotFoundException.class, () -> inspectionItemRepository.create(entity));
        verify(inspectionItemRepositoryInterface).save(Mockito.any());
    }

    @Test
    void testFindAll_Success() {
        when(inspectionItemRepositoryInterface.findAll()).thenReturn(new ArrayList<>());

        List<InspectionItem> actualFindAllResult = inspectionItemRepository.findAll();

        verify(inspectionItemRepositoryInterface).findAll();
        assertTrue(actualFindAllResult.isEmpty());
    }

    @Test
    void testFindAll_DataAccessException() {
        when(inspectionItemRepositoryInterface.findAll()).thenThrow(new DataIntegrityViolationException("Msg"));

        assertThrows(CustomNotFoundException.class, () -> inspectionItemRepository.findAll());
        verify(inspectionItemRepositoryInterface).findAll();
    }

    @Test
    void testFindAll_CustomNotFoundException() {
        when(inspectionItemRepositoryInterface.findAll()).thenThrow(new CustomNotFoundException(1, "An error occurred"));

        assertThrows(CustomNotFoundException.class, () -> inspectionItemRepository.findAll());
        verify(inspectionItemRepositoryInterface).findAll();
    }

    @Test
    void testFindById_Success() throws NotFoundException {
        InspectionItem inspectionItem = createSampleInspectionItemEntity();
        when(inspectionItemRepositoryInterface.findById(Mockito.<String>any())).thenReturn(inspectionItem);

        InspectionItem actualFindByIdResult = inspectionItemRepository.findById("42");

        verify(inspectionItemRepositoryInterface).findById(Mockito.<String>any());
        assertSame(inspectionItem, actualFindByIdResult);
    }

    @Test
    void testFindById_DataAccessException() {
        when(inspectionItemRepositoryInterface.findById(Mockito.<String>any()))
                .thenThrow(new DataIntegrityViolationException("InspectionItem Resource with the provided id not found"));

        assertThrows(CustomNotFoundException.class, () -> inspectionItemRepository.findById("42"));
        verify(inspectionItemRepositoryInterface).findById(Mockito.<String>any());
    }

    @Test
    void testFindById_NotFoundException() {
        String id = "42";
        NotFoundException exception = assertThrows(NotFoundException.class, () -> inspectionItemRepository.findById(id));
        assertEquals(Constants.Messages.INSPECTION_ITEM_RESOURCE_NOT_FOUND, exception.getMessage());
    }

    @Test
    void testUpdate_Success() throws NotFoundException {
        InspectionItem inspectionItem = createSampleInspectionItemEntity();
        when(inspectionItemRepositoryInterface.save(Mockito.any())).thenReturn(inspectionItem);

        InspectionItem entity = createSampleInspectionItemEntity();

        InspectionItem actualUpdateResult = inspectionItemRepository.update(entity);

        verify(inspectionItemRepositoryInterface).save(Mockito.any());
        assertSame(inspectionItem, actualUpdateResult);
    }

    @Test
    void testUpdate_DataAccessException() {
        when(inspectionItemRepositoryInterface.save(Mockito.any()))
                .thenThrow(new DataIntegrityViolationException("Msg"));

        InspectionItem entity = createSampleInspectionItemEntity();

        assertThrows(CustomNotFoundException.class, () -> inspectionItemRepository.update(entity));
        verify(inspectionItemRepositoryInterface).save(Mockito.any());
    }

    @Test
    void testUpdate_NotFoundException() {
        when(inspectionItemRepositoryInterface.save(Mockito.any()))
                .thenThrow(new CustomNotFoundException(1, "An error occurred"));

        InspectionItem entity = createSampleInspectionItemEntity();

        assertThrows(CustomNotFoundException.class, () -> inspectionItemRepository.update(entity));
        verify(inspectionItemRepositoryInterface).save(Mockito.any());
    }

    @Test
    void testDelete_Success() {
        doNothing().when(inspectionItemRepositoryInterface).delete(Mockito.any());

        InspectionItem entity = createSampleInspectionItemEntity();

        inspectionItemRepository.delete(entity);

        verify(inspectionItemRepositoryInterface).delete(Mockito.any());
        assertEquals("e12ed5b2-a3d9-439e-b689-b85775f3936e", entity.getUpdatedBy());
        assertEquals("2024-01-02 11:05:05.242000000", entity.getUpdatedOn());
        assertEquals("3f32e6e4-8bf2-411e-90a6-87e27f663f4b", entity.getId());
        assertEquals("e12ed5b2-a3d9-439e-b689-b85775f3936e", entity.getCreatedBy());
        assertEquals("2024-01-02 11:05:05.242000000", entity.getCreatedOn());
        assertEquals("Check for toolkits", entity.getDescription());
        assertFalse(entity.getIsSelected());
    }

    @Test
    void testDelete_DataAccessException() {
        doThrow(new DataIntegrityViolationException("Msg")).when(inspectionItemRepositoryInterface)
                .delete(Mockito.any());

        InspectionItem entity = createSampleInspectionItemEntity();

        assertThrows(CustomNotFoundException.class, () -> inspectionItemRepository.delete(entity));
        verify(inspectionItemRepositoryInterface).delete(Mockito.any());
    }

    @Test
    void testDelete_NotFoundException() {
        doThrow(new CustomNotFoundException(1, "An error occurred")).when(inspectionItemRepositoryInterface)
                .delete(Mockito.any());

        InspectionItem entity = createSampleInspectionItemEntity();

        assertThrows(CustomNotFoundException.class, () -> inspectionItemRepository.delete(entity));
        verify(inspectionItemRepositoryInterface).delete(Mockito.any());
    }

    private InspectionItem createSampleInspectionItemEntity() {
        return new InspectionItem("3f32e6e4-8bf2-411e-90a6-87e27f663f4b",
                "Check for toolkits",
                false,
                "2024-01-02 11:05:05.242000000",
                "2024-01-02 11:05:05.242000000",
                "e12ed5b2-a3d9-439e-b689-b85775f3936e",
                "e12ed5b2-a3d9-439e-b689-b85775f3936e");
    }
}
