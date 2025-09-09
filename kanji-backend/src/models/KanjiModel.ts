// models/kanjiModel.ts
import mongoose from "mongoose";

const kanjiSchema = new mongoose.Schema({
  char: { type: String, required: true, unique: true }, // 日, 月 etc
  onyomi: [{ type: String }],   // ニチ, ジツ
  kunyomi: [{ type: String }],  // ひ, か
  meaning: { type: String, required: true },
  level: { type: String, enum: ["N5", "N4", "N3", "N2", "N1"], required: true },
  tags: [{ type: String }] // Nature, Set1, etc
});

const Kanji = mongoose.model("Kanji", kanjiSchema);
export default Kanji;
