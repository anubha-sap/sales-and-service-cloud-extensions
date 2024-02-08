package com.sap.extensionmodules.controller;

import com.sap.extensionmodules.dtos.JobCardDto;
import com.sap.extensionmodules.service.InvoiceService;
import com.sap.extensionmodules.service.JobCardService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.io.ByteArrayInputStream;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

public class InvoiceControllerTest {

    private MockMvc mockMvc;

    @Mock
    private JobCardService jobCardService;

    @Mock
    private InvoiceService invoiceService;

    @InjectMocks
    private InvoiceController invoiceController;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(invoiceController).build();
    }

    @Test
    public void testGeneratePDF() throws Exception {
        JobCardDto jobCardDto = new JobCardDto();
        jobCardDto.setCaseId("dd93e396-1efd-11ee-8994-11adec903ccc");
        when(jobCardService.findByCaseId(anyString(), eq(true))).thenReturn(jobCardDto);
        when(invoiceService.generateInvoice(jobCardDto)).thenReturn(new ByteArrayInputStream("PDF Content".getBytes()));

        mockMvc.perform(get("/vehicle-service/generate-invoice")
                        .param("$filter", "caseId eq dd93e396-1efd-11ee-8994-11adec903ccc"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_PDF))
                .andExpect(content().string("PDF Content"));

        verify(jobCardService, times(1)).findByCaseId("dd93e396-1efd-11ee-8994-11adec903ccc", true);
        verify(invoiceService, times(1)).generateInvoice(jobCardDto);
    }

}
