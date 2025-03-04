import express from "express";
import connectToDatabase from "./utils/database.js";
import { config } from "dotenv";
import userRouter from "./router/auth.js";
config(); // Call the config function directly

const app = express();
const port = 3000;

connectToDatabase();

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.use(express.json());
app.use("/api/auth", userRouter);

app.get("/", (req, res) => {
  res.json("success!");
});
