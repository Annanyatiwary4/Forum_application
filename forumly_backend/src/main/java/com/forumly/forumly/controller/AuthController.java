package com.forumly.forumly.controller;

import com.forumly.forumly.entity.User;
import com.forumly.forumly.repository.UserRepository;
import com.forumly.forumly.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/signup")
    public ResponseEntity<Map<String, String>> signup(@RequestBody User user) {

    // Check if username is empty or null
    if (user.getUsername() == null || user.getUsername().trim().isEmpty()) {
        return ResponseEntity.badRequest().body(Map.of("message", "Username cannot be empty"));
    }

    // Check if email is empty or null
    if (user.getEmail() == null || user.getEmail().trim().isEmpty()) {
        return ResponseEntity.badRequest().body(Map.of("message", "Email cannot be empty"));
    }

    // Check if password is empty or null
    if (user.getPassword() == null || user.getPassword().trim().isEmpty()) {
        return ResponseEntity.badRequest().body(Map.of("message", "Password cannot be empty"));
    }

    // Check if username already exists
    if (userRepository.findByUsername(user.getUsername()).isPresent()) {
        return ResponseEntity.badRequest().body(Map.of("message", "Username already exists"));
    }

    // Check if email already exists
    if (userRepository.findByEmail(user.getEmail()).isPresent()) {
        return ResponseEntity.badRequest().body(Map.of("message", "Email already exists"));
    }

    // Encode password and save user
    user.setPassword(passwordEncoder.encode(user.getPassword()));
    userRepository.save(user);

    return ResponseEntity.ok(Map.of("message", "User registered successfully"));
}


    // Login endpoint
    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody Map<String, String> loginData) {
        String username = loginData.get("username");
        String password = loginData.get("password");

        // Check for empty fields
    if (username == null || username.isEmpty() || password == null || password.isEmpty()) {
        return ResponseEntity
                .badRequest()
                .body(Map.of("message", "Please provide both username and password"));
    }

    // Find user safely
    Optional<User> userOpt = userRepository.findByUsername(username);
    if (userOpt.isEmpty()) {
        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("message", "Invalid username or password"));
    }

    User user = userOpt.get();

    // Check password safely
    if (!passwordEncoder.matches(password, user.getPassword())) {
        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("message", "User not found. Please sign up first."));
    }

    // Generate token
    String token = jwtUtil.generateToken(username);

    return ResponseEntity.ok(Map.of("token", token, "message", "Login successful"));
}
}