import { Request, Response } from "express";
import yahooFinance from "yahoo-finance2";

const getStockInfo = async (req: Request, res: Response) => {
  const { stockSymbol } = req.params;

  try {
    console.log(stockSymbol);
    const results = await yahooFinance.search(stockSymbol);

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const searchStock = async (req: Request, res: Response) => {
  const { stockSymbol } = req.params;

  try {
    const result = await yahooFinance.search(stockSymbol);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const getSingleStockInfo = async (req: Request, res: Response) => {
  const { singleStockSymbol, timeStamp } = req.params;
  const now = new Date();

  // dynamic import because dateformat was giving error then downgraded to specific version to solve the issue
  const dateFormatModule = await import("dateformat");
  const dateFormat = dateFormatModule.default || dateFormatModule;
  let formattedDate = "";
  let intervalPeriod:
    | "1d"
    | "1mo"
    | "1m"
    | "2m"
    | "5m"
    | "15m"
    | "30m"
    | "60m"
    | "90m"
    | "1h"
    | "5d"
    | "1wk"
    | "3mo" = "1d";
  switch (timeStamp) {
    case "1D":
      formattedDate = dateFormat(now, "yyyy-mm-dd");
      break;
    case "5D":
      formattedDate = dateFormat(now.setDate(now.getDate() - 6), "yyyy-mm-dd");
      break;
    case "6M":
      formattedDate = dateFormat(
        now.setMonth(now.getMonth() - 6),
        "yyyy-mm-dd"
      );
      intervalPeriod = "1mo";
      break;

    case "YTD":
      formattedDate = dateFormat(
        now.setMonth(now.getMonth() - 6),
        "yyyy-mm-dd"
      );
      intervalPeriod = "3mo";
      break;

    case "1Y":
      formattedDate = dateFormat(
        now.setFullYear(now.getFullYear() - 1),
        "yyyy-mm-dd"
      );
      intervalPeriod = "3mo";
      break;

    case "5Y":
      formattedDate = dateFormat(
        now.setFullYear(now.getFullYear() - 5),
        "yyyy-mm-dd"
      );
      intervalPeriod = "3mo";
      break;

    default:
      break;
  }

  const queryOptions = { period1: formattedDate, interval: intervalPeriod };
  try {
    const result = await yahooFinance.chart(singleStockSymbol, queryOptions);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export { getStockInfo, searchStock, getSingleStockInfo };
