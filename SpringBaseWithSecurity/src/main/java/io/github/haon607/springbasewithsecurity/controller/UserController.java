package io.github.haon607.springbasewithsecurity.controller;

import io.github.haon607.springbasewithsecurity.dto.LoginRequest;
import io.github.haon607.springbasewithsecurity.dto.UserDto;
import io.github.haon607.springbasewithsecurity.entities.Role;
import io.github.haon607.springbasewithsecurity.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
        public ResponseEntity<UserDto> login(@RequestBody LoginRequest request) {

            var authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.username(),
                            request.password()
                    )
            );

            return ResponseEntity.ok()
                    .body(
                            new UserDto(
                                    request.username(),
                                    request.password(),
                                    Role.valueOf(authentication.getAuthorities().stream().findFirst().orElseThrow().getAuthority()))
                    );
        }
    }
}
