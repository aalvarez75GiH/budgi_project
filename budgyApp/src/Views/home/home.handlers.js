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

export const sortingTransactions = (transactions) => {
  transactions.sort((a, b) => {
    const transaction_dateA = a.transaction_date; // ignore upper and lowercase
    const transaction_dateB = b.transaction_date; // ignore upper and lowercase
    if (transaction_dateA > transaction_dateB) {
      return -1;
    }
    if (transaction_dateA < transaction_dateB) {
      return 1;
    }

    // names must be equal
    return 0;
  });
};
