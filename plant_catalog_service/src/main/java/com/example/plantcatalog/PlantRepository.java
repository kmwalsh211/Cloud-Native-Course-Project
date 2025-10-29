package com.example.plantcatalog;

import org.springframework.data.jpa.repository.JpaRepository;

//This file gives us database operations — save(), findAll(), findById(), deleteById()
public interface PlantRepository extends JpaRepository<Plant, Long> {
}
