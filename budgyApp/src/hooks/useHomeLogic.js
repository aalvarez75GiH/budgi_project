import { useContext } from "react";
import { TransactionsContext } from "../infrastructure/services/transactions/transactions.context";
import { NumPadContext } from "../infrastructure/services/numPad/numPad.context";
export const useHomeLogic = () => {
  const { number } = useContext(NumPadContext);
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
