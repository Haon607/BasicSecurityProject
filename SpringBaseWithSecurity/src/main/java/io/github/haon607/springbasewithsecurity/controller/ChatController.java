package io.github.haon607.springbasewithsecurity.controller;

import io.github.haon607.springbasewithsecurity.dto.ChatMessage;
import io.github.haon607.springbasewithsecurity.entities.User;
import io.github.haon607.springbasewithsecurity.repository.UserRepository;
import io.github.haon607.springbasewithsecurity.uhh.UserPrincipal;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {

    private final SimpMessagingTemplate messagingTemplate;
    private final UserRepository userRepository;

    public ChatController(SimpMessagingTemplate messagingTemplate, UserRepository userRepository) {
        this.messagingTemplate = messagingTemplate;
        this.userRepository = userRepository;
    }

    @MessageMapping("/chat.send")
    public void send(ChatMessage message,
                     Authentication authentication) {

        UserPrincipal principal =
                (UserPrincipal) authentication.getPrincipal();

        message.setFromUserId(principal.getUserId());

        /*
         * TODO
         * Save to DB here.
         */
        User recipient = userRepository.findById(message.getToUserId())
                .orElseThrow();

        messagingTemplate.convertAndSendToUser(
                recipient.getUsername(),
                "/queue/messages",
                message
        );
    }
}