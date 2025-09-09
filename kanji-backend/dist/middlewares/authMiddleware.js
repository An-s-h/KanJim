"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const express_1 = require("@clerk/express");
// 👆 use @clerk/express in a Node/Express backend
// This replaces your custom JWT logic
exports.isAuthenticated = (0, express_1.requireAuth)();
