import env from "react-dotenv";
import axios from "axios";

const API_URL = `https://api.currencyfreaks.com/latest?apikey=${process.env.REACT_APP_CURRENCYFREAKS_KEY}&symbols=GBP`;

export const getExchangeRate = () => {
  return axios
    .get(API_URL)
    .then((response) => {
      return response.data.rates.GBP;
    });
};
