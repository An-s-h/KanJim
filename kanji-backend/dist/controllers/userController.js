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
exports.syncUser = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const syncUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { clerkId, username, email } = req.body;
        let user = yield userModel_1.default.findOne({ clerkId });
        if (!user) {
            user = yield userModel_1.default.create({
                clerkId,
                username,
                email,
                progress: { kanjiLearned: [], courseCompletion: 0 },
            });
        }
        res.json(user);
    }
    catch (err) {
        res.status(500).json({ message: "Error syncing user", error: err });
    }
});
exports.syncUser = syncUser;
