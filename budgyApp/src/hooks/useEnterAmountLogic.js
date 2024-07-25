import { useContext, useState } from "react";
import { TransactionsContext } from "../infrastructure/services/transactions/transactions.context";
import { RealIncomeContext } from "../infrastructure/services/real_income/real_income.context";
import { ExpectedIncomeContext } from "../infrastructure/services/expected _income/expected_income.context";
import { DateOperationsContext } from "../infrastructure/services/date_operations/date_operations.context";

export const useEnterAmountLogic = (comingFrom) => {
  console.log("COMING FROM:", comingFrom);

  const {
    fixingANumberToTwoDecimalsAndString,
    fixingANumberToTwoDecimals,
    transactionInfoForUpdate,
    setTransactionInfoForUpdate,
    setReadyToUpdate,
  } = useContext(TransactionsContext);
  const { amount } = transactionInfoForUpdate;
  const stringedAmount = fixingANumberToTwoDecimalsAndString(amount);

  const { realIncomeForRequest, setRealIncomeForRequest } =
    useContext(RealIncomeContext);
  const { earned_amount } = realIncomeForRequest;

  const stringedRealIncomeAmount =
    fixingANumberToTwoDecimalsAndString(earned_amount);

  const { expectedIncomeForRequest, setExpectedIncomeForRequest } = useContext(
    ExpectedIncomeContext
  );
  const { new_expected_income } = expectedIncomeForRequest;
  const { amount: new_expected_income_amount } = new_expected_income;

  const { setMonthSelected, month_name } = useContext(DateOperationsContext);
  console.log(
    "EXPECTED INCOME FOR REQUEST AT ENTER AMOUNT LOGIC:",
    JSON.stringify(expectedIncomeForRequest, null, 2)
  );

  console.log(
    "EXPECTED INCOME AMOUNT AT ENTER AMOUNT LOGIC:",
    JSON.stringify(new_expected_income_amount, null, 2)
  );

  const stringedExpectedIncomeAmount = fixingANumberToTwoDecimalsAndString(
    new_expected_income_amount
  );
  const [amountToSet, setAmountToSet] = useState(
    String(
      `$${
        comingFrom === "AnyTransactionDetailsView"
          ? stringedAmount
          : comingFrom === "Select_week_view"
          ? stringedRealIncomeAmount
          : stringedExpectedIncomeAmount
      }`
    )
  );

  console.log("REAL INCOME AMOUNT TO SET AT LOGIC:", stringedRealIncomeAmount);

  const cta_action = (navigation, comingFrom) => {
    console.log("COMING FROM AT CTA ACTION FUNCTION:", comingFrom);
    if (comingFrom === "AnyTransactionDetailsView") {
      setTransactionInfoForUpdate({
        ...transactionInfoForUpdate,
        // amount: fixingANumberToTwoDecimals(amountToSet.slice(1)),
        amount: parseFloat(amountToSet.replace(/[^0-9.]/g, "")),
      });
      setReadyToUpdate(true);
      navigation.navigate("Transaction_details_view", {
        comingFrom: comingFrom,
      });
    }
    if (comingFrom === "Select_week_view") {
      setRealIncomeForRequest({
        ...realIncomeForRequest,
        // earned_amount: fixingANumberToTwoDecimals(amountToSet.slice(1)),
        earned_amount: parseFloat(amountToSet.replace(/[^0-9.]/g, "")),
      });
      // navigation.navigate("income_details_view");
      navigation.navigate("income_details_view", {
        comingFrom: comingFrom,
      });
    }
    if (comingFrom === "comingFromCash") {
      setRealIncomeForRequest({
        ...realIncomeForRequest,
        earned_amount: parseFloat(amountToSet.replace(/[^0-9.]/g, "")),
      });
      navigation.navigate("income_details_view", {
        comingFrom: comingFrom,
      });
    }
    if (comingFrom === "addExpectedIncomeTile") {
      setExpectedIncomeForRequest({
        ...expectedIncomeForRequest,
        new_expected_income: {
          // amount: fixingANumberToTwoDecimals(amountToSet.slice(1)),
          amount: parseFloat(amountToSet.replace(/[^0-9.]/g, "")),
          month_year: expectedIncomeForRequest.new_expected_income.month_year,
          // month_year: "NOV 2024",
          updated: true,
        },
      });
      navigation.navigate("income_details_view", {
        comingFrom: comingFrom,
      });
    }
  };

  console.log(
    "EXPECTED INCOME FOR REQUEST AT ENTER AMOUNT LOGIC:",
    JSON.stringify(expectedIncomeForRequest, null, 2)
  );

  const formatCurrency = (value) => {
    const digits = value.replace(/[^0-9]/g, "");

    if (!digits) {
      setAmountToSet("");
      return;
    }

    // Convert digits string to a number then back to string to remove leading zeros
    let number = parseInt(digits, 10).toString();

    // Ensure the number has at least 3 digits (to correctly insert the decimal point)
    number = number.padStart(3, "0");

    // Insert the decimal point two places from the end
    let formattedValue = number.slice(0, -2) + "." + number.slice(-2);

    // Insert commas for thousands, millions, etc.
    formattedValue = formattedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    console.log("FORMATTED VALUE:", formattedValue);
    setAmountToSet("$" + formattedValue);
  };

  const clearingText = () => {
    setAmountToSet("");
  };

  const exitingToRoot = (navigation) => {
    setMonthSelected(month_name);
    // cleaningState();
    navigation.popToTop();
  };
  return {
    cta_action,
    setAmountToSet,
    amountToSet,
    clearingText,
    formatCurrency,
    exitingToRoot,
  };
};
