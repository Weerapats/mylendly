const mongoose = require("mongoose");

// Define the schema for comments
const commentSchema = new mongoose.Schema(
  {
    user: { type: String, required: true },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }, // Automatically adds timestamp
  },
  { timestamps: true } // Adds createdAt and updatedAt fields automatically
);

// Define the schema for posts
const postSchema = new mongoose.Schema(
  {
    text: { type: String, required: true }, // Post text content
    user: { type: String, required: true }, // User who created the post
    comments: [commentSchema], // Array of comment objects
    createdAt: { type: Date, default: Date.now }, // Automatically adds timestamp
  },
  { timestamps: true } // Adds createdAt and updatedAt fields automatically
);

// Create the Post model based on the schema
module.exports = mongoose.model("Post", postSchema);