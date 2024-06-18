import React, { useEffect } from "react";

import { Platform } from "react-native";

import { ExitHeaderWithMonthsOptionButtonComponent } from "../../global_components/organisms/headers/exit+month_option_button.header";
import { theme } from "../../infrastructure/theme";
import { GeneralFlexContainer } from "../../global_components/containers/general_flex_container";
import { FlexibleContainer } from "../../global_components/containers/flexible_container";
import { CircularChartComponent } from "../../global_components/organisms/bar charts diagrams/circular_chart.component";
import { CenteredTextTileWithIcon } from "../../global_components/organisms/tiles/centered_text_with_icon_tile";
import { useHowYourMonthGoesLogic } from "../../hooks/useHowYourMonthGoesLogic";

export const HowMonthIsGoingView = ({ navigation }) => {
  //   *****************************************************************************************************
  const {
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
  } = useHowYourMonthGoesLogic();
  const { percentageCompleted, overSpentAmountInNegative } = amountsMathLogic();

  useEffect(() => {
    return () => {
      const settingTransactionsTotalAmountAndTotalBudgeted = async () => {
        setMonthSelected(month_name);
        const response =
          await getting_transactions_budgeted_and_real_income_totalAmounts(
            user_id,
            month_year
          );
        console.log(
          "RESPONSE AT HOW YOUR MONTH  GOES:",
          JSON.stringify(response.transactions_total_amount, null, 2)
        );
        setTotalTransactionsAmountOnDemand(response.transactions_total_amount);
        setTotalAmountBudgeted(response.totalBudgeted);
        setRealIncomeTotalAmountOnDemand(response.realIncomeTotalAmount);
      };
      settingTransactionsTotalAmountAndTotalBudgeted();
    };
  }, []);

  return (
    <GeneralFlexContainer>
      <ExitHeaderWithMonthsOptionButtonComponent
        navigation={navigation}
        direction={"column"}
        color={theme.colors.bg.p_FFFFFF}
        // color={"#FAA"}
        flexibility={0.12}
        month_year_toRender={month_year_toRender}
        month_year={month_year}
        action={() => movingForwardToMonthsPadView(navigation)}
      />

      <FlexibleContainer
        color={theme.colors.bg.p_FFFFFF}
        // color={"lightblue"}
        direction="row"
        flexibility={Platform.OS === "ios" ? 0.42 : 0.37}
        justify={"center"}
        isBordered={false}
      >
        {tile_selected === "Spent vs budgeted" && (
          <CircularChartComponent
            primaryAmount={totalTransactionsAmountOnDemand}
            secondaryAmount={totalAmountBudgeted}
            percentageCompleted={percentageCompleted}
            secondaryLabel="Budgeted:"
            overSpentAmountInNegative={overSpentAmountInNegative}
            isSpinnerLoading={isSpinnerLoading}
          />
        )}

        {tile_selected === "Spent vs income" && (
          <CircularChartComponent
            primaryAmount={totalTransactionsAmountOnDemand}
            secondaryAmount={realIncomeTotalAmountOnDemand}
            percentageCompleted={percentageCompleted}
            secondaryLabel="Income: "
            overSpentAmountInNegative={overSpentAmountInNegative}
            isSpinnerLoading={isSpinnerLoading}
          />
        )}
      </FlexibleContainer>
      <FlexibleContainer
        color={theme.colors.neutrals.e2_F5F5F5}
        // color={"lightblue"}
        direction="column"
        // flexibility={0.185}
        flexibility={Platform.OS === "ios" ? 0.165 : 0.185}
        justify={"center"}
        isBordered={false}
      >
        <CenteredTextTileWithIcon
          caption={"Spent vs budgeted"}
          navigation={navigation}
          icon_name={"ThinCheckIcon"}
          active_icon={true}
          action={() => switchingOptions("Spent vs budgeted")}
          tile_selected={tile_selected}
        />
        <CenteredTextTileWithIcon
          caption={"Spent vs income"}
          navigation={navigation}
          icon_name={"ThinCheckIcon"}
          active_icon={false}
          action={() => switchingOptions("Spent vs income")}
          tile_selected={tile_selected}
        />
      </FlexibleContainer>
    </GeneralFlexContainer>
  );
};
