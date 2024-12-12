// src/index.js
import express from "express";
import sotckRouter from "./routers/stockRouter";
import cors from "cors";

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

app.use("/stocks", sotckRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
