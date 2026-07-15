package io.github.haon607.springbasewithsecurity.dto;

import io.github.haon607.springbasewithsecurity.entities.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {
    private UUID id;
    private String username;
    private String password;
    private Role role;

    public static UserDto from(LoginRequest loginRequest) {
        return new UserDto(null, loginRequest.username(), loginRequest.password(), Role.ROLE_USER);
    }
}
