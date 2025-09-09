"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const kanjiSchema = new mongoose_1.Schema({
    char: { type: String, required: true },
    meaning: { type: String, required: true },
    reading: { type: String, required: true },
    level: { type: String, default: "N5" }
});
exports.default = (0, mongoose_1.model)("Kanji", kanjiSchema);
