export const useMathLogic = () => {
  const mathForHowYourMonthGoesViewOptions = (
    tile_selected,
    totalAmountBudgeted,
    totalTransactionsAmountOnDemand,
    realIncomeTotalAmountOnDemand
  ) => {
    console.log("TOTAL AMOUNT BUDGETED AT HOOK:", totalAmountBudgeted);
    console.log(
      "TOTAL TRANSACTIONS AMOUNT ON DEMAND AT HOOK:",
      totalTransactionsAmountOnDemand
    );
    console.log(
      "REAL INCOME TOTAL AMOUNT ON DEMAND AT HOOK:",
      realIncomeTotalAmountOnDemand
    );
    console.log("TILE SELECTED AT HOOK:", tile_selected);
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
        console.log("TEST:", overSpentAmountInPositive);
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
        console.log("TEST:", overSpentAmountInPositive);
        percentageCompleted =
          overSpentAmountInPositive / realIncomeTotalAmountOnDemand;
      }
    }
    return {
      percentageCompleted,
      overSpentAmountInNegative,
    };
  };

  return {
    mathForHowYourMonthGoesViewOptions,
  };
};
