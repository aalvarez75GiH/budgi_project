import { useContext } from "react";

import { TransactionsContext } from "../infrastructure/services/transactions/transactions.context";

export const useCancelDeleteLogic = () => {
  //   ****** DATA FROM TRANSACTIONS CONTEXT ************
  const { deletingTransaction, isLoading } = useContext(TransactionsContext);

  const deletingTransactionProcess = async (
    navigation,
    transaction_id,
    comingFrom
  ) => {
    console.log(
      "TRANSACTION ID AT CANCEL DELETE CONFIRMATION:",
      transaction_id
    );
    const response = await deletingTransaction(transaction_id);
    // response ? navigation.navigate("My transactions") : null;
    response
      ? navigation.navigate(
          comingFrom === "My transactions"
            ? "My transactions"
            : "Transactions_by_category_View"
        )
      : null;
  };

  return {
    deletingTransactionProcess,
    isLoading,
  };
};
