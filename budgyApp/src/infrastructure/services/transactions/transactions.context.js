import React, { useState, createContext, useContext, useEffect } from "react";

export const TransactionsContext = createContext();
import { NumPadContext } from "../numPad/numPad.context";
import { AuthenticationContext } from "../authentication/authentication.context";
import { DateOperationsContext } from "../date_operations/date_operations.context";
import { getTransactionsAndTotalAmountRequestOrderedByTimeStamp } from "./transactions.services";
import { registerTransactionRequest } from "./transactions.services";

export const TransactionContextProvider = ({ children }) => {
  const { month_year } = useContext(DateOperationsContext);
  const { setNumber } = useContext(NumPadContext);
  const { user, app, db } = useContext(AuthenticationContext);
  const { user_id } = user;
  // const db = app.firestore();

  const TRANSACTION_INFO_INITIAL = {
    amount: "",
    category_name: "",
    category_id: "",
    creation_date: "",
    month_year: month_year,
    user_id: user_id,
    most_recent: true,
    transaction_date: "",
    icon_name: "",
    short_name: "",
    timeStamp: 0,
    description: "",
  };

  const [transactionInfoForRequest, setTransactionInfoForRequest] = useState(
    TRANSACTION_INFO_INITIAL
  );
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [transactionsByMonthYear, setTransactionsByMonthYear] = useState([]);
  const [total_amount, setTransactionsTotalAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // ******************** Work in progress ************************
  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const transactionsAndAmount =
          await getTransactionsAndTotalAmountRequestOrderedByTimeStamp(
            user_id,
            month_year
          );

        // console.log(
        //   "TRANSACTIONS AND AMOUNT:",
        //   JSON.stringify(transactionsAndAmount, null, 2)
        // );
        const { transactions, total_amount } = transactionsAndAmount;
        // console.log(
        //   "TRANSACTION REQUEST COMING:",
        //   JSON.stringify(transactions, null, 2)
        // );
        // console.log(
        //   "TRANSACTION REQUEST COMING:",
        //   JSON.stringify(total_amount, null, 2)
        // );

        if (transactionsAndAmount) {
          setTransactionsTotalAmount(total_amount);
          setTransactionsByMonthYear(transactions);
          // setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
      // test(db);
    })();
  }, []);

  const cleaningState = () => {
    setNumber("0");
    setTransactionInfoForRequest(TRANSACTION_INFO_INITIAL);
    setIsConfirmed(false);
  };

  const fixingANumberToTwoDecimals = (number) => {
    const numberFixed = Math.round(number * 100) / 100;
    return numberFixed;
  };

  const fixingANumberToTwoDecimalsAndString = (number) => {
    const numberFixed = (Math.round(number * 100) / 100).toFixed(2);
    return numberFixed;
  };

  return (
    <TransactionsContext.Provider
      value={{
        transactionInfoForRequest,
        setTransactionInfoForRequest,
        isConfirmed,
        setIsConfirmed,
        cleaningState,
        fixingANumberToTwoDecimals,
        fixingANumberToTwoDecimalsAndString,
        isLoading,
        setIsLoading,
        transactionsByMonthYear,
        total_amount,
        setTransactionsByMonthYear,
        setTransactionsTotalAmount,
        // registeringTransaction,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};
