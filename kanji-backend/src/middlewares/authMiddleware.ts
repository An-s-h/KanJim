import { requireAuth } from "@clerk/express"; 
// 👆 use @clerk/express in a Node/Express backend

// This replaces your custom JWT logic
export const isAuthenticated = requireAuth();
