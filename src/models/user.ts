import { ObjectId } from "mongodb";
import Stock from "./stock";
import Trade from "./trade"

export default interface User {
    email: string;
    password: string;
    credits: number;
    stocks: Stock[];
    trades: Trade[];
    id?: ObjectId;
}
