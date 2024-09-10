import { useContext } from "react";

import { TransactionsContext } from "../infrastructure/services/transactions/transactions.context";
import { CategoryListContext } from "../infrastructure/services/category_list/category_list.context";

export const useCancelDeleteLogic = () => {
  //   ****** DATA FROM TRANSACTIONS CONTEXT ************
  const { deletingTransaction, isLoading } = useContext(TransactionsContext);
  const { isLoading: isLoadingFromCategoryListContext } =
    useContext(CategoryListContext);

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
    response
      ? navigation.navigate("Transaction_confirmation", {
          action_to_do: "delete_transaction",
        })
      : null;
    // response
    //   ? navigation.navigate(
    //       comingFrom === "My transactions"
    //         ? "My transactions"
    //         : "Transactions_by_category_View"
    //     )
    //   : null;
  };

  return {
    deletingTransactionProcess,
    isLoading,
    isLoadingFromCategoryListContext,
  };
};
