package com.example.plantcatalog;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

//This class defines the table structure (an id and some columns like name, species, etc.).
//When you run the app, Spring Data JPA + H2 will automatically create a database table based on it.

@Entity
public class Plant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String species;
    private String sunlight;
    private String watering;
    private String description;

    public Plant() {}

    public Plant(String name, String species, String sunlight, String watering, String description) {
        this.name = name;
        this.species = species;
        this.sunlight = sunlight;
        this.watering = watering;
        this.description = description;
    }

    // Getters and setters
    public Long getId() { return id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getSpecies() { return species; }
    public void setSpecies(String species) { this.species = species; }
    public String getSunlight() { return sunlight; }
    public void setSunlight(String sunlight) { this.sunlight = sunlight; }
    public String getWatering() { return watering; }
    public void setWatering(String watering) { this.watering = watering; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}
