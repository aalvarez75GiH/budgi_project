import { useContext, useState } from "react";
import { TransactionsContext } from "../infrastructure/services/transactions/transactions.context";
import { RealIncomeContext } from "../infrastructure/services/real_income/real_income.context";
import { ExpectedIncomeContext } from "../infrastructure/services/expected _income/expected_income.context";
import { DateOperationsContext } from "../infrastructure/services/date_operations/date_operations.context";
import { CategoryListContext } from "../infrastructure/services/category_list/category_list.context";

export const useEnterAmountLogic = (comingFrom) => {
  console.log("COMING FROM:", comingFrom);

  const {
    fixingANumberToTwoDecimalsAndString,
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

  const {
    setCategory_list_info_forRequest,
    action_to_do,
    setCategory_list_info_forUpdate,
    categoryListContextStateReset,
  } = useContext(CategoryListContext);
  console.log(
    "ACTION TO DO AT ENTER AMOUNT LOGIC:",
    JSON.stringify(action_to_do, null, 2)
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
    console.log(
      "ACTION TO DO AT ENTER AMOUNT LOGIC:",
      JSON.stringify(action_to_do, null, 2)
    );
    if (comingFrom === "AnyTransactionDetailsView") {
      setTransactionInfoForUpdate({
        ...transactionInfoForUpdate,
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
        earned_amount: parseFloat(amountToSet.replace(/[^0-9.]/g, "")),
      });
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
          amount: parseFloat(amountToSet.replace(/[^0-9.]/g, "")),
          month_year: expectedIncomeForRequest.new_expected_income.month_year,
          updated: true,
        },
      });
      navigation.navigate("income_details_view", {
        comingFrom: comingFrom,
      });
    }
    if (comingFrom === "GeneralNewNameView") {
      if (action_to_do === "new_expense_category") {
        setCategory_list_info_forRequest((prevState) => ({
          ...prevState,
          new_expense_category_node: {
            ...prevState.new_expense_category_node,
            limit_amount: parseFloat(amountToSet.replace(/[^0-9.]/g, "")),
          },
        }));
        navigation.navigate("New_category_summary_view", {
          comingFrom: comingFrom,
        });
      }
      if (action_to_do === "update_expense_category") {
        setCategory_list_info_forUpdate((prevState) => ({
          ...prevState,
          new_limit_amount: parseFloat(amountToSet.replace(/[^0-9.]/g, "")),
        }));
        navigation.navigate("New_category_summary_view", {
          comingFrom: comingFrom,
        });
      }
    }
  };

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
    navigation.popToTop();
  };
  return {
    cta_action,
    setAmountToSet,
    amountToSet,
    clearingText,
    formatCurrency,
    exitingToRoot,
    categoryListContextStateReset,
  };
};
