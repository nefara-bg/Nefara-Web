package com.anastassow.server;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;	

@SpringBootApplication
public class ServerApplication {

	public static void main(String[] args) {
		Dotenv dotenv = Dotenv.load();

		System.setProperty("SPRING_APPLICATION_NAME", dotenv.get("SPRING_APPLICATION_NAME"));
        System.setProperty("GMAIL_HOST", dotenv.get("GMAIL_HOST"));
        System.setProperty("GMAIL_PORT", dotenv.get("GMAIL_PORT"));
        System.setProperty("GMAIL_EMAIL", dotenv.get("GMAIL_EMAIL"));
        System.setProperty("GMAIL_PASSWORD", dotenv.get("GMAIL_PASSWORD"));
		
		SpringApplication.run(ServerApplication.class, args);
	}

}
