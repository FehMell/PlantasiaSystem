package com.plantasia.plantasiasystem.controller;

import com.plantasia.plantasiasystem.dto.NewPlantRequest;
import com.plantasia.plantasiasystem.models.Plant;
import com.plantasia.plantasiasystem.models.User;
import com.plantasia.plantasiasystem.repositories.UserRepository;
import com.plantasia.plantasiasystem.service.PlantService;
import com.plantasia.plantasiasystem.service.UserService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "") // front-end: inserir URL do react
public class MainController {
    @Autowired
    private PlantService plantService;

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    // CRUD USERS
    // create
    @PostMapping("/users")
    public User addUser(@RequestBody User user) {
        return userRepository.save(user);
    }

    // read
    @GetMapping("/users")
    public List<User> listUsers() {
        return userRepository.findAll();
    }

    // update
    @PutMapping("/users/{userId}")
    public ResponseEntity<User> updateUser(@PathVariable Long userId, @RequestBody User newData) {
        try {
            User updatedUser = userService.updateUser(userId, newData);

            return ResponseEntity.ok(updatedUser);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // delete
    @DeleteMapping("/users/{userId}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long userId) {
        try {
            userService.deleteUser(userId);
            return ResponseEntity.noContent().build();
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/users/{userId}")
    public ResponseEntity<User> searchUser(@PathVariable Long userId) {
        return userService.searchById(userId)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // CRUD PLANTS
    // create
    @PostMapping("/users/{userId}/plants")
    public Plant addPlant(@PathVariable Long userId, @RequestBody NewPlantRequest request) {
        return plantService.addPlant(userId, request.getSearchName(), request.getNickname());
    }

    // read
    @GetMapping("/users/{userId}/plants")
    public List<Plant> listPlantsByUser(@PathVariable Long userId) {
        return plantService.listByUser(userId);
    }

    // update
    @PutMapping("/plants/{plantId}")
    public Plant updatePlant(@PathVariable Long plantId, @RequestBody NewPlantRequest request) {
        return plantService.updateNickname(plantId, request.getNickname());
    }

    // delete
    @DeleteMapping("/plants/{plantId}")
    public void deletePlant(@PathVariable Long plantId) {
        plantService.deletePlant(plantId);
    }
}
