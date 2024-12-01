package com.ahmet.microservices.inventory_service;

import io.restassured.RestAssured;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.boot.testcontainers.service.connection.ServiceConnection;
import org.springframework.context.annotation.Import;
import org.testcontainers.containers.MySQLContainer;

@Import(TestcontainersConfiguration.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class InventoryServiceApplicationTests {
	@ServiceConnection
	private static final MySQLContainer mySQLContainer = new MySQLContainer("mysql:latest");
	@LocalServerPort
	private int port;

	@BeforeEach
	void setup(){
		RestAssured.baseURI = "http://localhost";
		RestAssured.port = port;
	}

	static{
		mySQLContainer.start();
	}

	@Test
	void shouldReturnTrue() {
		boolean positiveResponse = RestAssured.given()
				.when()
				.get("/api/inventory?skuCode=iphone 15&quantity=20")
				.then()
				.log().all()
				.statusCode(200)
				.extract().response().as(Boolean.class);
		Assertions.assertTrue(positiveResponse);

		boolean negativeResponse = RestAssured.given()
				.when()
				.get("/api/inventory?skuCode=iphone 15&quantity=150")
				.then()
				.log().all()
				.statusCode(200)
				.extract().response().as(Boolean.class);
		Assertions.assertFalse(negativeResponse);



	}

}
