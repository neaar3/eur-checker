
import express, {Request, Response} from "express";
import cors from "cors";
import { changeSmallestValue, checkCurrencyValue } from "./controllers/exchange";

const app = express();
app
  .use(cors())
  .use(express.json())
  .get("/health", (_req: Request, res: Response) => res.send("Hello"))
  .get("/start", checkCurrencyValue)
  .get("/change-sv/:value", changeSmallestValue)


export default app;