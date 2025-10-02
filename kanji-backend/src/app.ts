import express from "express";
import router from "./routes/pageRoutes.js";
import dbConnect from "./config/db.js";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: [
      "https://kan-jim-pq8n.vercel.app",
      "https://kanjim.ansh.pw"
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dbConnect();

app.use("/api/v1", router);


export default app;
