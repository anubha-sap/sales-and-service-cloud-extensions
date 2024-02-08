package com.sap.extensionmodules;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.util.ReflectionUtils;

import java.lang.reflect.Method;

import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
class VehicleServiceJavaApplicationTest {

	@Test
	void contextLoads() {
	}

	@Test
	void testMain() {
		String[] args = new String[]{"arg1", "arg2"};

		Method method = ReflectionUtils.findMethod(VehicleServiceJavaApplication.class, "main", String[].class);
        assert method != null;
        ReflectionUtils.invokeMethod(method, null, (Object) args);

		assertTrue(true);
	}
}
