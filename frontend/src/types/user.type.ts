import IStock from "./stock.type";

export default interface IUser {
  id?: any | null,
  username: string,
  email: string,
  password: string,
  credits: number,
  stocks?: IStock,
  trades?: Array<string>
}