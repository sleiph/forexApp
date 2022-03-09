import React, { useState, useEffect } from "react";
import { number } from "yup/lib/locale";
import { getCurrentUser } from "../services/auth.service";
import { getExchangeRate } from "../services/currency.service";
import { getUserBoard } from "../services/user.service";
import { getExchangeRateFinnhub } from "../services/forex.service";
import IStock from "../types/stock.type";
import ITrade from "../types/trade.type";

const Profile: React.FC = () => {
  const [usd, setUsd] = useState<number>()

  const currentUser = getCurrentUser();

  useEffect(() => {
    async function getExchange() {
      // real time API, but with limited uses
      //const res = await getExchangeRate()
      // free API, but not real time
      const res = await getExchangeRateFinnhub()
      setUsd(res)
    }
    getExchange()
  }, [])

  var GBPformatter = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    maximumFractionDigits: 2
  
  });
  var USDformatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',

  });

  if (!usd) {
    return (<div>Loading...</div>)
  }

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{currentUser.username}</strong> Profile
        </h3>
      </header>
      <p>
        <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{" "}
        {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
      </p>
      <p>
        <strong>Id:</strong> {currentUser.id}
      </p>
      <p>
        <strong>Email:</strong> {currentUser.email}
      </p>
      <p>
        <strong>Credits:</strong> {GBPformatter.format(currentUser.credits)} or {USDformatter.format(currentUser.credits / usd)}
      </p>
      <strong>Stocks Owned:</strong>
      <ul>
        {
        currentUser.stocks &&
          currentUser.stocks.map((stock: IStock, index: number) => <li key={index}>{stock.name}</li>)
        }
      </ul>
      <strong>Last Trades:</strong>
      <ul>
        {
        currentUser.trades &&
          currentUser.trades.map((trade: ITrade, index: number) => <li key={index}>{trade.name}</li>)
        }
      </ul>
    </div>
  );
};

export default Profile;
