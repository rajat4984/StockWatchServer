const Router = require("express").Router();
import { getStockInfo, searchStock } from "../controllers/stockController";

Router.get("/:stockSymbol", getStockInfo);
Router.get("/search/:stockSymbol", searchStock);

export default Router;
