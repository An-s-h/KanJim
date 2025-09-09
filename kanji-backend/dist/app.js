"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pageRoutes_1 = __importDefault(require("./routes/pageRoutes"));
const db_1 = __importDefault(require("./config/db"));
const cors_1 = __importDefault(require("cors"));
// import { seedKanji } from "./seedKanji";
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "http://localhost:5173", // frontend origin
    credentials: true, // allow cookies/headers (needed for Clerk)
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
(0, db_1.default)();
app.use("/api/v1", pageRoutes_1.default);
app.listen(3000, () => {
    console.log(`Server is runing on 3000`);
});
