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
exports.getQuiz = void 0;
const KanjiModel_1 = __importDefault(require("../models/KanjiModel"));
const shuffle = (arr) => arr.sort(() => 0.5 - Math.random());
const getQuiz = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { level, type } = req.params; // /api/v1/quiz/:level/:type
        const { count = 10 } = req.query;
        const kanjis = yield KanjiModel_1.default.find({ level });
        if (!kanjis.length)
            return res.status(404).json({ message: "No kanjis found" });
        const selected = shuffle(kanjis).slice(0, Number(count));
        const quiz = selected.map((kanji) => {
            let question = "";
            let answer = "";
            let options = [];
            switch (type) {
                case "meaning":
                    question = `What is the meaning of '${kanji.char}'?`;
                    answer = kanji.meaning;
                    options = shuffle([
                        ...shuffle(kanjis.filter((k) => k.char !== kanji.char)).slice(0, 3).map((k) => k.meaning),
                        answer,
                    ]);
                    break;
                case "onyomi":
                    question = `Which of the following is an Onyomi reading of '${kanji.char}'?`;
                    answer = kanji.onyomi[0];
                    options = shuffle([
                        ...shuffle(kanjis.filter((k) => k.char !== kanji.char && k.onyomi.length)).slice(0, 3).map((k) => k.onyomi[0]),
                        answer,
                    ]);
                    break;
                case "kunyomi":
                    question = `Which of the following is a Kunyomi reading of '${kanji.char}'?`;
                    answer = kanji.kunyomi[0];
                    options = shuffle([
                        ...shuffle(kanjis.filter((k) => k.char !== kanji.char && k.kunyomi.length)).slice(0, 3).map((k) => k.kunyomi[0]),
                        answer,
                    ]);
                    break;
                case "reverse":
                    question = `Which kanji means '${kanji.meaning}'?`;
                    answer = kanji.char;
                    options = shuffle([
                        ...shuffle(kanjis.filter((k) => k.char !== kanji.char)).slice(0, 3).map((k) => k.char),
                        answer,
                    ]);
                    break;
                case "mixed":
                default:
                    // Randomly pick from available types
                    const types = ["meaning", "onyomi", "kunyomi", "reverse"];
                    const randomType = types[Math.floor(Math.random() * types.length)];
                    return Object.assign(Object.assign({}, kanji), getQuestionForType(randomType, kanji, kanjis));
            }
            return { char: kanji.char, question, options, answer };
        });
        res.status(200).json({ total: quiz.length, quiz });
    }
    catch (err) {
        console.error("Error creating quiz:", err);
        res.status(500).json({ message: "Failed to create quiz" });
    }
});
exports.getQuiz = getQuiz;
// Helper for mixed mode
const getQuestionForType = (type, kanji, all) => {
    const shuffle = (arr) => arr.sort(() => 0.5 - Math.random());
    switch (type) {
        case "meaning":
            return {
                question: `What is the meaning of '${kanji.char}'?`,
                answer: kanji.meaning,
                options: shuffle([
                    ...shuffle(all.filter((k) => k.char !== kanji.char)).slice(0, 3).map((k) => k.meaning),
                    kanji.meaning,
                ]),
            };
        case "onyomi":
            return {
                question: `Which of the following is an Onyomi reading of '${kanji.char}'?`,
                answer: kanji.onyomi[0],
                options: shuffle([
                    ...shuffle(all.filter((k) => k.char !== kanji.char && k.onyomi.length)).slice(0, 3).map((k) => k.onyomi[0]),
                    kanji.onyomi[0],
                ]),
            };
        case "kunyomi":
            return {
                question: `Which of the following is a Kunyomi reading of '${kanji.char}'?`,
                answer: kanji.kunyomi[0],
                options: shuffle([
                    ...shuffle(all.filter((k) => k.char !== kanji.char && k.kunyomi.length)).slice(0, 3).map((k) => k.kunyomi[0]),
                    kanji.kunyomi[0],
                ]),
            };
        case "reverse":
            return {
                question: `Which kanji means '${kanji.meaning}'?`,
                answer: kanji.char,
                options: shuffle([
                    ...shuffle(all.filter((k) => k.char !== kanji.char)).slice(0, 3).map((k) => k.char),
                    kanji.char,
                ]),
            };
        default:
            return {};
    }
};
