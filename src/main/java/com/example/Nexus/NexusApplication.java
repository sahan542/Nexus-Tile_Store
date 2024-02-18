package com.example.Nexus;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RequestMapping;

@SpringBootApplication
public class NexusApplication {

	public static void main(String[] args) {
		SpringApplication.run(NexusApplication.class, args);
		System.out.println("Hello");
	}

	@RequestMapping("/api")
	public String sayHello(){
		return "Hi Guys!";
	}

}
