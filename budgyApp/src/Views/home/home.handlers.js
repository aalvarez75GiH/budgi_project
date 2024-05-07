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

export const sortingExpenseCategories = (expenseCategories) => {
  expenseCategories.sort((a, b) => {
    const category_nameA = a.category_name.toUpperCase(); // ignore upper and lowercase
    const category_nameB = b.category_name.toUpperCase(); // ignore upper and lowercase
    if (category_nameA < category_nameB) {
      return -1;
    }
    if (category_nameA > category_nameB) {
      return 1;
    }

    // names must be equal
    return 0;
  });
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
