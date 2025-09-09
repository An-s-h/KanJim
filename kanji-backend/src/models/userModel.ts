import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  clerkId: string; // Clerk user ID
  username: string;
  email: string;
  progress: {
    kanjiLearned: string[];
    courseCompletion: number;
  };
}

const UserSchema = new Schema<IUser>({
  clerkId: { type: String, required: true, unique: true },
  username: { type: String },
  email: { type: String },
  progress: {
    kanjiLearned: { type: [String], default: [] },
    courseCompletion: { type: Number, default: 0 },
  },
});

export default mongoose.model<IUser>("User", UserSchema);
