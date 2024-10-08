import { useContext, useState } from "react";

import { useMyTransactionsLogic } from "./useMyTransactionsLogic";

import { DateOperationsContext } from "../infrastructure/services/date_operations/date_operations.context";
import { TransactionsContext } from "../infrastructure/services/transactions/transactions.context";
import { CategoryDataContext } from "../infrastructure/services/category_data/category_data.context";
import { CategoryListContext } from "../infrastructure/services/category_list/category_list.context";

export const useMonthPadLogic = () => {
  const {
    setMonthSelected,
    month_selected,
    settingMonthYearForRequest,
    month_year,
    monthsUntilNow,
  } = useContext(DateOperationsContext);

  const { packagingAndFilteringTransactionsAndAmountByCategoryBudget } =
    useMyTransactionsLogic();
  const { firstCategoryDataExpenseCategories } =
    useContext(CategoryListContext);
  const {
    gettingTransactions_byUserID_MonthYear_onDemand,
    isLoading,
    getting_transactions_budgeted_and_real_income_totalAmounts,
    transactionsByMonthYear,
    transactionsToRenderForBudgets,
  } = useContext(TransactionsContext);

  const { gettingCategoryData_onDemand, isLoadingCategoryDataContext } =
    useContext(CategoryDataContext);

  const [isChosen, setIsChosen] = useState({
    month_selected: month_selected,
    isActive: true,
  });
  const [month_year_onDemand, setMonthYearOnDemand] = useState(month_year);

  const selectingMonth = (month, set_month_year_toRender) => {
    const month_year_for_request = settingMonthYearForRequest(month);
    setIsChosen({ month_selected: month, isActive: true });
    setMonthSelected(month);
    setMonthYearOnDemand(month_year_for_request);
    set_month_year_toRender(month_year_for_request);
  };
  // *********************************************************************

  const confirmingIfMonthIsEnabled = (month) => {
    return monthsUntilNow.includes(month);
  };

  // *********************************************************************

  const cta_action = async (
    navigation,
    comingFrom,
    user_id,
    setTotalTransactionsAmountOnDemand,
    setTotalAmountBudgeted,
    setRealIncomeTotalAmountOnDemand
  ) => {
    console.log("COMING FROM AT MONTH PAD LOGIC:", comingFrom);
    if (comingFrom === "MyTransactionsView") {
      await gettingTransactions_byUserID_MonthYear_onDemand(
        user_id,
        month_year_onDemand
      );
      navigation.goBack();
    }
    if (comingFrom === "HowMonthIsGoingView") {
      const response =
        await getting_transactions_budgeted_and_real_income_totalAmounts(
          user_id,
          month_year_onDemand
        );
      //   console.log("RESPONSE AT MONTHS PAD VIEW:", response);
      setTotalTransactionsAmountOnDemand(response.transactions_total_amount);
      setTotalAmountBudgeted(response.totalBudgeted);
      setRealIncomeTotalAmountOnDemand(response.realIncomeTotalAmount);
      navigation.goBack();
    }
    if (comingFrom === "BudgetsView") {
      console.log(
        "MONTH YEAR ON DEMAND AT MONTH PAD LOGIC:",
        month_year_onDemand
      );
      try {
        await gettingCategoryData_onDemand(month_year_onDemand);
        await gettingTransactions_byUserID_MonthYear_onDemand(
          user_id,
          month_year_onDemand
        );
      } catch (error) {
        console.log("ERROR AT MONTH PAD LOGIC:", error);
      }
      // console.log(
      //   "TRANSACTIONS BY MONTH YEAR INSIDE CTA ACTION:",
      //   transactionsByMonthYear
      // );
      // console.log(
      //   "TRANSACTIONS TO RENDER FOR BUDGETS INSIDE CTA ACTION:",
      //   transactionsToRenderForBudgets
      // );
      // packagingAndFilteringTransactionsAndAmountByCategoryBudget(
      //   firstCategoryDataExpenseCategories.category_id,
      //   transactionsToRenderForBudgets
      // );

      navigation.goBack();
    }
    // console.log(
    //   "TRANSACTIONS BY MONTH YEAR OUTSIDE CTA ACTION:",
    //   transactionsByMonthYear
    // );
    // console.log(
    //   "TRANSACTIONS TO RENDER FOR BUDGETS OUTSIDESIDE CTA ACTION:",
    //   transactionsToRenderForBudgets
    // );
  };
  return {
    selectingMonth,
    isChosen,
    cta_action,
    isLoading,
    setMonthSelected,
    setMonthYearOnDemand,
    settingMonthYearForRequest,
    month_selected,
    month_year_onDemand,
    confirmingIfMonthIsEnabled,
    isLoadingCategoryDataContext,
  };
};
