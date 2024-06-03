import { useState, useContext } from "react";

import { TransactionsContext } from "../infrastructure/services/transactions/transactions.context";
import { CategoryDataContext } from "../infrastructure/services/category_data/category_data.context";
import { DateOperationsContext } from "../infrastructure/services/date_operations/date_operations.context";
import { RealIncomeContext } from "../infrastructure/services/real_income/real_income.context";
import { AuthenticationContext } from "../infrastructure/services/authentication/authentication.context";

export const useHowYourMonthGoesLogic = () => {
  //   ***** DATA FROM AUTHENTICATION CONTEXT
  const { user } = useContext(AuthenticationContext);
  const { user_id } = user;
  //   console.log("USER_ID:", user_id);

  //   ***** DATA FROM TRANSACTIONS CONTEXT
  const {
    total_amount,
    getting_transactions_budgeted_and_real_income_totalAmounts,
  } = useContext(TransactionsContext);

  //   ***** DATA FROM CATEGORY DATA CONTEXT
  const { categoryData } = useContext(CategoryDataContext);
  const { total_amount_budgeted } = categoryData;

  //   ***** DATA FROM DATE OPERATIONS CONTEXT
  const { month_year, setMonthSelected, month_name } = useContext(
    DateOperationsContext
  );

  //   ***** DATA FROM REAL INCOME CONTEXT
  const { realIncomeTotalAmount } = useContext(RealIncomeContext);

  const [isSpinnerLoading, setIsSpinnerLoading] = useState(false);
  const [tile_selected, set_tile_selected] = useState("Spent vs budgeted");
  const [month_year_toRender, set_month_year_toRender] = useState(month_year);
  const [totalTransactionsAmountOnDemand, setTotalTransactionsAmountOnDemand] =
    useState(
      totalTransactionsAmountOnDemand
        ? totalTransactionsAmountOnDemand
        : total_amount
    );
  const [totalAmountBudgeted, setTotalAmountBudgeted] = useState(
    totalAmountBudgeted ? totalAmountBudgeted : total_amount_budgeted
  );
  const [realIncomeTotalAmountOnDemand, setRealIncomeTotalAmountOnDemand] =
    useState(
      realIncomeTotalAmountOnDemand
        ? realIncomeTotalAmountOnDemand
        : realIncomeTotalAmount
    );

  //   ***** THIS FUNCTION DOES THE MATH TO GET PERCENTAGE COMPLETED AND OVER SPENT AMOUNTS *****
  //   ***** THIS IS NEEDED FOR THE CIRCULAR BAR CHART *****

  const switchingOptions = (option) => {
    setIsSpinnerLoading(true);
    setTimeout(() => {
      setIsSpinnerLoading(false);
    }, 800);
    set_tile_selected(option);
  };

  const movingForwardToMonthsPadView = (navigation) => {
    navigation.navigate("Months_Pad_View", {
      user_id,
      set_month_year_toRender,
      comingFrom: "HowMonthIsGoingView",
      setTotalTransactionsAmountOnDemand,
      setTotalAmountBudgeted,
      setRealIncomeTotalAmountOnDemand,
    });
  };

  const amountsMathLogic = () =>
    // tile_selected,
    // totalAmountBudgeted,
    // totalTransactionsAmountOnDemand,
    // realIncomeTotalAmountOnDemand
    {
      //   console.log("TOTAL AMOUNT BUDGETED AT HOOK:", totalAmountBudgeted);
      //   console.log(
      //     "TOTAL TRANSACTIONS AMOUNT ON DEMAND AT HOOK:",
      //     totalTransactionsAmountOnDemand
      //   );
      //   console.log(
      //     "REAL INCOME TOTAL AMOUNT ON DEMAND AT HOOK:",
      //     realIncomeTotalAmountOnDemand
      //   );
      //   console.log("TILE SELECTED AT HOOK:", tile_selected);
      let percentageCompleted;
      let overSpentAmountInNegative;
      let overSpentAmountInPositive;
      if (tile_selected === "Spent vs budgeted") {
        if (totalAmountBudgeted > totalTransactionsAmountOnDemand) {
          percentageCompleted =
            (totalTransactionsAmountOnDemand * 100) / totalAmountBudgeted / 100;
        }
        if (totalAmountBudgeted < totalTransactionsAmountOnDemand) {
          overSpentAmountInNegative =
            totalAmountBudgeted - totalTransactionsAmountOnDemand;
          overSpentAmountInPositive =
            totalTransactionsAmountOnDemand - totalAmountBudgeted;
          //   console.log("TEST:", overSpentAmountInPositive);
          percentageCompleted = overSpentAmountInPositive / totalAmountBudgeted;
        }
      }
      if (tile_selected === "Spent vs income") {
        if (realIncomeTotalAmountOnDemand > totalTransactionsAmountOnDemand) {
          percentageCompleted =
            (totalTransactionsAmountOnDemand * 100) /
            realIncomeTotalAmountOnDemand /
            100;
        }
        if (realIncomeTotalAmountOnDemand < totalTransactionsAmountOnDemand) {
          overSpentAmountInNegative =
            realIncomeTotalAmountOnDemand - totalTransactionsAmountOnDemand;
          overSpentAmountInPositive =
            totalTransactionsAmountOnDemand - realIncomeTotalAmountOnDemand;
          //   console.log("TEST:", overSpentAmountInPositive);
          percentageCompleted =
            overSpentAmountInPositive / realIncomeTotalAmountOnDemand;
        }
      }
      return {
        percentageCompleted,
        overSpentAmountInNegative,
      };
    };

  //   const animationState = useValue(0);

  //   const animateChart = () => {
  //     animationState.current = 0;
  //     runTiming(0, targetPercentage, {
  //       duration: 1250,
  //       easing: Easing.inOut(Easing.cubic),
  //     });
  //   };

  return {
    amountsMathLogic,
    switchingOptions,
    isSpinnerLoading,
    tile_selected,
    movingForwardToMonthsPadView,
    month_year_toRender,
    amountsMathLogic,
    getting_transactions_budgeted_and_real_income_totalAmounts,
    setTotalTransactionsAmountOnDemand,
    setTotalAmountBudgeted,
    setRealIncomeTotalAmountOnDemand,
    totalTransactionsAmountOnDemand,
    totalAmountBudgeted,
    realIncomeTotalAmountOnDemand,
    setMonthSelected,
    month_name,
    month_year,
    user_id,
  };
};
