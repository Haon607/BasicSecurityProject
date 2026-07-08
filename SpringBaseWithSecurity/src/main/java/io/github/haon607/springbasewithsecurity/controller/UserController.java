package io.github.haon607.springbasewithsecurity.controller;

import io.github.haon607.springbasewithsecurity.dto.LoginRequest;
import io.github.haon607.springbasewithsecurity.dto.UserDto;
import io.github.haon607.springbasewithsecurity.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Base64;

@RequiredArgsConstructor
@RestController
public class UserController {
    private final UserService userService;

    @PostMapping("/register-user")
    public UserDto persist(@RequestBody UserDto user) {
        return userService.create(user);
    }


    @RestController
    @RequestMapping("/api")
    public class LoginController {

        private final AuthenticationManager authenticationManager;

        public LoginController(AuthenticationManager authenticationManager) {
            this.authenticationManager = authenticationManager;
        }

        @PostMapping("/login")
        public ResponseEntity<Void> login(@RequestBody LoginRequest request) {

            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.username(),
                            request.password()
                    )
            );

            return ResponseEntity.ok().build();
        }
    }
}
