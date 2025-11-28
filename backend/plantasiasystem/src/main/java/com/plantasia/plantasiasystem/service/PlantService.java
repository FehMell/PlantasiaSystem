package com.plantasia.plantasiasystem.service;

import com.plantasia.plantasiasystem.dto.TrefleData;
import com.plantasia.plantasiasystem.models.Plant;
import com.plantasia.plantasiasystem.models.User;
import com.plantasia.plantasiasystem.repositories.PlantRepository;
import com.plantasia.plantasiasystem.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlantService {

    @Autowired
    private PlantRepository plantRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private TrefleIntegrationService trefleIntegrationService;

    public Plant addPlant(Long userId, String searchName, String nickname) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        TrefleData trefleData = trefleIntegrationService.searchForPlant(searchName)
                .orElseThrow(() -> new RuntimeException("Plant not found"));

        Plant newPlant = new Plant();
        newPlant.setUser(user);
        newPlant.setPlantNickname(nickname);

        newPlant.setScientificName(trefleData.getScientificName());
        newPlant.setCommonName(trefleData.getCommonName());
        newPlant.setFamily(trefleData.getFamily());
        newPlant.setImageUrl(trefleData.getImageUrl());

        return plantRepository.save(newPlant);
    }

    public List<Plant> listByUser(Long userId) {
        return plantRepository.findByUserId(userId);
    }

    public Plant updateNickname(Long plantId, String newNickname) {
        Plant plant = plantRepository.findById(plantId)
                .orElseThrow(() -> new RuntimeException("Plant not found"));

        plant.setPlantNickname(newNickname);
        return plantRepository.save(plant);
    }

    public void deletePlant(Long plantId) {
        plantRepository.deleteById(plantId);
    }
}