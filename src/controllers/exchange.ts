import { Request, Response } from "express";
import * as exchangeService from "../services/exchange";

export async function checkCurrencyValue(_req: Request, res: Response) {

    await exchangeService.startCurrencyCheck()

    return res.send("Started 🚀")
}

export async function changeSmallestValue(req: Request, res: Response) {
    const { value } = req.params
    
    await exchangeService.changeSmallestValue(value);

    return res.send("💲 smallest value changed 💲")
}