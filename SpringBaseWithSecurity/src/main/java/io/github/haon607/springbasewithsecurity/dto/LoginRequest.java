package io.github.haon607.springbasewithsecurity.dto;

import io.github.haon607.springbasewithsecurity.entities.Role;

public record LoginRequest(
        String username,
        String password
) { }
