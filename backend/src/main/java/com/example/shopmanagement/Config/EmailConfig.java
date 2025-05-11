package com.example.shopmanagement.Config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import java.util.Properties;

@Configuration
public class EmailConfig {

    @Bean
    public JavaMailSender javaMailSender() {
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        
        // Set the host and port of the Gmail SMTP server
        mailSender.setHost("smtp.gmail.com");
        mailSender.setPort(587);
        
        // Set the email address and password directly
        mailSender.setUsername("sanjeevsaisasank9@gmail.com");
        mailSender.setPassword("keko ekaf eyti hrrl");

        // Set the email properties (enable authentication and TLS)
        Properties props = mailSender.getJavaMailProperties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        
        return mailSender;
    }
}
