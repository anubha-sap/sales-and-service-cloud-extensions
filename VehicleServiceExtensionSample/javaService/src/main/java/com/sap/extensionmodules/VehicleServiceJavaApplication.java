package com.sap.extensionmodules;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan({"com.sap.cloud.sdk", "com.sap.extensionmodules"})
@ServletComponentScan({"com.sap.cloud.sdk", "com.sap.extensionmodules"})
public class VehicleServiceJavaApplication {

	public static void main(String[] args) {
		SpringApplication.run(VehicleServiceJavaApplication.class, args);
	}

}
