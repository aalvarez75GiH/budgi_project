import { useState, useContext } from "react";

import { TransactionsContext } from "../infrastructure/services/transactions/transactions.context";
import { CategoryDataContext } from "../infrastructure/services/category_data/category_data.context";
import { DateOperationsContext } from "../infrastructure/services/date_operations/date_operations.context";
import { RealIncomeContext } from "../infrastructure/services/real_income/real_income.context";
import { AuthenticationContext } from "../infrastructure/services/authentication/authentication.context";
import { HomeContext } from "../infrastructure/services/Home services/home.context";

export const useHowYourMonthGoesLogic = () => {
  //   ***** DATA FROM AUTHENTICATION CONTEXT
  const { user } = useContext(AuthenticationContext);
  const { user_id } = user;

  //   ***** DATA FROM TRANSACTIONS CONTEXT
  const {
    total_amount,
    getting_transactions_budgeted_and_real_income_totalAmounts,
  } = useContext(TransactionsContext);

  //   ***** DATA FROM CATEGORY DATA CONTEXT
  const { categoryData } = useContext(CategoryDataContext);

  //   ***** DATA FROM DATE OPERATIONS CONTEXT
  const { month_year, setMonthSelected, month_name } = useContext(
    DateOperationsContext
  );

  //   ***** DATA FROM REAL INCOME CONTEXT
  const { realIncomeTotalAmount } = useContext(RealIncomeContext);

  //   ***** DATA FROM HOME CONTEXT CONTEXT
  const { billsSelectedTotalAmount, setIsLoadingBillRequest } =
    useContext(HomeContext);

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
    totalAmountBudgeted
      ? totalAmountBudgeted
      : categoryData.total_amount_budgeted
  );
  const [realIncomeTotalAmountOnDemand, setRealIncomeTotalAmountOnDemand] =
    useState(
      realIncomeTotalAmountOnDemand
        ? realIncomeTotalAmountOnDemand
        : realIncomeTotalAmount
    );

  //   ***** THIS IS WHERE HOW MONTH GOES TILES ARE SWITCHED *****
  const switchingOptions = (option) => {
    console.log("OPTION AT SWITCHING:", option);
    setIsSpinnerLoading(true);
    setIsLoadingBillRequest(true);
    setTimeout(() => {
      setIsSpinnerLoading(false);
      setIsLoadingBillRequest(false);
      set_tile_selected(option);
    }, 800);
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

  //   ***** THIS FUNCTION DOES THE MATH TO GET PERCENTAGE COMPLETED AND OVER SPENT AMOUNTS FOR HOW MONTH GOES BAR CHARTS *****
  const amountsMathLogic = () => {
    console.log("TILE SELECTED SWITCHING:", tile_selected);

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
    if (tile_selected === "Spent + bills vs income") {
      if (
        realIncomeTotalAmountOnDemand >
        totalTransactionsAmountOnDemand + billsSelectedTotalAmount
      ) {
        percentageCompleted =
          ((totalTransactionsAmountOnDemand + billsSelectedTotalAmount) * 100) /
          realIncomeTotalAmountOnDemand /
          100;
        overSpentAmountInNegative = 0;
      }
      if (
        realIncomeTotalAmountOnDemand <
        totalTransactionsAmountOnDemand + billsSelectedTotalAmount
      ) {
        overSpentAmountInNegative =
          realIncomeTotalAmountOnDemand -
          (totalTransactionsAmountOnDemand + billsSelectedTotalAmount);
        overSpentAmountInPositive =
          totalTransactionsAmountOnDemand +
          billsSelectedTotalAmount -
          realIncomeTotalAmountOnDemand;
        percentageCompleted =
          overSpentAmountInPositive / realIncomeTotalAmountOnDemand;
      }
    }

    return {
      percentageCompleted,
      overSpentAmountInNegative,
    };
  };

  const amountMathLogicForBillsPlusSpentVsIncome = (option) => {
    const realIncomeTotalAmount = realIncomeTotalAmountOnDemand;
    console.log(
      "REAL INCOME TOTAL AMOUNT FOR MONTH ON DEMAND:",
      realIncomeTotalAmount
    );
    const totalTransactionsAmount = totalTransactionsAmountOnDemand;
    console.log(
      "TOTAL TRANSACTIONS AMOUNT FOR MONTH ON DEMAND:",
      totalTransactionsAmount
    );
    const billsTotalAmount = billsSelectedTotalAmount;
    console.log("BILLS TOTAL AMOUNT FOR MONTH ON DEMAND:", billsTotalAmount);
    set_tile_selected(option);
    let percentageCompleted;
    let overSpentAmountInNegative;
    let overSpentAmountInPositive;
    if (
      realIncomeTotalAmount >
      totalTransactionsAmount + billsSelectedTotalAmount
    ) {
      percentageCompleted =
        ((totalTransactionsAmount + billsSelectedTotalAmount) * 100) /
        realIncomeTotalAmount /
        100;
      overSpentAmountInNegative = 0;
    }
    if (
      realIncomeTotalAmount <
      totalTransactionsAmount + billsSelectedTotalAmount
    ) {
      overSpentAmountInNegative =
        realIncomeTotalAmountOnDemand -
        (totalTransactionsAmount + billsSelectedTotalAmount);
      overSpentAmountInPositive =
        totalTransactionsAmount +
        billsSelectedTotalAmount -
        realIncomeTotalAmount;
      percentageCompleted = overSpentAmountInPositive / realIncomeTotalAmount;
    }
    return {
      percentageCompleted,
      overSpentAmountInNegative,
    };
  };

  return {
    amountsMathLogic,
    switchingOptions,
    setIsSpinnerLoading,
    isSpinnerLoading,
    tile_selected,
    set_tile_selected,
    movingForwardToMonthsPadView,
    month_year_toRender,
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
    amountMathLogicForBillsPlusSpentVsIncome,
  };
};
