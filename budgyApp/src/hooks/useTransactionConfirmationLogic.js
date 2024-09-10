import { useContext } from "react";

import { TransactionsContext } from "../infrastructure/services/transactions/transactions.context";

export const useTransactionConfirmationLogic = () => {
  //   ****** DATA FROM TRANSACTIONS CONTEXT ************
  const {
    isConfirmed,
    cleaningState,
    transactionInfoForRequest,
    transactionInfoForUpdate,
    fixingANumberToTwoDecimalsAndString,
  } = useContext(TransactionsContext);

  const { amount, transaction_date, short_name } = transactionInfoForRequest;
  const {
    amount: amount_updated,
    transaction_date: transaction_date_updated,
    short_name: short_name_updated,
  } = transactionInfoForUpdate;
  console.log("transactionInfoForUpdate:", transactionInfoForUpdate);
  console.log("transactionInfoForUpdate amount:", amount_updated);
  console.log(
    "transactionInfoForUpdate transaction date:",
    transaction_date_updated
  );
  console.log("transactionInfoForUpdate short name:", short_name_updated);
  // ****** Here we are parsing amount to integer for request to transaction end point
  const stringedAmount = fixingANumberToTwoDecimalsAndString(amount);
  const stringedAmountUpdated =
    fixingANumberToTwoDecimalsAndString(amount_updated);

  const goingHome = (navigation) => {
    cleaningState();
    navigation.reset({
      index: 0,
      routes: [{ name: "Home" }],
    });
  };

  return {
    goingHome,
    isConfirmed,
    transaction_date,
    short_name,
    stringedAmount,
    stringedAmountUpdated,
    transaction_date_updated,
    short_name_updated,
  };
};
