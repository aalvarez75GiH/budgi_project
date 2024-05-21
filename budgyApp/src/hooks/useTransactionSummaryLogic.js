import React, { useState, useContext } from "react";
import { registerTransactionRequest } from "../infrastructure/services/transactions/transactions.services";
import { DateOperationsContext } from "../infrastructure/services/date_operations/date_operations.context";
import { getTransactionsAndTotalAmountRequestOrderedByTimeStamp } from "../infrastructure/services/transactions/transactions.services";
import { AuthenticationContext } from "../infrastructure/services/authentication/authentication.context";

export const useTransactionSummaryLogic = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [button1Pressed, setButton1Pressed] = useState(true);
  const [button2Pressed, setButton2Pressed] = useState(false);

  const { packingExpenseDateForDifferentDay, system_date, month_year } =
    useContext(DateOperationsContext);

  const { user, db } = useContext(AuthenticationContext);
  const { user_id } = user;

  console.log("typeof DB:", typeof db);
  const registeringTransaction = async (
    navigation,
    transactionInfoForRequest,
    setIsConfirmed,
    setTransactionsByMonthYear,
    setTransactionsTotalAmount
  ) => {
    setIsLoading(true);
    const transactionInfoForRequestWithTS = {
      ...transactionInfoForRequest,
      timeStamp: transactionInfoForRequest.timeStamp
        ? transactionInfoForRequest.timeStamp
        : Date.now(),
    };

    setTimeout(async () => {
      try {
        const response = await registerTransactionRequest(
          transactionInfoForRequestWithTS
        );
        // console.log("RESPONSE:", JSON.stringify(response, null, 2));
        response ? setIsLoading(false) : setIsLoading(true);
        response ? setIsConfirmed(true) : setIsConfirmed(false);
        response
          ? listenForNewChangesAtDB(
              setTransactionsByMonthYear,
              setTransactionsTotalAmount
            )
          : null;
        navigation.navigate("Transaction_confirmation");
      } catch (error) {
        console.log("THERE WAS AN ERROR:", error);
      }
    }, 3000);
  };

  const movingForwardToCalendar = (navigation) => {
    navigation.navigate("General_calendar_view", {
      setButton1Pressed,
      setButton2Pressed,
      comingFrom: "TransactionSummaryView",
    });
    setButton1Pressed(false);
    setButton2Pressed(true);
  };

  const movingForwardToAddDescription = (navigation) => {
    navigation.navigate("General_AddDescription_view", {
      comingFrom: "TransactionSummaryView",
    });
  };

  const backHeaderAction = (
    navigation,
    transactionInfoForRequest,
    setTransactionInfoForRequest
  ) => {
    const { expenseDate } = packingExpenseDateForDifferentDay(system_date);
    // console.log("EXPENSE DATE AT NEW CALENDAR:", expenseDate);
    setTransactionInfoForRequest({
      ...transactionInfoForRequest,
      creation_date: system_date,
      transaction_date: expenseDate,
    });
    setButton1Pressed(true);
    setButton2Pressed(false);
    navigation.goBack();
  };

  const settingTodayTransactionDate = (
    // packingExpenseDateForDifferentDay,
    setTransactionInfoForRequest,
    transactionInfoForRequest,
    system_date
  ) => {
    const { expenseDate } = packingExpenseDateForDifferentDay(system_date);
    // console.log("EXPENSE DATE AT NEW CALENDAR:", expenseDate);
    setTransactionInfoForRequest({
      ...transactionInfoForRequest,
      creation_date: system_date,
      transaction_date: expenseDate,
    });
    setButton1Pressed(true);
    setButton2Pressed(false);
  };

  const listenForNewChangesAtDB = (
    setTransactionsByMonthYear,
    setTransactionsTotalAmount
  ) => {
    const collectionRef = db.collection("transactions");
    collectionRef.onSnapshot(async (snapshot) => {
      let hasNewData = false;

      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const newData = change.doc.data();
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

          const { transactions, total_amount } = transactionsAndAmount;

          setTransactionsByMonthYear(transactions);
          setTransactionsTotalAmount(total_amount);
          setIsLoading(false);
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  return {
    registeringTransaction,
    isLoading,
    setIsLoading,
    movingForwardToCalendar,
    movingForwardToAddDescription,
    button1Pressed,
    button2Pressed,
    backHeaderAction,
    settingTodayTransactionDate,
    packingExpenseDateForDifferentDay,
    month_year,
    listenForNewChangesAtDB,
  };
};
