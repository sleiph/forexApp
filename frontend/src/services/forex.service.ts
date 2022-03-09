import axios from "axios";

const API_URL = 'https://finnhub.io/api/v1/';
const API_KEY = process.env.REACT_APP_FINNHUBSANDBOX_KEY;

export const getExchangeRateFinnhub = () => {
  return axios
    .get(API_URL + 'forex/rates?base=USD&token=' + API_KEY )
    .then((response) => {
      return response.data.quote.GBP;
    });
};

export const getStockCompanies = () => {
  return axios
    .get(API_URL + 'stock/symbol?exchange=L&token=' + API_KEY )
    .then((response) => {
      return response.data;
    });
};

