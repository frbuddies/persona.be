require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

// Import Routes
const personaRoutes = require("./src/route");

const app = express();

// Middleware
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (
    origin &&
    (origin.endsWith('.vercel.app') ||
      origin.startsWith('http://localhost'))
  ) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Backend is alive!");
});
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
