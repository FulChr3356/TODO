package io.fulchr3356.todo.controllers;

import io.fulchr3356.todo.Models.User;
import io.fulchr3356.todo.auth.CustomAuthenticationProvider;
import io.fulchr3356.todo.auth.MessageResponse;
import io.fulchr3356.todo.repositories.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class AuthController {

    private final UserRepository userRepository;
    private final Logger log = LoggerFactory.getLogger(AuthController.class);

    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping (value = "/login")
    public ResponseEntity<?> login(@Valid @RequestBody User user){
        log.info("Attempt to log in with user: " + user);

        Authentication auth = new CustomAuthenticationProvider(user.getUsername(), user.getPassword(),userRepository)
                .authenticate(SecurityContextHolder.getContext().getAuthentication());
        log.info("Auth info: " + auth.getName() + " " + auth.getAuthorities());
        return ResponseEntity.status(HttpStatus.OK)
                .body(auth.getPrincipal());
    }
    @PostMapping(value = "/register")
    public ResponseEntity<?> register(@Valid @RequestBody User user){
         if (userRepository.existsByUsername(user.getUsername())) {
             return ResponseEntity
                     .badRequest()
                     .body(new MessageResponse("Username is already taken!"));
         }
        userRepository.save(user);
        return ResponseEntity.ok(user);

    }


}

