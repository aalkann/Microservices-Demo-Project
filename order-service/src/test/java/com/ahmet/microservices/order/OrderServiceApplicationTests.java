package com.ahmet.microservices.order;

import com.ahmet.microservices.order.stub.InventoryClientStub;
import io.restassured.RestAssured;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.boot.testcontainers.service.connection.ServiceConnection;
import org.springframework.cloud.contract.wiremock.AutoConfigureWireMock;
import org.springframework.context.annotation.Import;
import org.testcontainers.containers.MySQLContainer;

@Import(TestcontainersConfiguration.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureWireMock(port = 0)
class OrderServiceApplicationTests {
	@ServiceConnection
	static MySQLContainer mySQLContainer = new MySQLContainer("mysql:latest");

	@LocalServerPort
	private Integer port;

	@BeforeEach
	void setup(){
		RestAssured.baseURI = "http://localhost";
		RestAssured.port = port;
	}

	static{
		mySQLContainer.start();
	}

	@Test
	void shouldPlaceOrder() {
		String requestBody = """
				{
					"skuCode": "code1",
					"price": 1000,
					"quantity": 10
				}
				""";

		InventoryClientStub.stubInventoryCall("code1", 10);
		String responseBodyString = RestAssured.given()
				.contentType("application/json")
				.body(requestBody)
				.when()
				.post("/api/order")
				.then()
				.log().all()
				.statusCode(201)
				.extract()
				.body().asString();
		Assertions.assertEquals("Order placed successfully", responseBodyString);
	}
}
