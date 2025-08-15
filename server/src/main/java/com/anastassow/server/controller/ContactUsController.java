package com.anastassow.server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.anastassow.server.dto.ContactUsDto;
import com.anastassow.server.service.ContactUsService;

@RestController
@RequestMapping("api/contact")
public class ContactUsController {
    
    @Autowired
    public ContactUsService contactUsService;

    @PostMapping
    public ResponseEntity<?> contactUs(@RequestBody ContactUsDto request) {
        
        contactUsService.sendEmail(request);

        return ResponseEntity.ok("Mail sent successfully");
    }
}
