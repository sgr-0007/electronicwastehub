package com.team.ewaste;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class EWaste {

    public static void main(String[] args) {
        SpringApplication.run(EWaste.class, args);
    }

}
