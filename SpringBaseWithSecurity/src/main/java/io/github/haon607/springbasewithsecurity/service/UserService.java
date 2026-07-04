package io.github.haon607.springbasewithsecurity.service;

import io.github.haon607.springbasewithsecurity.dto.UserDto;
import io.github.haon607.springbasewithsecurity.entities.User;
import io.github.haon607.springbasewithsecurity.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import tools.jackson.databind.ObjectMapper;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userDetailsRepository;
    private final ObjectMapper objectMapper;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    public UserDto create(UserDto userDto) {
        userDto.setPassword(
            encoder.encode(userDto.getPassword())
        );
        return objectMapper.convertValue(
            userDetailsRepository.save(
                objectMapper.convertValue(userDto, User.class)
            ), UserDto.class);

    }
}