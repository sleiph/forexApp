import React from "react";
import ICompany from "../types/company.type";

type Props = {
  company: ICompany,
};

const Stock = ({company}: Props) => {
  return (
    <div>
      <p>{company.displaySymbol}</p>
    </div>
  )
}

export default Stock;
