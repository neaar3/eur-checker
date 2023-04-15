import axios from "axios";
import { counter } from "../utils/counter";
import dotenv from "dotenv";

dotenv.config()

const count = counter(false);
const key = process.env[`API_KEY_${count}`]

const instance = axios.create({
    baseURL: 'https://api.apilayer.com/currency_data/',
    headers: {
        "apikey": key,
    }
});

export default instance;