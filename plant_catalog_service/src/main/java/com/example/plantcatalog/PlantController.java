package com.example.plantcatalog;

import org.springframework.web.bind.annotation.*;
import java.util.List;

//controller turns the microservice into a REST API.
//Each method corresponds to an HTTP endpoint

@RestController
@RequestMapping("/plants")
public class PlantController {

    private final PlantRepository repository;

    public PlantController(PlantRepository repository) {
        this.repository = repository;
    }

    // GET all plants
    @GetMapping
    public List<Plant> getAllPlants() {
        return repository.findAll();
    }

    // GET one plant by ID
    @GetMapping("/{id}")
    public Plant getPlant(@PathVariable Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Plant not found"));
    }

    // POST (create new plant)
    @PostMapping
    public Plant createPlant(@RequestBody Plant plant) {
        return repository.save(plant);
    }

    // PUT (update existing plant)
    @PutMapping("/{id}")
    public Plant updatePlant(@PathVariable Long id, @RequestBody Plant newPlant) {
        return repository.findById(id)
                .map(plant -> {
                    plant.setName(newPlant.getName());
                    plant.setSpecies(newPlant.getSpecies());
                    plant.setSunlight(newPlant.getSunlight());
                    plant.setWatering(newPlant.getWatering());
                    plant.setDescription(newPlant.getDescription());
                    return repository.save(plant);
                })
                .orElseThrow(() -> new RuntimeException("Plant not found"));
    }

    // DELETE plant
    @DeleteMapping("/{id}")
    public void deletePlant(@PathVariable Long id) {
        repository.deleteById(id);
    }
}
