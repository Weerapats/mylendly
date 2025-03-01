const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

app.use(express.json()); // Enable JSON parsing
app.use(cors({
  origin: ["http://localhost:3000"], // Allow frontend from port 3000
  credentials: true,
}));

const port = process.env.PORT || 5000;
const URL = process.env.MONGO_URI;

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(URL);
    console.log("✅ MongoDB is connected");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`🚀 Server is running on port ${port}`);
  });
}).catch((err) => {
  console.error('❌ MongoDB connection failed:', err);
});

// ✅ Import and use post routes
const postRoutes = require("./routes/posts");
app.use("/api/posts", postRoutes);  // All post-related routes will be prefixed with /api/posts

// Test Route
app.get("/", (req, res) => {
  res.send("✅ Backend is running");
});   