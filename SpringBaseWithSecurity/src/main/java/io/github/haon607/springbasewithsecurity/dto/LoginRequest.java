package io.github.haon607.springbasewithsecurity.dto;

public record LoginRequest(
        String username,
        String password
) { }
