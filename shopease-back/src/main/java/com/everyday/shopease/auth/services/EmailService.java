package com.everyday.shopease.auth.services;

import com.everyday.shopease.auth.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    @Autowired
    private JavaMailSender javaMailSender;

    @Value("${spring.mail.username}")
    private String sender;

    public  String sendMail(User user) {
        String subject = "이메일을 확인하세요";
        String senderName = "EverDayShopEase";
        String mailContent = "안녕하세요 " + user.getUsername() + ".\n";
        mailContent += "귀하의 인증 코드는: " + user.getVerificationCode() + "\n";
        mailContent += "이메일을 확인하려면 이 코드를 입력하세요.\n";
        mailContent += "\n";
        mailContent += senderName;

        try {
            SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setFrom(sender);
            mailMessage.setTo(user.getEmail());
            mailMessage.setText(mailContent);
            mailMessage.setSubject(subject);
            javaMailSender.send(mailMessage);
        } catch (Exception e) {
            return  "Error while Sending Mail";
        }
        return "Email Sent";
    }
}
