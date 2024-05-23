import { useContext } from "react";

import { TransactionsContext } from "../infrastructure/services/transactions/transactions.context";

export const useTransactionConfirmationLogic = () => {
  //   ****** DATA FROM TRANSACTIONS CONTEXT ************
  const {
    isConfirmed,
    cleaningState,
    transactionInfoForRequest,
    fixingANumberToTwoDecimalsAndString,
  } = useContext(TransactionsContext);

  const { amount, transaction_date, short_name } = transactionInfoForRequest;

  // ****** Here we are parsing amount to integer for request to transaction end point
  const stringedAmount = fixingANumberToTwoDecimalsAndString(amount);

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
  };
};
