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
exports.getKanjis = void 0;
const KanjiModel_1 = __importDefault(require("../models/KanjiModel"));
const getKanjis = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { level } = req.params; // <-- from /api/v1/kanji/:level
        const { tag, set } = req.query; // optional query filters
        let filter = {};
        if (level)
            filter.level = level;
        if (tag)
            filter.tags = tag;
        if (set)
            filter.tags = set;
        const kanjis = yield KanjiModel_1.default.find(filter);
        res.status(200).json({
            count: kanjis.length,
            kanjis,
        });
    }
    catch (err) {
        console.error("Error fetching kanji:", err);
        res.status(500).json({ message: "Failed to fetch kanji" });
    }
});
exports.getKanjis = getKanjis;
