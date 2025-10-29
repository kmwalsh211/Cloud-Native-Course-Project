# Plant Catalog Service (Spring Boot + Gradle + H2)

This microservice manages plant data.  
It provides basic CRUD operations for plants using Spring Boot, Spring Data JPA, and an in-memory H2 database.

---

## Setup & Run

### 1. Run the service
```bash
./gradlew bootRun
```
The service will start on http://localhost:8080

Currently no endpoint for '/', so check that it works by going to /plants 
