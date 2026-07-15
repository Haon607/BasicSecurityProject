package io.github.haon607.springbasewithsecurity.controller;

import io.github.haon607.springbasewithsecurity.dto.UserDto;
import io.github.haon607.springbasewithsecurity.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;

    @PostMapping
    public UserDto create(@RequestBody UserDto user) {
        return userService.create(user);
    }

    @GetMapping("/{uuid}")
    public ResponseEntity<UserDto> get(@PathVariable UUID uuid) {
        return ResponseEntity.ok(userService.findById(uuid));
    }

    @GetMapping
    public ResponseEntity<List<UserDto>> get() {
        return ResponseEntity.ok(userService.findAll());
    }

    @PutMapping
    public ResponseEntity<UserDto> update(@RequestBody UserDto user) {
        return ResponseEntity.ok(userService.update(user));
    }

    @DeleteMapping("/{uuid}")
    public ResponseEntity<Void> delete(@PathVariable UUID uuid) {
        userService.delete(uuid);
        return ResponseEntity.noContent().build();
    }
}
