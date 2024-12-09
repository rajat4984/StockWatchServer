// src/index.js
import express, { Express, Request, Response } from "express";
import sotckRouter from "./routers/stockRouter";

const app = express();
const port = 4000;

app.use(express.json());

app.use("/stocks", sotckRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
