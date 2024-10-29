import { useContext, useState } from "react";

import { TransactionsContext } from "../infrastructure/services/transactions/transactions.context";
import { RealIncomeContext } from "../infrastructure/services/real_income/real_income.context";
import { ExpectedIncomeContext } from "../infrastructure/services/expected _income/expected_income.context";
import { DateOperationsContext } from "../infrastructure/services/date_operations/date_operations.context";
import { CategoryListContext } from "../infrastructure/services/category_list/category_list.context";
import { CategoryDataContext } from "../infrastructure/services/category_data/category_data.context";
import { HomeContext } from "../infrastructure/services/Home services/home.context";

export const useEnterAmountLogic = (comingFrom) => {
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
    category_list_info_forRequest,
    // action_to_do,
    setCategory_list_info_forUpdate,
    category_list_info_forUpdate,
    categoryListContextStateReset,
  } = useContext(CategoryListContext);

  const {
    action_to_do,
    updateBillInfoForRequest,
    createBillInfoForRequest,
    setUpdateBillInfoForRequest,
    setCreateBillInfoForRequest,
  } = useContext(HomeContext);
  const { bill_amount: bill_amount_toUpdate } = updateBillInfoForRequest;
  const { bill_amount: bill_amount_toCreate } = createBillInfoForRequest;
  const stringed_bill_amount_toUpdate =
    fixingANumberToTwoDecimalsAndString(bill_amount_toUpdate);

  const stringed_bill_amount_toCreate =
    fixingANumberToTwoDecimalsAndString(bill_amount_toCreate);

  const { new_limit_amount: limit_amount_of_update_category } =
    category_list_info_forUpdate;

  const { new_expense_category_node } = category_list_info_forRequest;
  const { limit_amount: limit_amount_of_new_category } =
    new_expense_category_node;

  const stringedNewCategoryLimitAmount = fixingANumberToTwoDecimalsAndString(
    limit_amount_of_new_category
  );
  const stringedUpdateCategoryLimitAmount = fixingANumberToTwoDecimalsAndString(
    limit_amount_of_update_category
  );

  const stringedCategoryLimitAmount =
    action_to_do === "new_expense_category"
      ? stringedNewCategoryLimitAmount
      : stringedUpdateCategoryLimitAmount;

  const stringedExpectedIncomeAmount = fixingANumberToTwoDecimalsAndString(
    new_expected_income_amount
  );

  const {
    categoryDataInfoForMoneyTransfer,
    setCategoryDataInfoForMoneyTransfer,
  } = useContext(CategoryDataContext);

  const { transmitter_available_amount } = categoryDataInfoForMoneyTransfer;
  const stringedTransmitter_available_amount =
    fixingANumberToTwoDecimalsAndString(transmitter_available_amount);

  const [transferAmountError, setTransferAmountError] = useState("");
  const [amountToSet, setAmountToSet] = useState(
    String(
      `$${
        comingFrom === "AnyTransactionDetailsView"
          ? stringedAmount
          : comingFrom === "Select_week_view"
          ? stringedRealIncomeAmount
          : comingFrom === "GeneralNewNameView" ||
            comingFrom === "suspendedCategoryButton"
          ? stringedCategoryLimitAmount
          : comingFrom === "positive_avail_amount_categories_view"
          ? stringedTransmitter_available_amount
          : comingFrom === "create_bill_name_view"
          ? stringed_bill_amount_toCreate
          : comingFrom === "update_bill_name_view"
          ? stringed_bill_amount_toUpdate
          : stringedExpectedIncomeAmount
      }`
    )
  );

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
    if (comingFrom === "suspendedCategoryButton") {
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
    if (comingFrom === "positive_avail_amount_categories_view") {
      const amountToSetNumeric = parseFloat(
        amountToSet.replace(/[^0-9.]/g, "")
      );
      if (amountToSetNumeric > transmitter_available_amount) {
        console.log(
          `AMOUNT: ${amountToSet} IS GREATER THAN AMOUNT AVAILABLE: ${transmitter_available_amount}`
        );
        setTransferAmountError(
          `Amount entered is greater than available amount`
        );
      }
      if (amountToSetNumeric <= transmitter_available_amount) {
        setCategoryDataInfoForMoneyTransfer({
          ...categoryDataInfoForMoneyTransfer,
          transmitter_available_amount: amountToSetNumeric,
        });
        navigation.navigate("transfer_money_summary_view", {
          comingFrom: "positive_avail_amount_categories_view",
        });
      }
    }
    if (comingFrom === "create_bill_name_view") {
      setCreateBillInfoForRequest({
        ...createBillInfoForRequest,
        bill_amount: parseFloat(amountToSet.replace(/[^0-9.]/g, "")),
      });
      navigation.navigate("bill_payment_day_view", {
        comingFrom: "TransactionSummaryView",
      });
    }
    if (comingFrom === "update_bill_name_view") {
      setUpdateBillInfoForRequest({
        ...updateBillInfoForRequest,
        bill_amount: parseFloat(amountToSet.replace(/[^0-9.]/g, "")),
      });
      navigation.navigate("bill_payment_day_view", {
        comingFrom: "TransactionSummaryView",
      });
    }
  };
  console.log(
    "UPDATE BILL INFO FOR REQUEST AT ENTER AMOUNT LOGIC:",
    JSON.stringify(updateBillInfoForRequest, null, 2)
  );
  console.log(
    "CREATE BILL INFO FOR REQUEST AT ENTER AMOUNT LOGIC:",
    JSON.stringify(createBillInfoForRequest, null, 2)
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
    setTransferAmountError("");
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
    transferAmountError,
    transmitter_available_amount,
  };
};
