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
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
};

export { getStockInfo, searchStock };
