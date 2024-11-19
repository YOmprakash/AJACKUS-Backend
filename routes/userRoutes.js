//userroutes.js

const express = require("express");
const User = require("../models/User");
const router = express.Router();

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

// Add a user
router.post("/", async (req, res) => {
  const { firstName, lastName, email, department } = req.body;
  try {
    const newUser = new User({ firstName, lastName, email, department });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ message: "Failed to create user" });
  }
});

// Update a user
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email, department } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { firstName, lastName, email, department },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: "Failed to update user" });
  }
});

// Delete a user
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete user" });
  }
});

module.exports = router;
