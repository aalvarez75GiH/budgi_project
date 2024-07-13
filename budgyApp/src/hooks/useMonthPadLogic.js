import { useContext, useState } from "react";

import { DateOperationsContext } from "../infrastructure/services/date_operations/date_operations.context";
import { TransactionsContext } from "../infrastructure/services/transactions/transactions.context";
import { CategoryDataContext } from "../infrastructure/services/category_data/category_data.context";

export const useMonthPadLogic = () => {
  const {
    setMonthSelected,
    month_selected,
    settingMonthYearForRequest,
    month_year,
    monthsUntilNow,
  } = useContext(DateOperationsContext);

  const {
    gettingTransactions_byUserID_MonthYear_onDemand,
    isLoading,
    getting_transactions_budgeted_and_real_income_totalAmounts,
  } = useContext(TransactionsContext);

  const {
    gettingCategoryData_onDemand,
    isLoadingCategoryDataContext,
    selectingCategory,
  } = useContext(CategoryDataContext);

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
    // setCategorySelected(null);
    // selectingCategory();
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
      await gettingCategoryData_onDemand(month_year_onDemand);

      // setCategory_data_onDemand(categoriesData(index));
      //   console.log("RESPONSE AT MONTHS PAD VIEW:", response);
      // setTotalTransactionsAmountOnDemand(response.transactions_total_amount);
      // setTotalAmountBudgeted(response.totalBudgeted);
      // setRealIncomeTotalAmountOnDemand(response.realIncomeTotalAmount);
      navigation.goBack();
    }
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
