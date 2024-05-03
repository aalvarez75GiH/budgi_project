import React, { useState, createContext, useContext, useEffect } from "react";

export const TransactionsContext = createContext();
import { NumPadContext } from "../numPad/numPad.context";
import { AuthenticationContext } from "../authentication/authentication.context";
import { DateOperationsContext } from "../date_operations/date_operations.context";
import { getTransactionsAndTotalAmountRequestOrderedByTimeStamp } from "./transactions.services";
import {
  registerTransactionRequest,
  updateTransactionRequest,
  deleteTransactionRequest,
} from "./transactions.services";

export const TransactionContextProvider = ({ children }) => {
  const { month_year } = useContext(DateOperationsContext);
  const { setNumber } = useContext(NumPadContext);
  const { user, db } = useContext(AuthenticationContext);
  const { user_id } = user;

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
  const [transactionInfoForUpdate, setTransactionInfoForUpdate] = useState({});

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

        if (transactionsAndAmount.status === "404") {
          setTransactionsTotalAmount(0);
          setTransactionsByMonthYear([]);
          return;
        }
        const { transactions, total_amount } = transactionsAndAmount;
        setTransactionsTotalAmount(total_amount);
        setTransactionsByMonthYear(transactions);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
      // test(db);
    })();
  }, []);

  // console.log(
  //   "TRANSACTIONS BY MONTH YEAR AT CONTEXT:",
  //   JSON.stringify(transactionsByMonthYear, null, 2)
  // );

  const gettingTransactions_byUserID_MonthYear_onDemand = async (
    user_id,
    month_year
  ) => {
    try {
      setIsLoading(true);
      const transactionsAndAmount =
        await getTransactionsAndTotalAmountRequestOrderedByTimeStamp(
          user_id,
          month_year
        );

      if (transactionsAndAmount.status === "404") {
        setTransactionsTotalAmount(0);
        setTransactionsByMonthYear([]);
        return;
      }
      const { transactions, total_amount } = transactionsAndAmount;
      setTransactionsTotalAmount(total_amount);
      setTransactionsByMonthYear(transactions);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

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

  // *********************  THIS FUNCTION IS USED TO LISTEN FOR NEW CHANGES AT DB  *******************
  const listenForNewChangesAtDB = () => {
    const collectionRef = db.collection("transactions");
    collectionRef.onSnapshot(async (snapshot) => {
      let hasNewData = false;

      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const newData = change.doc.data();
          console.log("NEW TRANSACTION IS:", newData);
          if (newData) {
            hasNewData = true;
          }
        }
      });

      if (hasNewData) {
        try {
          const transactionsAndAmount =
            await getTransactionsAndTotalAmountRequestOrderedByTimeStamp(
              user_id,
              month_year
            );

          if (transactionsAndAmount.status === "404") {
            setTransactionsTotalAmount(0);
            setTransactionsByMonthYear([]);
            return;
          }
          const { transactions, total_amount } = transactionsAndAmount;
          setTransactionsTotalAmount(total_amount);
          setTransactionsByMonthYear(transactions);

          // setTransactionsByMonthYear(transactions);
          // setTransactionsTotalAmount(total_amount);
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      }
    });
  };

  // *********************  THIS FUNCTION IS USED TO UPDATE A TRANSACTION *******************
  const updatingTransaction = async () => {
    // Set the loading state to true.
    setIsLoading(true);

    try {
      // Create a new promise that will resolve with the response from the updateTransactionRequest function.
      const response = await new Promise((resolve, reject) => {
        // Delay the execution of the following code by 3000ms (3 seconds).
        setTimeout(async () => {
          try {
            // Call the updateTransactionRequest function with the transactionInfoForUpdate object.
            const response = await updateTransactionRequest(
              transactionInfoForUpdate
            );

            // If the response is truthy, call the listenForNewChangesAtDB function.
            (await response) ? listenForNewChangesAtDB() : null;

            // If the loading state is false, resolve the promise with the response.
            !isLoading ? resolve(response) : null;
          } catch (error) {
            // If there's an error, log it and reject the promise with the error.
            console.log("THERE WAS AN ERROR:", error);
            reject(error);
          }
        }, 3000);
      });

      // Return the response.
      return response;
    } catch (error) {
      // If there's an error, log it.
      console.log("THERE WAS AN ERROR:", error);
    }
  };

  // ********************* THIS FUNCTION IS USED TO DELETE A TRANSACTION *******************
  const deletingTransaction = async (transaction_id) => {
    setIsLoading(true);
    // console.log(
    //   "TRANSACTION INFO FOR UPDATE:",
    //   JSON.stringify(transactionInfoForUpdate, null, 2)
    // );

    try {
      const response = await new Promise((resolve, reject) => {
        setTimeout(async () => {
          try {
            const response = await deleteTransactionRequest(transaction_id);
            // console.log("RESPONSE:", JSON.stringify(response, null, 2));
            (await response) ? listenForNewChangesAtDB() : null;
            // response ? setIsLoading(false) : setIsLoading(true);
            !isLoading ? resolve(response) : null;
          } catch (error) {
            console.log("THERE WAS AN ERROR:", error);
            reject(error);
          }
        }, 3000);
      });
      return response;
    } catch (error) {
      console.log("THERE WAS AN ERROR:", error);
    }
  };

  // ****************** Updating transactions logic ******************

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
        transactionInfoForUpdate,
        setTransactionInfoForUpdate,
        updatingTransaction,
        deletingTransaction,
        gettingTransactions_byUserID_MonthYear_onDemand,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};

// console.log("HEEEY:", transactionsAndAmount);

// console.log(
//   "TRANSACTIONS AND AMOUNT:",
//   JSON.stringify(transactionsAndAmount, null, 2)
// );
// console.log(
//   "TRANSACTIONS   STATUS:",
//   JSON.stringify(transactionsAndAmount.status, null, 2)
// );
// console.log(
//   "TRANSACTION REQUEST COMING:",
//   JSON.stringify(transactions, null, 2)
// );
// console.log(
//   "TRANSACTION REQUEST COMING:",
//   JSON.stringify(total_amount, null, 2)
// );
