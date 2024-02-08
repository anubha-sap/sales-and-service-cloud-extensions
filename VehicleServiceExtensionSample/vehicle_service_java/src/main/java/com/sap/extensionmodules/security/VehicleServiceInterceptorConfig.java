package com.sap.extensionmodules.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.ArrayList;
import java.util.List;

@Component
public class VehicleServiceInterceptorConfig implements WebMvcConfigurer {
    @Autowired SessionInterceptor sessionInterceptor;
    @Autowired DestinationInterceptor destinationInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry){
        List<String> patterns = new ArrayList<>();
        patterns.add("/**/vehicle-service/job-cards");
        patterns.add("/**/vehicle-service/job-cards/*");
        patterns.add("/**/vehicle-service/job-cards/*/services/*");
        patterns.add("/**/vehicle-service/inspection-items");
        patterns.add("/**/vehicle-service/inspection-items/*");
        patterns.add("/**/vehicle-service/services");
        patterns.add("/**/vehicle-service/services/*");
        patterns.add("/**/vehicle-service/service-forms");
        patterns.add("/**/vehicle-service/service-forms/*");
        patterns.add("/**/vehicle-service/generate-invoice");
        registry.addInterceptor(sessionInterceptor);
        registry.addInterceptor(destinationInterceptor).addPathPatterns(patterns);
    }

}
