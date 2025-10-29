import React, { useState, useEffect } from "react";

function App() {
    // 🌿 PLANT STATES
    const [plants, setPlants] = useState([]);
    const [plantLoading, setPlantLoading] = useState(true);
    const [plantError, setPlantError] = useState(null);

    // 👥 USER STATES
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({ username: "", email: "" });
    const [userLoading, setUserLoading] = useState(false);
    const [userError, setUserError] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);

    // GREENHOUSE STATES (Node)
    const [greenhouse, setGreenhouse] = useState([]);
    const [ghError, setGhError] = useState(null);

    // ==========================
    // LOAD PLANTS (Spring Boot)
    // ==========================
    useEffect(() => {
        fetch("http://localhost:8080/plants")
            .then((res) => {
                if (!res.ok) throw new Error(`Server returned ${res.status}`);
                return res.json();
            })
            .then((data) => {
                setPlants(data);
                setPlantLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching plants:", err);
                setPlantError(err.message);
                setPlantLoading(false);
            });
    }, []);

    // ==========================
    // LOAD USERS (Flask)
    // ==========================
    const loadUsers = () => {
        fetch("http://localhost:5000/users")
            .then((res) => {
                if (!res.ok) throw new Error(`Server returned ${res.status}`);
                return res.json();
            })
            .then((data) => setUsers(data))
            .catch((err) => {
                console.error("Error fetching users:", err);
                setUserError(err.message);
            });
    };

    // ==========================
    // CREATE NEW USER
    // ==========================
    const handleSubmit = (e) => {
        e.preventDefault();
        setUserLoading(true);
        setUserError(null);

        fetch("http://localhost:5000/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newUser),
        })
            .then((res) => {
                if (!res.ok) throw new Error(`Server returned ${res.status}`);
                return res.json();
            })
            .then(() => {
                setUserLoading(false);
                setNewUser({ username: "", email: "", password: "" });
                loadUsers(); // refresh user list
            })
            .catch((err) => {
                console.error("Error creating user:", err);
                setUserError(err.message);
                setUserLoading(false);
            });
    };

    // ==========================
    // LOAD GREENHOUSE
    // ==========================
    const loadGreenhouse = (userId) => {
        fetch(`http://localhost:5002/greenhouse/${userId}`)
            .then((res) => {
                if (!res.ok) throw new Error(`Server returned ${res.status}`);
                return res.json();
            })
            .then((data) => setGreenhouse(data))
            .catch((err) => {
                console.error("Error loading greenhouse:", err);
                setGhError(err.message);
            });
    };

    // ==========================
    // ADOPT PLANT
    // ==========================
    const adoptPlant = (plantId) => {
        if (!selectedUser) {
            alert("Please select a user first!");
            return;
        }

        fetch("http://localhost:5002/adopt", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                user_id: selectedUser.id,
                plant_id: plantId,
                nickname: "My Plant 🌿",
            }),
        })
            .then((res) => {
                if (!res.ok) throw new Error(`Server returned ${res.status}`);
                return res.json();
            })
            .then(() => loadGreenhouse(selectedUser.id))
            .catch((err) => {
                console.error("Error adopting plant:", err);
                setGhError(err.message);
            });
    };


    // ==========================
    // UI
    // ==========================
    return (
        <div style={{ textAlign: "center", margin: "2rem" }}>
            <h1>🌿 Virtual Plant Adoption Platform</h1>

            {/* USER SECTION */}
            <section style={{ marginBottom: "3rem" }}>
                <h2>Create Account</h2>
                <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={newUser.username}
                        onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={newUser.email}
                        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={newUser.password}
                        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                        required
                    />
                    <button type="submit" disabled={userLoading}>
                        {userLoading ? "Creating..." : "Create User"}
                    </button>
                </form>

                <button onClick={loadUsers}>Load All Users</button>
                {userError && <p style={{ color: "red" }}>Error: {userError}</p>}

                <ul style={{ listStyle: "none", padding: 0 }}>
                    {users.map((u) => (
                        <li key={u.id}>
                            <button onClick={() => { setSelectedUser(u); loadGreenhouse(u.id); }}>
                                Select {u.username}
                            </button>
                        </li>
                    ))}
                </ul>
            </section>

            {/* GREENHOUSE SECTION */}
            {selectedUser && (
                <section style={{ marginBottom: "3rem" }}>
                    <h2>{selectedUser.username}'s Greenhouse</h2>
                    {ghError && <p style={{ color: "red" }}>Error: {ghError}</p>}
                    <ul style={{ listStyle: "none", padding: 0 }}>
                        {greenhouse.map((p) => (
                            <li key={p.id}>{p.nickname} (Plant ID: {p.plant_id})</li>
                        ))}
                    </ul>
                </section>
            )}

            {/* PLANT SECTION */}
            <section>
                <h2>Available Plants</h2>
                {plantLoading && <p>Loading plants...</p>}
                {plantError && <p style={{ color: "red" }}>Error: {plantError}</p>}

                {!plantLoading && !plantError && plants.length > 0 && (
                    <ul style={{ listStyle: "none", padding: 0 }}>
                        {plants.map((p) => (
                            <li key={p.id} style={{ marginBottom: "1rem" }}>
                                <h3>{p.name}</h3>
                                <button onClick={() => adoptPlant(p.id)}>Adopt This Plant</button>
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </div>
    );
}

export default App;