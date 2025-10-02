import mongoose from "mongoose"

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://Project:ansh12345@localconnect.px4km.mongodb.net/KanjiDatabase");
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed", error);
    process.exit(1);
  }
};

export default connectDB;