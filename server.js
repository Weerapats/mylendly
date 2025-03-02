const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

// ✅ Correct CORS setup (Merge both)
app.use(cors({
  origin: ['http://127.0.0.1:5500', 'http://127.0.0.1:5501', 'http://localhost:5500'], // Allow frontend origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json()); // ✅ Ensure JSON body parsing

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
app.use("/api/posts", postRoutes);

// ✅ CORS Test Route (Check with browser)
app.get("/cors-test", (req, res) => {
  res.set("Access-Control-Allow-Origin", "*"); // Force CORS response header
  res.send("✅ CORS is working!");
});

// ✅ Test if backend is running
app.get("/", (req, res) => {
  res.send("✅ Backend is running");
});
