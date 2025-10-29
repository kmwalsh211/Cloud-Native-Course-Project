# Virtual Plant Adoption Platform

## Nature and Purpose of the Application
The **Virtual Plant Adoption Platform** is a cloud-native web application that allows users to virtually adopt, care for, and learn about different types of plants.

Users can:
- Create an account
- Browse plant species
- Adopt plants into their personal greenhouse
- Care for those plants

The platform aims to combine education and gameplay, encouraging users to learn about plants through a fun "virtual pet" like game.

---

## Team Members
- **Kayla Walsh** 
- **AJ Mitchell**
- **Sloane**

---

## Services
This project implements a multi-service cloud-native architecture consisting of three backend microservices and a React frontend.

**User Service**                Python Flask            Port 5000       Handles user registration and profiles
**Plant Catalog Service**       Java Spring Boot        Port 8080       Provides plant species and care info
**Greenhouse Service**          Node.js Express         Port 5002       Manages users’ adopted plants
**Frontend**                    React (JavaScript)      Port 3000       User interface connecting all services

Each microservice exposes its own RESTful API with full CRUD functionality and connects via HTTP requests from the React frontend.
^^this is not true yet.
---

## Technical Stack
- **Frontend:** React with Javascript
- **Backends:** Flask (Python), Springboot (Java), Express (Node.js)
- **Database:** PostgreSQL (probably?) (currently SQLite for Flask and Express, H2 for Springboot)

---

## General Description of the UI and Primary Actions
The user interface will feature:
- **Login / Sign-up Page** – Secure access for users.  
- **Dashboard** – Displays user’s greenhouse overview with adopted plants.  
- **Plant Catalog** – Allows users to browse and select plants to adopt.  
- **Plant Detail Page** – Shows detailed care instructions and current “virtual health.”  
- **Care Log / Notifications Panel** – Displays reminders for watering, sunlight checks, etc. (maybe we drop this)

## Directions for running the current application are in the frontend directorys README.
