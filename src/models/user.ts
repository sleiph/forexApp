import { ObjectId } from "mongodb";
import Stock from "./stock";

export default interface User {
    email: string;
    password: string;
    credits: number;
    stocks: Stock[];
    id?: ObjectId;
}
