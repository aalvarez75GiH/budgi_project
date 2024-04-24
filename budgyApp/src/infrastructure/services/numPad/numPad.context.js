import React, { useState, createContext, useContext } from "react";
// import { TransactionsContext } from "../transactions/transactions.context";
// import { CategoryListContext } from "../category_list/category_list.context";

export const NumPadContext = createContext();

export const NumPadContextProvider = ({ children }) => {
  const [number, setNumber] = useState("0");
  const clean = () => {
    setNumber("0");
  };

  const btnDelete = () => {
    let negative = "";
    let tempNumber = number;

    if (number.includes("-")) {
      negative = "-";
      tempNumber = number.substring(1);
    }
    if (tempNumber.length > 1) {
      setNumber(negative + tempNumber.slice(0, -1));
    } else {
      setNumber("0");
    }
  };

  const assemblingNumber = (digit) => {
    // do not accept double point
    if (number.includes(".") && digit === ".") {
      return;
    }
    if (number.startsWith("0") || number.startsWith("-0")) {
      if (digit === ".") {
        // concat a decimal point
        setNumber(number + digit);
      } else if (digit === "0" && number.includes(".")) {
        // allowing other zeros after a ' . '
        setNumber(number + digit);
      } else if (digit !== "0" && !number.includes(".")) {
        console.log(digit);
        // evaluate if it is different than zero and does not have point
        setNumber(digit);
      } else if (digit === "0" && !number.includes(".")) {
        // avoid 000.0
        // setNUmber(number)
        return;
      } else {
        setNumber(number + digit);
      }
    } else {
      setNumber(number + digit);
    }
  };

  return (
    <NumPadContext.Provider
      value={{
        number,
        setNumber,
        assemblingNumber,
        clean,
        btnDelete,
      }}
    >
      {children}
    </NumPadContext.Provider>
  );
};
