package com.sap.extensionmodules.repository;

import com.sap.extensionmodules.commons.Constants;
import com.sap.extensionmodules.exception.CustomNotFoundException;
import com.sap.extensionmodules.entity.Services;
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
@ContextConfiguration(classes = {ServicesRepository.class})
@ExtendWith(SpringExtension.class)
public class ServicesRepositoryTest {
    @Autowired
    private ServicesRepository servicesRepository;

    @MockBean
    private ServicesRepositoryInterface servicesRepositoryInterface;

    @Test
    void testCreate() {
        Services services = createSampleServicesEntity();

        when(servicesRepositoryInterface.save(Mockito.any())).thenReturn(services);

        Services entity = createSampleServicesEntity();

        Services actualCreateResult = servicesRepository.create(entity);

        verify(servicesRepositoryInterface).save(Mockito.any());
        assertSame(services, actualCreateResult);
    }

    @Test
    void testCreate_DataIntegrityViolationException() {
        when(servicesRepositoryInterface.save(Mockito.any()))
                .thenThrow(new DataIntegrityViolationException("Msg"));

        Services entity = createSampleServicesEntity();

        assertThrows(CustomNotFoundException.class, () -> servicesRepository.create(entity));
        verify(servicesRepositoryInterface).save(Mockito.any());
    }

    @Test
    void testCreate_CustomNotFoundException() {
        when(servicesRepositoryInterface.save(Mockito.any()))
                .thenThrow(new CustomNotFoundException(1, "An error occurred"));

        Services entity = createSampleServicesEntity();

        assertThrows(CustomNotFoundException.class, () -> servicesRepository.create(entity));
        verify(servicesRepositoryInterface).save(Mockito.any());
    }

    @Test
    void testCreate_EmptyResultDataAccessException() {
        when(servicesRepositoryInterface.save(Mockito.any()))
                .thenThrow(new EmptyResultDataAccessException(3));

        Services entity = createSampleServicesEntity();

        assertThrows(CustomNotFoundException.class, () -> servicesRepository.create(entity));
        verify(servicesRepositoryInterface).save(Mockito.any());
    }

    @Test
    void testFindAll() {
        when(servicesRepositoryInterface.findAll()).thenReturn(new ArrayList<>());

        List<Services> actualFindAllResult = servicesRepository.findAll();

        verify(servicesRepositoryInterface).findAll();
        assertTrue(actualFindAllResult.isEmpty());
    }

    @Test
    void testFindAll_DataIntegrityViolationException() {
        when(servicesRepositoryInterface.findAll()).thenThrow(new DataIntegrityViolationException("Msg"));

        assertThrows(CustomNotFoundException.class, () -> servicesRepository.findAll());
        verify(servicesRepositoryInterface).findAll();
    }

    @Test
    void testFindAll_CustomNotFoundException() {
        when(servicesRepositoryInterface.findAll()).thenThrow(new CustomNotFoundException(1, "An error occurred"));

        assertThrows(CustomNotFoundException.class, () -> servicesRepository.findAll());
        verify(servicesRepositoryInterface).findAll();
    }

    @Test
    void testFindById() throws NotFoundException {
        Services services = createSampleServicesEntity();

        when(servicesRepositoryInterface.findById(Mockito.<String>any())).thenReturn(services);

        Services actualFindByIdResult = servicesRepository.findById("42");

        verify(servicesRepositoryInterface).findById(Mockito.<String>any());
        assertSame(services, actualFindByIdResult);
    }

    @Test
    void testFindById_DataIntegrityViolationException() {
        when(servicesRepositoryInterface.findById(Mockito.<String>any()))
                .thenThrow(new DataIntegrityViolationException("Services Resource with the provided id not found"));

        assertThrows(CustomNotFoundException.class, () -> servicesRepository.findById("42"));
        verify(servicesRepositoryInterface).findById(Mockito.<String>any());
    }

    @Test
    void testFindById_NotFoundException() {
        String id = "42";
        NotFoundException exception = assertThrows(NotFoundException.class, () -> servicesRepository.findById(id));
        assertEquals(Constants.Messages.SERVICE_RESOURCE_NOT_FOUND, exception.getMessage());
    }

    @Test
    void testUpdate() {
        Services services = createSampleServicesEntity();

        when(servicesRepositoryInterface.save(Mockito.any())).thenReturn(services);

        Services entity = createSampleServicesEntity();

        Services actualUpdateResult = servicesRepository.update(entity);

        verify(servicesRepositoryInterface).save(Mockito.any());
        assertSame(services, actualUpdateResult);
    }

    @Test
    void testUpdate_DataIntegrityViolationException() {
        when(servicesRepositoryInterface.save(Mockito.any()))
                .thenThrow(new DataIntegrityViolationException("Msg"));

        Services entity = createSampleServicesEntity();

        assertThrows(CustomNotFoundException.class, () -> servicesRepository.update(entity));
        verify(servicesRepositoryInterface).save(Mockito.any());
    }

    @Test
    void testUpdate_CustomNotFoundException() {
        when(servicesRepositoryInterface.save(Mockito.any()))
                .thenThrow(new CustomNotFoundException(1, "An error occurred"));

        Services entity = createSampleServicesEntity();

        assertThrows(CustomNotFoundException.class, () -> servicesRepository.update(entity));
        verify(servicesRepositoryInterface).save(Mockito.any());
    }

    @Test
    void testDelete() throws NotFoundException {
        doNothing().when(servicesRepositoryInterface).delete(Mockito.any());

        Services entity = createSampleServicesEntity();

        servicesRepository.delete(entity);

        verify(servicesRepositoryInterface).delete(Mockito.any());
        assertEquals("245fe633-ed8d-44c1-9f87-28cae09abe06",entity.getId());
        assertEquals("Shock Replacement",entity.getService());
        assertEquals("3500",entity.getPrice());
    }

    @Test
    void testDelete_DataIntegrityViolationException() {
        doThrow(new DataIntegrityViolationException("Msg")).when(servicesRepositoryInterface)
                .delete(Mockito.any());

        Services entity = createSampleServicesEntity();

        assertThrows(CustomNotFoundException.class, () -> servicesRepository.delete(entity));
        verify(servicesRepositoryInterface).delete(Mockito.any());
    }

    @Test
    void testDelete_CustomNotFoundException() {
        doThrow(new CustomNotFoundException(1, "An error occurred")).when(servicesRepositoryInterface)
                .delete(Mockito.any());

        Services entity = createSampleServicesEntity();

        assertThrows(CustomNotFoundException.class, () -> servicesRepository.delete(entity));
        verify(servicesRepositoryInterface).delete(Mockito.any());
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
}
