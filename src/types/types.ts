import dotenv from "dotenv";

dotenv.config()

export type Quote = Record<string, number>;

export type ApiLayerLiveResult = {
    data: {
        "quotes": {
        "EURBRL": number
        },
        "source": string,
        "success": boolean,
        "timestamp": number
    }
}

export enum Phone {
    THAU = parseInt(process.env.THAU_PHONE_NUMBER),
    IAGO = parseInt(process.env.IAGO_PHONE_NUMBER)
}