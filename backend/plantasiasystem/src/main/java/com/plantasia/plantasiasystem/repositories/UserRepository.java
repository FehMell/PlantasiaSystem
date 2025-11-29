package com.plantasia.plantasiasystem.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.plantasia.plantasiasystem.models.User;

public interface UserRepository extends JpaRepository<User, Long> {
}
