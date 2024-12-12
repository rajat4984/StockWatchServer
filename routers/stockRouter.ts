const Router = require("express").Router();
import {
  getSingleStockInfo,
  getStockInfo,
  searchStock,
} from "../controllers/stockController";

Router.get("/:stockSymbol", getStockInfo);
Router.get("/search/:stockSymbol", searchStock);
Router.get("/getSingleStock/:singleStockSymbol/:timeStamp", getSingleStockInfo);

export default Router;
