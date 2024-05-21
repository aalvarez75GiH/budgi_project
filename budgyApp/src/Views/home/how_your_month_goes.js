import React, { useContext, useState, useEffect } from "react";

import { Platform, PixelRatio } from "react-native";

import { ExitHeaderWithMonthsOptionButtonComponent } from "../../global_components/organisms/headers/exit+month_option_button.header";
import { theme } from "../../infrastructure/theme";
import { GeneralFlexContainer } from "../../global_components/containers/general_flex_container";
import { FlexibleContainer } from "../../global_components/containers/flexible_container";
import { CircularChartComponent } from "../../global_components/organisms/bar charts diagrams/circular_chart.component";
import { CenteredTextTile } from "../../global_components/organisms/tiles/centered_text_tile";
import { CenteredTextTileWithIcon } from "../../global_components/organisms/tiles/centered_text_with_icon_tile";
import { useHowYourMonthGoesLogic } from "../../hooks/useHowYourMonthGoesLogic";

import { TransactionsContext } from "../../infrastructure/services/transactions/transactions.context";
import { CategoryDataContext } from "../../infrastructure/services/category_data/category_data.context";
import { DateOperationsContext } from "../../infrastructure/services/date_operations/date_operations.context";
import { AuthenticationContext } from "../../infrastructure/services/authentication/authentication.context";
import { RealIncomeContext } from "../../infrastructure/services/real_income/real_income.context";

export const HowMonthIsGoingView = ({ navigation }) => {
  //   *****************************************************************************************************
  const { amountsMathLogic } = useHowYourMonthGoesLogic();
  const {
    total_amount,
    getting_transactions_budgeted_and_real_income_totalAmounts,
  } = useContext(TransactionsContext);

  //   ***** Category List context consumption
  const { categoryData } = useContext(CategoryDataContext);
  const { total_amount_budgeted } = categoryData;

  //   ***** Date Operations context consumption
  const { month_year, setMonthSelected, month_name } = useContext(
    DateOperationsContext
  );

  //   ***** Authentication context consumption
  const { user } = useContext(AuthenticationContext);
  const { user_id } = user;
  console.log("USER_ID:", user_id);
  // ******** Real Income context consumption ********************
  const { realIncomeTotalAmount } = useContext(RealIncomeContext);

  // ******************* STATES ********************************
  const [tile_selected, set_tile_selected] = useState("Spent vs budgeted");
  const [isSpinnerLoading, setIsSpinnerLoading] = useState(false);
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

  useEffect(() => {
    return () => {
      const settingTransactionsTotalAmountAndTotalBudgeted = async () => {
        setMonthSelected(month_name);
        const response =
          await getting_transactions_budgeted_and_real_income_totalAmounts(
            user_id,
            month_year
          );
        //console.log("RESPONSE AT MONTHS PAD VIEW:", response);
        setTotalTransactionsAmountOnDemand(response.transactions_total_amount);
        setTotalAmountBudgeted(response.totalBudgeted);
        setRealIncomeTotalAmountOnDemand(response.realIncomeTotalAmount);
      };
      settingTransactionsTotalAmountAndTotalBudgeted();
    };
  }, []);

  console.log("TOTAL REAL INCOME AMOUNT:", realIncomeTotalAmountOnDemand);
  //   *****************************************************************************************************

  //   const animationState = useValue(0);

  //   const animateChart = () => {
  //     animationState.current = 0;
  //     runTiming(0, targetPercentage, {
  //       duration: 1250,
  //       easing: Easing.inOut(Easing.cubic),
  //     });
  //   };

  const { percentageCompleted, overSpentAmountInNegative } = amountsMathLogic(
    tile_selected,
    totalAmountBudgeted,
    totalTransactionsAmountOnDemand,
    realIncomeTotalAmountOnDemand
  );

  const movingForwardToMonthsPadView = () => {
    navigation.navigate("Months_Pad_View", {
      user_id,
      set_month_year_toRender,
      comingFrom: "HowMonthIsGoingView",
      setTotalTransactionsAmountOnDemand,
      setTotalAmountBudgeted,
      setRealIncomeTotalAmountOnDemand,
    });
  };

  const switchingOptions = (option) => {
    setIsSpinnerLoading(true);
    setTimeout(() => {
      setIsSpinnerLoading(false);
    }, 800);
    set_tile_selected(option);
  };

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
        action={movingForwardToMonthsPadView}
      />

      <FlexibleContainer
        color={theme.colors.bg.p_FFFFFF}
        // color={"lightblue"}
        direction="row"
        flexibility={Platform.OS === "ios" ? 0.32 : 0.37}
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
