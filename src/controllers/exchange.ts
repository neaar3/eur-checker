import instance from "../services/api"
import { sendText } from "../services/sms";
import { ApiLayerLiveResult, Quote } from "../types/types";
import { counter } from "../utils/counter";
import { Request, Response } from "express";

const TEN_MINUTES_IN_MILISSECONDS = 600000;

const mainCurrency = "EUR";
const comparingCurrency = "BRL"
const quote = [mainCurrency, comparingCurrency].join("");

let currentSmallestValue = 5.46000;


export async function checkCurrencyValue(_req: Request, res: Response) {

    async function verifySmallestValue() {
        const currentRate = await newCurrentRate()
        let smallestValue = currentSmallestValue;

        if (currentRate && currentRate < smallestValue) {
            await sendText(currentRate)
            await valueToChange(currentRate - 0.02); 
        }
    }

    setInterval(verifySmallestValue, TEN_MINUTES_IN_MILISSECONDS);

    return res.send("Started 🚀")
}

export async function changeSmallestValue(req: Request, res: Response) {
    const { value } = req.params
    currentSmallestValue = await valueToChange(parseInt(value));

    return res.send("💲 smallest value changed 💲")
}

async function newCurrentRate(): Promise<number> {
    let currentRate: Quote; 

    try { 
        const { data } = await instance.get(`live?source=${mainCurrency}&currencies=${comparingCurrency}`) as ApiLayerLiveResult;
        currentRate = data.quotes; 

        counter(true);
        return currentRate[quote];
    } catch (error: any) {
        console.error(error.message, 500)
        throw new Error(error)
    }
}

async function valueToChange(value: number | undefined): Promise<number|undefined> {
    if (value) {
        const floatValue = value / 100;
        return parseFloat(floatValue.toFixed(5))
    }
    
    return undefined;
}