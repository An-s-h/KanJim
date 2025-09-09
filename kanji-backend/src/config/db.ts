import mongoose from "mongoose"

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/KanjiDatabase");
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed", error);
    process.exit(1);
  }
};

export default connectDB;