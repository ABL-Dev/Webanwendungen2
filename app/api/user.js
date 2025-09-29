import { getUserById, getUsers } from "../database/user.js";

import express from "express";

const userRouter = express.Router();

// Route to get a user by ID
userRouter.get("/:id", async (req, res) => {
  const userId = parseInt(req.params.id, 10);
  try {
    const user = await getUserById(userId);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to get all users
userRouter.get("/", async (req, res) => {
  try {
    const users = await getUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export { userRouter };