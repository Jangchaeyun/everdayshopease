package com.everyday.shopease.auth.services;

import com.everyday.shopease.auth.dto.RegistrationRequest;
import com.everyday.shopease.auth.dto.RegistrationResponse;
import com.everyday.shopease.auth.entities.User;
import com.everyday.shopease.auth.helper.VerificationCodeGenerator;
import com.everyday.shopease.auth.repositories.AuthorityRepository;
import com.everyday.shopease.auth.repositories.UserDetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ServerErrorException;

@Service
public class RegistrationService {
    @Autowired
    private UserDetailRepository userDetailRepository;

    @Autowired
    private AuthorityService authorityService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private  EmailService emailService;

    public RegistrationResponse createUser(RegistrationRequest registrationRequest) {
        User existing = userDetailRepository.findByEmail(registrationRequest.getEmail());

        if (null != existing) {
            return RegistrationResponse.builder()
                    .code(400)
                    .message("Email already exist!")
                    .build();
        }

        try {
            User user = new User();
            user.setFirstName(registrationRequest.getFirstName());
            user.setLastName(registrationRequest.getLastName());
            user.setEmail(registrationRequest.getEmail());
            user.setEnabled(false);
            user.setPassword(passwordEncoder.encode(registrationRequest.getPassword()));
            user.setProvider("manual");

            String code = VerificationCodeGenerator.generateCode();

            user.setVerificationCode(code);
            user.setAuthorities(authorityService.getUserAuthority());
            userDetailRepository.save(user);
            emailService.sendMail(user);

            return RegistrationResponse.builder()
                    .code(200)
                    .message("User created!!")
                    .build();
        }
        catch (Exception e) {
            System.out.println(e.getMessage());
            throw new ServerErrorException(e.getMessage(), e.getCause());
        }
    }
}
