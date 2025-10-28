const express = require("express");
const db = require("./database"); // connect to your SQLite database
const app = express();
const PORT = 5002;

app.use(express.json());

// Test route
app.get("/", (req, res) => {
    res.json({ message: "Greenhouse Service is running!" });
});

// POST /adopt - add a new adopted plant
app.post("/adopt", (req, res) => {
    const { user_id, plant_id, nickname } = req.body;

    if (!user_id || !plant_id) {
        return res.status(400).json({ error: "Missing user_id or plant_id" });
    }

    const query = `
    INSERT INTO adopted_plants (user_id, plant_id, nickname)
    VALUES (?, ?, ?)
  `;
    db.run(query, [user_id, plant_id, nickname || null], function (err) {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Database error" });
        }
        res.status(201).json({
            id: this.lastID,
            user_id,
            plant_id,
            nickname: nickname || null,
            adopted_at: new Date().toISOString(),
        });
    });
});

// GET /greenhouse/:user_id - list all plants adopted by a user
app.get("/greenhouse/:user_id", (req, res) => {
    const { user_id } = req.params;

    const query = `
    SELECT * FROM adopted_plants
    WHERE user_id = ?
  `;
    db.all(query, [user_id], (err, rows) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Database error" });
        }
        res.json(rows);
    });
});


app.listen(PORT, () => {
    console.log(`✅ Greenhouse Service running on port ${PORT}`);
});
