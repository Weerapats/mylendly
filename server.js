const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

// ✅ Fix CORS issue
app.use(cors({ origin: "*" })); // Allow requests from any origin

app.use(express.json()); // Allow JSON parsing

// ✅ Manually set headers to allow CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Allow any origin
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

const port = process.env.PORT || 5000;
const URL = process.env.MONGO_URI;

// ✅ Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(URL);
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
  });
}).catch((err) => {
  console.error('❌ MongoDB connection failed:', err);
});

// ✅ Import and use post routes
const postRoutes = require("./routes/posts");
app.use("/api/posts", postRoutes);  // Routes prefixed with /api/posts

// Test Route
app.get("/", (req, res) => {
  res.send("✅ Backend is running");
});
