package com.anastassow.server.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ContactUsDto {
    public String email;
    public String subject;
    public String message;
}
