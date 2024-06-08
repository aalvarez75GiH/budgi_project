import { useState, useContext } from "react";

import { DateOperationsContext } from "../infrastructure/services/date_operations/date_operations.context";
import { AuthenticationContext } from "../infrastructure/services/authentication/authentication.context";
import { TransactionsContext } from "../infrastructure/services/transactions/transactions.context";

export const useCalendarLogic = () => {
  //   ****** DATA FROM AUTHENTICATION CONTEXT ************
  const { user } = useContext(AuthenticationContext);
  const { user_id } = user;

  //   ****** DATA DATE OPERATIONS CONTEXT ************
  const { packingExpenseDateForDifferentDay, system_date, month_year } =
    useContext(DateOperationsContext);

  //   ****** DATA FROM TRANSACTIONS CONTEXT ************
  const {
    setTransactionInfoForRequest,
    transactionInfoForRequest,
    transactionInfoForUpdate,
    setTransactionInfoForUpdate,
    transactionsByMonthYear,
    gettingTransactions_byUserID_MonthYear_onDemand,
  } = useContext(TransactionsContext);

  const [selected, setSelected] = useState(null);

  const settingTimeStampForDifferentDay = (expenseDate) => {
    console.log("EXPENSE DATE:", expenseDate);
    const last_transactionWithSameExpenseDate = transactionsByMonthYear.find(
      (element) => element.transaction_date === expenseDate
    );
    console.log("TRANSACTIONS BY MONTH YEAR:", transactionsByMonthYear);

    let timeStampForDifferentDayTransaction;
    if (last_transactionWithSameExpenseDate) {
      // Use last_transactionWithSameExpenseDate
      timeStampForDifferentDayTransaction =
        last_transactionWithSameExpenseDate.timeStamp + 1000;
      // return timeStampForDifferentDayTransaction;
    } else {
      // Handle the case where last_transactionWithSameExpenseDate is undefined
      timeStampForDifferentDayTransaction = Date.now();
      // return timeStampForDifferentDayTransaction;
    }
    return timeStampForDifferentDayTransaction;
  };

  const onDateChange = async (date, comingFrom) => {
    setSelected(date);
    const { expenseDate, month_year_for_different_day } =
      packingExpenseDateForDifferentDay(date);
    // console.log("MONTH YEAR ON DATE CHANGE:", month_year_for_different_day);
    // console.log("MONTH YEAR ON DATE CHANGE:", month_year);

    await gettingTransactions_byUserID_MonthYear_onDemand(
      user_id,
      month_year_for_different_day
    );

    const timeStampForDifferentDayTransaction =
      await settingTimeStampForDifferentDay(expenseDate);
    // console.log(
    //   "TIME STAMP FOR DIFFERENT DAY TRANSACTION:",
    //   timeStampForDifferentDayTransaction
    // );
    switch (comingFrom) {
      case "TransactionSummaryView":
        setTransactionInfoForRequest({
          ...transactionInfoForRequest,
          creation_date: system_date,
          transaction_date: expenseDate,
          month_year: month_year_for_different_day,
          timeStamp: timeStampForDifferentDayTransaction
            ? timeStampForDifferentDayTransaction
            : Date.now(),
        });
        break;
      case "AnyTransactionDetailsView":
        setTransactionInfoForUpdate({
          ...transactionInfoForUpdate,
          transaction_date: expenseDate,
          month_year: month_year_for_different_day,
          timeStamp: timeStampForDifferentDayTransaction
            ? timeStampForDifferentDayTransaction
            : Date.now(),
        });
        break;
      default:
        break;
    }
  };

  const backHeaderAction = (
    navigation,
    setButton1Pressed,
    setButton2Pressed,
    comingFrom
  ) => {
    const { expenseDate, month_year } =
      packingExpenseDateForDifferentDay(system_date);

    const timeStampForDifferentDayTransaction =
      settingTimeStampForDifferentDay(expenseDate);
    {
      comingFrom === "TransactionSummaryView"
        ? setTransactionInfoForRequest({
            ...transactionInfoForRequest,
            creation_date: system_date,
            transaction_date: expenseDate,
            month_year: month_year,
            timeStamp: timeStampForDifferentDayTransaction
              ? timeStampForDifferentDayTransaction
              : Date.now(),
          })
        : setTransactionInfoForUpdate({
            ...transactionInfoForUpdate,
            transaction_date: expenseDate,
            month_year: month_year,
            timeStamp: timeStampForDifferentDayTransaction
              ? timeStampForDifferentDayTransaction
              : Date.now(),
          });
    }
    {
      comingFrom === "TransactionSummaryView"
        ? settingButtonPressedAndExiting(
            navigation,
            setButton1Pressed,
            setButton2Pressed
          )
        : movingBackToTransactionDetails(navigation);
    }
  };

  const settingButtonPressedAndExiting = (
    navigation,
    setButton1Pressed,
    setButton2Pressed
  ) => {
    setButton1Pressed(true);
    setButton2Pressed(false);
    navigation.goBack();
  };

  const comingBackToSummary = (
    navigation,
    setButton1Pressed,
    setButton2Pressed
  ) => {
    setButton1Pressed(false);
    setButton2Pressed(true);
    navigation.goBack();
  };

  const movingBackToTransactionDetails = (navigation) => {
    navigation.navigate("Transaction_details_view");
  };

  return {
    comingBackToSummary,
    movingBackToTransactionDetails,
    backHeaderAction,
    onDateChange,
    selected,
  };
};
