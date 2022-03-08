import { ObjectId } from "mongodb";

export default interface Stock {
    stock_name: string;
    operation_type: number;
    date: Date
    quantity: number;
}
