package io.github.haon607.springbasewithsecurity.service;

import io.github.haon607.springbasewithsecurity.dto.UserDto;
import io.github.haon607.springbasewithsecurity.entities.User;
import io.github.haon607.springbasewithsecurity.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import tools.jackson.databind.ObjectMapper;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final ObjectMapper objectMapper;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    public UserDto create(UserDto userDto) {
        userDto.setPassword(
                encoder.encode(userDto.getPassword())
        );
        return objectMapper.convertValue(
                userRepository.save(
                        objectMapper.convertValue(userDto, User.class)
                ), UserDto.class);

    }

    public UserDto findById(UUID uuid) {
        return objectMapper.convertValue(
                userRepository.findById(uuid)
                        .orElseThrow(NoSuchElementException::new)
                , UserDto.class);
    }

    public List<UserDto> findAll() {
        return userRepository.findAll().stream()
                .map(userDto -> objectMapper.convertValue(userDto, UserDto.class))
                .toList();
    }

    public UserDto update(UserDto userDto) {
        User user = userRepository.findById(userDto.getId()).orElseThrow(NoSuchElementException::new);

        if (userDto.getUsername() != null)
            user.setUsername(userDto.getUsername());
        if (userDto.getPassword() != null)
            user.setPassword(encoder.encode(userDto.getPassword()));
        if (userDto.getRole() != null)
            user.setRole(userDto.getRole());

        userRepository.save(user);
        return objectMapper.convertValue(user, UserDto.class);
    }

    public void delete(UUID uuid) {
        userRepository.deleteById(uuid);
    }
}