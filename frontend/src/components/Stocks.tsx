import React, { useState, useEffect } from "react";
import { getStockCompanies } from "../services/forex.service";
import { getPublicContent } from "../services/user.service";
import ICompany from "../types/company.type";
import Stock from "./Stock";

const Stocks: React.FC = () => {
  const [content, setContent] = useState<string>("");
  const [companies, setCompanies] = React.useState<Array<ICompany>>();

  useEffect(() => {
    getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  useEffect(() => {
    async function getCompanies() {
      // real time API, but with limited uses
      //const res = await getExchangeRate()
      // free API, but not real time
      const res = await getStockCompanies()
      
      setCompanies(res.slice(0, 25))
    }
    getCompanies()
  }, [])

  if (!companies) {
    return (<div>Loading...</div>)
  }

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>{content}</h3>

      </header>
      <div>
        {
        companies &&
          companies.map((company: ICompany, index: number) => <Stock key={index} company={company}/>)
        }
      </div>
    </div>
  );
};

export default Stocks;
