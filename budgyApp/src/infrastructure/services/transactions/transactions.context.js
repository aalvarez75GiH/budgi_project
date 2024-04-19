import React, { useState, createContext, useContext, useEffect } from "react";

export const TransactionsContext = createContext();
import { NumPadContext } from "../numPad/numPad.context";
import { AuthenticationContext } from "../authentication/authentication.context";
import { DateOperationsContext } from "../date_operations/date_operations.context";
import { getTransactionsAndTotalAmountRequestOrderedByTimeStamp } from "./transactions.services";

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
        setTransactionsByMonthYear(transactions);
        setTransactionsTotalAmount(total_amount);
        transactionsByMonthYear ? setIsLoading(false) : setIsLoading(true);
      } catch (error) {
        console.log(error);
      }
      // test(db);
    })();
  }, []);

  const makingATransactionsAndTotalAmountRequestOrderedByTimeStampAfterAnotherTransaction =
    async (user_id, month_year) => {
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
        setTransactionsByMonthYear(transactions);
        setTransactionsTotalAmount(total_amount);
        transactionsByMonthYear ? setIsLoading(false) : setIsLoading(true);
      } catch (error) {
        console.log(error);
      }
      // test(db);
    };
  // const test = () => {
  //   let newData;
  //   const collectionRef = db.collection("transactions");
  //   collectionRef.onSnapshot((snapshot) => {
  //     snapshot.docChanges().forEach((change) => {
  //       if (change.type === "added") {
  //         newData = change.doc.data();
  //         console.log("NEW TRANSACTION IS:", newData);
  //       }
  //     });
  //     // setNewTransaction(newData);
  //   });
  // };

  // let newData;
  // const collectionRef = db.collection("transactions");
  // collectionRef.onSnapshot((snapshot) => {
  //   snapshot.docChanges().forEach((change) => {
  //     if (change.type === "added") {
  //       newData = change.doc.data();
  //       console.log("NEW TRANSACTION IS:", newData);
  //     }
  //   });
  //   // setNewTransaction(newData);
  // });

  const preparingTransactionsByUserId_by_monthYear = (
    user_id,
    category_id,
    month_year
  ) => {
    console.log("USER_ID AT TRANSACTIONS CONTEXT:", user_id);
    console.log("CATEGORY ID AT TRANSACTIONS CONTEXT:", category_id);
    console.log("MONTH YEAR AT TRANSACTIONS CONTEXT:", month_year);
  };

  // ******************** Work in progress ************************

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
        transactionsByMonthYear,
        total_amount,
        preparingTransactionsByUserId_by_monthYear,
        setTransactionsByMonthYear,
        setTransactionsTotalAmount,
        makingATransactionsAndTotalAmountRequestOrderedByTimeStampAfterAnotherTransaction,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};
