import IStock from "./stock.type";
import ITrade from "./trade.type";

export default interface IUser {
  id?: any | null,
  username: string,
  email: string,
  password: string,
  credits: number,
  stocks?: Array<IStock>,
  trades?: Array<ITrade>
}