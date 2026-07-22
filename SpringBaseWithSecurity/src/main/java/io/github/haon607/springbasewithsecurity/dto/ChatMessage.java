package io.github.haon607.springbasewithsecurity.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class ChatMessage {
    private UUID fromUserId;
    private UUID toUserId;
    private String message;
}