package com.anastassow.server.service;

import com.anastassow.server.dto.ContactUsDto;

public interface ContactUsService {
    public void sendEmail(ContactUsDto contactUsDto);
}
