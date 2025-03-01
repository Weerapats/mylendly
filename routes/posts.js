const express = require("express");
const router = express.Router();
const Post = require("../models/post"); // Import the Post model

// Route to get all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find(); // Fetch all posts
    res.json(posts); // Return posts in the response
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching posts" });
  }
});

// Route to create a new post
router.post("/", async (req, res) => {
  const { text, user } = req.body;

  try {
    const newPost = new Post({
      text,
      user,
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating post" });
  }
});

// Route to add a comment to a post
router.post("/:id/comment", async (req, res) => {
  const { id } = req.params;
  const { text, user } = req.body;

  try {
    // Find the post by ID
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Add the comment to the post's comments array
    post.comments.push({ text, user });

    // Save the updated post
    await post.save();

    // Respond with success message and the updated post
    res.status(200).json({ message: "Comment added successfully!", post });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding comment" });
  }
});

module.exports = router;