import React, { useContext } from "react";
import { TransactionsContext } from "../../infrastructure/services/transactions/transactions.context";

export const parsingAmount = () => {
  const { transactionInfoForRequest } = useContext(TransactionsContext);

  const transactionInfoForRequestModified = {
    ...transactionInfoForRequest,
    amount: parseFloat(transactionInfoForRequest.amount),
  };

  return {
    transactionInfoForRequestModified,
  };
};
