// Entry point of the backend (requirements A1, A2, A6).
require("dotenv").config();               // load .env into process.env

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const taskRoutes = require("./routes/tasks");

const app = express();

/* ---------------- MIDDLEWARE ---------------- */

// CORS is restricted to the frontend's address only, not "*" (requirement A6).
// The frontend runs on port 3000 (see frontend/vite.config.js).
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:3000" }));

// Lets Express read JSON request bodies into req.body (requirement A1).
app.use(express.json());

// Simple request logger - helpful while testing.
app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

/* ---------------- ROUTES ---------------- */

app.get("/", (req, res) => {
  res.json({ message: "To-Do List API is running" });
});

app.use("/api/tasks", taskRoutes);

// Any address that matched nothing above
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

/* ---------------- START ---------------- */

const PORT = process.env.PORT || 5000;

// Connect to MongoDB first, then start listening - so the server never
// accepts requests it cannot answer (requirement A2).
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  });
