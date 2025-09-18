package com.forumly.forumly.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.forumly.forumly.entity.User;
import com.forumly.forumly.repository.UserRepository;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // ✅ Get own profile

    @GetMapping("/me")
    public ResponseEntity<User> getMyProfile(Authentication authentication) {
        String username = authentication.getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return ResponseEntity.ok(user);
    }

    // ✅ Get user by ID (public profile)

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return ResponseEntity.ok(user);
    }


    // ✅ Update user profile (only owner can update)
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id,
                                           @RequestBody User updatedUser,
                                           Authentication authentication) {
        String username = authentication.getName();
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Only the owner can update their profile
        if (!user.getUsername().equals(username)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        user.setBio(updatedUser.getBio());
        user.setProfilePic(updatedUser.getProfilePic());
        user.setGithubLink(updatedUser.getGithubLink());
        user.setLinkedinLink(updatedUser.getLinkedinLink());

        // Optional: update email or password
        if(updatedUser.getEmail() != null) user.setEmail(updatedUser.getEmail());
        if(updatedUser.getPassword() != null)
            user.setPassword(passwordEncoder.encode(updatedUser.getPassword()));

        userRepository.save(user);
        return ResponseEntity.ok(user);
    }
}
