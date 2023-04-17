import { counter } from "../utils/counter";
import { valueToChange } from "../utils/changer";
import instance from "./api";
import { ApiLayerLiveResult, Quote } from "../types/types";
import { sendText } from "./sms";

const mainCurrency = "EUR";
const comparingCurrency = "BRL"
const quote = [mainCurrency, comparingCurrency].join("");

const TEN_MINUTES_IN_MILISSECONDS = 600000;
let currentSmallestValue = 5.40000;

export async function newCurrentRate(): Promise<number> {
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

export async function startCurrencyCheck() {
    async function verifySmallestValue() {
        const currentRate = await newCurrentRate()
        let smallestValue = currentSmallestValue;
    
        if (currentRate && currentRate < smallestValue) {
            const newComparativeValue = currentRate - 0.02

            await sendText(currentRate, newComparativeValue)
            currentSmallestValue = newComparativeValue; 
        }
    }
    
    setInterval(verifySmallestValue, TEN_MINUTES_IN_MILISSECONDS);
}

export async function changeSmallestValue(value: string) {
    currentSmallestValue = await valueToChange(parseInt(value));
    return;
}