"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedKanji = void 0;
// utils/seedKanji.ts
const KanjiModel_1 = __importDefault(require("./models/KanjiModel"));
// sample data
const kanjiData = [
    {
        char: "日",
        onyomi: ["ニチ", "ジツ"],
        kunyomi: ["ひ", "か"],
        meaning: "sun, day",
        level: "N5",
        tags: ["Nature", "Time", "Set1"]
    },
    {
        char: "月",
        onyomi: ["ゲツ", "ガツ"],
        kunyomi: ["つき"],
        meaning: "moon, month",
        level: "N5",
        tags: ["Nature", "Time", "Set1"]
    },
    {
        char: "人",
        onyomi: ["ジン", "ニン"],
        kunyomi: ["ひと"],
        meaning: "person",
        level: "N5",
        tags: ["People", "Set1"]
    },
    {
        char: "山",
        onyomi: ["サン"],
        kunyomi: ["やま"],
        meaning: "mountain",
        level: "N5",
        tags: ["Nature", "Set2"]
    },
    {
        char: "川",
        onyomi: ["セン"],
        kunyomi: ["かわ"],
        meaning: "river",
        level: "N5",
        tags: ["Nature", "Set2"]
    },
    {
        char: "水",
        onyomi: ["スイ"],
        kunyomi: ["みず"],
        meaning: "water",
        level: "N5",
        tags: ["Nature", "Elements", "Set2"]
    },
    {
        char: "火",
        onyomi: ["カ"],
        kunyomi: ["ひ"],
        meaning: "fire",
        level: "N5",
        tags: ["Nature", "Elements", "Set2"]
    },
    {
        char: "木",
        onyomi: ["モク", "ボク"],
        kunyomi: ["き"],
        meaning: "tree, wood",
        level: "N5",
        tags: ["Nature", "Set3"]
    },
    {
        char: "金",
        onyomi: ["キン", "コン"],
        kunyomi: ["かね"],
        meaning: "gold, money, metal",
        level: "N5",
        tags: ["Elements", "Set3"]
    },
    {
        char: "空",
        onyomi: ["クウ"],
        kunyomi: ["そら", "あく", "から"],
        meaning: "sky, empty",
        level: "N4",
        tags: ["Nature", "Set4"]
    },
    {
        char: "食",
        onyomi: ["ショク", "ジキ"],
        kunyomi: ["たべる", "くう"],
        meaning: "eat, food",
        level: "N4",
        tags: ["DailyLife", "Set4"]
    },
    {
        char: "語",
        onyomi: ["ゴ"],
        kunyomi: ["かたる"],
        meaning: "language, word",
        level: "N4",
        tags: ["Language", "Set4"]
    }
];
// function to seed kanji
const seedKanji = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield KanjiModel_1.default.deleteMany({});
        yield KanjiModel_1.default.insertMany(kanjiData);
        console.log("✅ Kanji data seeded successfully!");
    }
    catch (err) {
        console.error("❌ Error seeding kanji data:", err);
    }
});
exports.seedKanji = seedKanji;
