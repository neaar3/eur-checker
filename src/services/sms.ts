import twilio, { Twilio } from 'twilio';
import dotenv from "dotenv";
import { Phone } from '../types/types';

dotenv.config()

export async function sendText(value: number) {
    const phoneNumbers = [parseInt(process.env.THAU_PHONE_NUMBER), parseInt(process.env.IAGO_PHONE_NUMBER)]    
    const clientIago = twilio(process.env.TWILIO_ACCOUNT_SID_IAGO, process.env.TWILIO_AUTH_TOKEN_IAGO);
    const clientThauan = twilio(process.env.TWILIO_ACCOUNT_SID_THAU, process.env.TWILIO_AUTH_TOKEN_THAU);

    phoneNumbers.map(async phoneNumber => { 
        let client: Twilio;
        Phone.IAGO == phoneNumber ? client = clientIago : client = clientThauan;

        if (!validateE164(`+${phoneNumber}`)) {
            throw new Error('number must be E164 format!')
        }
    
        const textContent = {
            body: `Euro <> Real update: EUR 1.0000 currently is BRL ${value}`,
            to: `+${phoneNumber}`,
            from: Phone.IAGO == phoneNumber ? process.env.TWILIO_PHONE_NUMBER_IAGO : process.env.TWILIO_PHONE_NUMBER_THAU,
        }
    
        await client.messages.create(textContent);
    })
}

function validateE164(phoneNumber: string) {
    return /^\+?[1-9]\d{1,14}$/.test(phoneNumber)
}
