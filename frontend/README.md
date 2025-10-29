# Frontend UI (React)
React frontend connects to three independent backend microservices

**User Service**                Python Flask            Port 5000       Handles user registration and profiles
**Plant Catalog Service**       Java Spring Boot        Port 8080       Provides plant species and care info
**Greenhouse Service**          Node.js Express         Port 5002       Manages users’ adopted plants
    
---

## Setup & Run
Make sure you have the following installed:
- Node.js (v18+)
- npm (comes with Node)
- Python 3 (for Flask)
- Java + Gradle (for Spring Boot)

### 1. Start each backend microservice
Each in a new terminal

User Service:
```bash
cd user_service
pip install -r requirements.txt
pip install flask-cors  #TODO: add this to requirements.txt
python3 app.py
# Flask runs on http://localhost:5000
```

Plant Catalog Service:
```bash
cd plant_catalog_service
./gradlew bootRun
# Springboot runs on 8080
```

Greenhouse Service:
```bash
cd greenhouse_service
npm install
npm install cors
node server.js
# Express runs on http://localhost:5002
```

### 1. Start the Frontend
In a new terminal
```bash
cd frontend
npm install
npm start
```
This will launch the app at http://localhost:3000

## Verify Connections
When all services are running:

“Available Plants” → loads data from Spring Boot

“Create Account” → sends data to Flask

“Adopt This Plant” → posts data to Node/Express

Greenhouse updates in real time after each adoption

## If its not working

If you see “Failed to fetch”, double-check that
- All three backends are running in their own terminals
- Each port (5000, 8080, 5002) is open locally on your computer (bash ```lsof -i :<port_number>```)
