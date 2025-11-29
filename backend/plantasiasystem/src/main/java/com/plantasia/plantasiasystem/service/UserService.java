package com.plantasia.plantasiasystem.service;

import com.plantasia.plantasiasystem.models.User;
import com.plantasia.plantasiasystem.repositories.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public void deleteUser(Long userId) {
        if (!userRepository.existsById(userId)) {
            throw new EntityNotFoundException("User not found: " + userId);
        }

        userRepository.deleteById(userId);
    }

    public User updateUser(Long userId, User newData) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found: " + userId));

        if (newData.getName() != null) {
            user.setName(newData.getName());
        }
        if (newData.getEmail() != null) {
            user.setEmail(newData.getEmail());
        }

        return userRepository.save(user);
    }

    public Optional<User> searchById(Long userId) {
        return userRepository.findById(userId);
    }
}
