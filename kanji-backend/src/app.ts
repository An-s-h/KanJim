import express from "express"
import router from "./routes/pageRoutes";
import dbConnect from "./config/db";
import cors from "cors";
// import { seedKanji } from "./seedKanji";

const app=express();
app.use(
  cors({
    origin: "http://localhost:5173", // frontend origin
    credentials: true, // allow cookies/headers (needed for Clerk)
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true}))
dbConnect();

app.use("/api/v1",router);

app.listen(3000,()=>{
  console.log(`Server is runing on 3000`)
})