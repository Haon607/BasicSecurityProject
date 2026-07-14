package io.github.haon607.springbasewithsecurity.controller;

import io.github.haon607.springbasewithsecurity.dto.LoginRequest;
import io.github.haon607.springbasewithsecurity.dto.UserDto;
import io.github.haon607.springbasewithsecurity.entities.Role;
import io.github.haon607.springbasewithsecurity.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class LoginController {

    private final AuthenticationManager authenticationManager;
    private final UserService userService;

    public LoginController(
            AuthenticationManager authenticationManager,
            UserService userService
    ) {
        this.authenticationManager = authenticationManager;
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<UserDto> login(@RequestBody LoginRequest request) {

        var authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.username(),
                        request.password()
                )
        );

        return ResponseEntity.ok().body(
                new UserDto(
                        request.username(),
                        request.password(),
                        Role.valueOf(authentication.getAuthorities().stream()
                                .findFirst()
                                .orElseThrow()
                                .getAuthority()
                        ))
        );
    }

    @PostMapping("/register")
    public ResponseEntity<UserDto> register(@RequestBody LoginRequest loginRequest) {
        final var user = userService.create(UserDto.from(loginRequest));
        user.setPassword(loginRequest.password());
        return ResponseEntity.ok(user);
    }
}