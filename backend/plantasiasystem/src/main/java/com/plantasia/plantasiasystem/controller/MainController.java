package com.plantasia.plantasiasystem.controller;

import com.plantasia.plantasiasystem.dto.NewPlantRequest;
import com.plantasia.plantasiasystem.models.Plant;
import com.plantasia.plantasiasystem.models.User;
import com.plantasia.plantasiasystem.repositories.UserRepository;
import com.plantasia.plantasiasystem.service.PlantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "") // front-end: inserir URL do react
public class MainController {
    @Autowired
    private PlantService plantService;

    @Autowired
    private UserRepository userRepository;

    // para testes
    @PostMapping("/users")
    public User addUser(@RequestBody User user) {
        return userRepository.save(user);
    }

    @GetMapping("/users")
    public List<User> listUsers() {
        return userRepository.findAll();
    }

    // CRUD
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
