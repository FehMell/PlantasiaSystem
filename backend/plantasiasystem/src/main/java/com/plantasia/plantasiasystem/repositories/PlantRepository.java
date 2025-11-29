package com.plantasia.plantasiasystem.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.plantasia.plantasiasystem.models.Plant;

public interface PlantRepository extends JpaRepository<Plant, Long> {
    List<Plant> findByUserId(Long userId);
}