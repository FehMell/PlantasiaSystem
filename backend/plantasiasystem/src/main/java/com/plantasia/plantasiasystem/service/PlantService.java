package com.plantasia.plantasiasystem.service;

import com.plantasia.plantasiasystem.models.Plant;
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

    public List<Plant> listByUser(Long userId) {
        return plantRepository.findByUserId(userId);
    }

}
