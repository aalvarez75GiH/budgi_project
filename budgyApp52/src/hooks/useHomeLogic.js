import { useContext } from "react";
import { TransactionsContext } from "../infrastructure/services/transactions/transactions.context";
import { HomeContext } from "../infrastructure/services/Home services/home.context";
export const useHomeLogic = () => {
  const { number } = useContext(HomeContext);
  const {
    transactionInfoForRequest,
    setTransactionInfoForRequest,
    fixingANumberToTwoDecimalsAndString,
  } = useContext(TransactionsContext);

  const movingToSelectCategory = (navigation) => {
    setTransactionInfoForRequest({
      ...transactionInfoForRequest,
      amount: fixingANumberToTwoDecimalsAndString(number),
    });
    // navigation.navigate("Categories");
    navigation.navigate("General_select_category_view", {
      comingFrom: "Home_View",
    });
  };
  return {
    movingToSelectCategory,
    number,
  };
};
