package io.github.haon607.springbasewithsecurity.dto;

import io.github.haon607.springbasewithsecurity.entities.Role;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {
    private String username;
    private String password;
    private Role role;

    public static UserDto from(LoginRequest loginRequest) {
        return new UserDto(loginRequest.username(), loginRequest.password(), Role.ROLE_USER);
    }
}
