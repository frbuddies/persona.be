require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

// Import Routes
const personaRoutes = require("./src/route");

const app = express();

// Middleware
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

// Routes
app.use("/", personaRoutes);
// or app.use("/api", personaRoutes); // Endpoints become /api/persona

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error.message);
    process.exit(1);
  }
};

// Start Server
const startServer = async () => {
  await connectDB();

  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
};

startServer();
