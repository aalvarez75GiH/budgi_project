import { useContext, useState } from "react";
import { TransactionsContext } from "../infrastructure/services/transactions/transactions.context";
import { RealIncomeContext } from "../infrastructure/services/real_income/real_income.context";

export const useEnterAmountLogic = (comingFrom) => {
  console.log("COMING FROM:", comingFrom);

  const {
    fixingANumberToTwoDecimalsAndString,
    fixingANumberToTwoDecimals,
    transactionInfoForUpdate,
    setTransactionInfoForUpdate,
  } = useContext(TransactionsContext);
  const { amount } = transactionInfoForUpdate;
  const stringedAmount = fixingANumberToTwoDecimalsAndString(amount);

  const { realIncomeForRequest, setRealIncomeForRequest } =
    useContext(RealIncomeContext);
  const { earned_amount } = realIncomeForRequest;

  const stringedRealIncomeAmount =
    fixingANumberToTwoDecimalsAndString(earned_amount);

  const [amountToSet, setAmountToSet] = useState(
    String(
      `$${
        comingFrom === "AnyTransactionDetailsView"
          ? stringedAmount
          : stringedRealIncomeAmount
      }`
    )
  );

  console.log("REAL INCOME AMOUNT TO SET AT LOGIC:", stringedRealIncomeAmount);

  const cta_action = (navigation, comingFrom) => {
    if (comingFrom === "AnyTransactionDetailsView") {
      setTransactionInfoForUpdate({
        ...transactionInfoForUpdate,
        amount: fixingANumberToTwoDecimals(amountToSet.slice(1)),
      });
      navigation.navigate("Transaction_details_view");
    }
    if (comingFrom === "Select_week_view") {
      setRealIncomeForRequest({
        ...realIncomeForRequest,
        earned_amount: fixingANumberToTwoDecimals(amountToSet.slice(1)),
      });
      navigation.navigate("income_details_view");
    }
  };

  const formatCurrency = (value) => {
    const digits = value.replace(/[^0-9]/g, "");

    if (!digits) {
      setAmountToSet("");
      return;
    }

    let formattedValue = "." + digits.padStart(1, "");
    if (digits.length > 5) {
      formattedValue =
        digits.slice(0, -5) +
        "," +
        digits.slice(-5, -2) +
        "." +
        digits.slice(-2);
    } else if (digits.length > 2) {
      formattedValue = digits.slice(0, -2) + "." + digits.slice(-2);
    }
    setAmountToSet("$" + formattedValue);
  };

  const clearingText = () => {
    setAmountToSet("");
  };
  return {
    cta_action,
    setAmountToSet,
    amountToSet,
    clearingText,
    formatCurrency,
  };
};
