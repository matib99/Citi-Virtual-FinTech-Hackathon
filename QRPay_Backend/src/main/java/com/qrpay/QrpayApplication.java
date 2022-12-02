package com.qrpay;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication
public class QrpayApplication {

	public static void main(String[] args) {
		SpringApplication.run(QrpayApplication.class, args);
	}

}
