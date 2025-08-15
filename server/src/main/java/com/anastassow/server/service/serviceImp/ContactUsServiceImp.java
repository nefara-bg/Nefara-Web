package com.anastassow.server.service.serviceImp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.anastassow.server.dto.ContactUsDto;
import com.anastassow.server.service.ContactUsService;

@Service
public class ContactUsServiceImp implements ContactUsService{
    
    @Autowired private JavaMailSender javaMailSender;

    @Value("${spring.mail.username}")
    private String myEmail;

    @Override
    public void sendEmail(ContactUsDto contactUsDto) {
        
        SimpleMailMessage mailMessage = new SimpleMailMessage();

        mailMessage.setFrom("Contact Us from SoftwareSolutions! <themastarayt@gmail.com>");
        mailMessage.setTo(myEmail);
        mailMessage.setText(contactUsDto.getMessage());
        mailMessage.setSubject(contactUsDto.getSubject());
        mailMessage.setReplyTo(contactUsDto.getEmail());

        javaMailSender.send(mailMessage);

    }
}
