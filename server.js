// 1. Import express
const express = require("express");

// 2. Create the app
const app = express();

// 3. Set the port
const PORT = 8080;

// 4. Allow JSON parsing
app.use(express.json());

// 5. Initial sports array
let sports = ["Soccer", "HandBall", "VolleyBall", "Cricket", "Swimming"];

// 6. Routes

// GET all sports
app.get("/api/MNathitems", (req, res) => {
  const data = sports.map((sport, index) => ({ id: index, sportName: sport }));
  res.json(data);
});

// GET sport by ID
app.get("/api/MNathitems/:id", (req, res) => {
  const id = parseInt(req.params.id);
  if (id >= 0 && id < sports.length) {
    res.json({ id, sportName: sports[id] });
  } else {
    res.status(404).json({ message: "Sport not found" });
  }
});

// POST add a new sport
app.post("/api/MNathitems", (req, res) => {
  const { sportName } = req.body;
  if (!sportName) {
    return res.status(400).json({ message: "sportName is required" });
  }
  sports.push(sportName);
  const id = sports.length - 1;
  res.status(201).json({ id, sportName });
});

// PUT update a sport
app.put("/api/MNathitems/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { sportName } = req.body;
  if (id < 0 || id >= sports.length) {
    return res.status(404).json({ message: "Sport not found" });
  }
  if (!sportName) {
    return res.status(400).json({ message: "sportName is required" });
  }
  sports[id] = sportName;
  res.json({ id, sportName });
});

// DELETE a sport
app.delete("/api/MNathitems/:id", (req, res) => {
  const id = parseInt(req.params.id);
  if (id < 0 || id >= sports.length) {
    return res.status(404).json({ message: "Sport not found" });
  }
  const deletedSport = sports.splice(id, 1);
  res.json({ message: "Sport deleted", deleted: deletedSport });
});

// 7. Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

