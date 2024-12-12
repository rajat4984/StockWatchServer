"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("express").Router();
const stockController_1 = require("../controllers/stockController");
Router.get("/:stockSymbol", stockController_1.getStockInfo);
Router.get("/search/:stockSymbol", stockController_1.searchStock);
exports.default = Router;
