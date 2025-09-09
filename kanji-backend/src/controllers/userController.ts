import { Request, Response } from "express";
import User from "../models/userModel";

export const syncUser = async (req: Request, res: Response) => {
  try {
    const { clerkId, username, email } = req.body;

    let user = await User.findOne({ clerkId });

    if (!user) {
      user = await User.create({
        clerkId,
        username,
        email,
        progress: { kanjiLearned: [], courseCompletion: 0 },
      });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Error syncing user", error: err });
  }
};