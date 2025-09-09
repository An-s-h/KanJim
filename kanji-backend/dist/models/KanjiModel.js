"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// models/kanjiModel.ts
const mongoose_1 = __importDefault(require("mongoose"));
const kanjiSchema = new mongoose_1.default.Schema({
    char: { type: String, required: true, unique: true }, // 日, 月 etc
    onyomi: [{ type: String }], // ニチ, ジツ
    kunyomi: [{ type: String }], // ひ, か
    meaning: { type: String, required: true },
    level: { type: String, enum: ["N5", "N4", "N3", "N2", "N1"], required: true },
    tags: [{ type: String }] // Nature, Set1, etc
});
const Kanji = mongoose_1.default.model("Kanji", kanjiSchema);
exports.default = Kanji;
