import React, { useContext, useState, useEffect } from "react";

import { Platform } from "react-native";

import { ExitHeaderWithMonthsOptionButtonComponent } from "../../global_components/organisms/headers/exit+month_option_button.header";
import { theme } from "../../infrastructure/theme";
import { GeneralFlexContainer } from "../../global_components/containers/general_flex_container";
import { FlexibleContainer } from "../../global_components/containers/flexible_container";
import { CircularChartComponent } from "../../global_components/organisms/bar charts diagrams/circular_chart.component";
import { Spacer } from "../../global_components/optimized.spacer.component";
import { AccountAndThingsTile } from "../../global_components/organisms/tiles/account_and_things_tile";

import { TransactionsContext } from "../../infrastructure/services/transactions/transactions.context";
import { CategoryDataContext } from "../../infrastructure/services/category_data/category_data.context";
import { DateOperationsContext } from "../../infrastructure/services/date_operations/date_operations.context";
import { AuthenticationContext } from "../../infrastructure/services/authentication/authentication.context";

export const HowMonthIsGoingView = ({ navigation }) => {
  //   *****************************************************************************************************
  const {
    total_amount,
    gettingTransactionsTotalAmount_And_TotalAmountBudgeted_ByMonthYear_And_User_ID,
  } = useContext(TransactionsContext);

  //   ***** Category List context consumption
  const { categoryData } = useContext(CategoryDataContext);
  const { total_amount_budgeted } = categoryData;
  // console.log("EXPENSE CATEGORIES AT HOW_MONTH:", expense_categories);

  //   ***** Date Operations context consumption
  const { month_year, setMonthSelected, month_name } = useContext(
    DateOperationsContext
  );
  //   console.log("MONTH YEAR:", month_year);

  //   ***** Authentication context consumption
  const { user } = useContext(AuthenticationContext);
  const { user_id } = user;
  console.log("USER_ID:", user_id);

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

  useEffect(() => {
    return () => {
      const test = async () => {
        setMonthSelected(month_name);
        const response =
          await gettingTransactionsTotalAmount_And_TotalAmountBudgeted_ByMonthYear_And_User_ID(
            user_id,
            month_year
          );
        //console.log("RESPONSE AT MONTHS PAD VIEW:", response);
        setTotalTransactionsAmountOnDemand(response.transactions_total_amount);
        setTotalAmountBudgeted(response.totalBudgeted);
      };
      test();
    };
  }, []);
  //   *****************************************************************************************************

  //   const animationState = useValue(0);

  //   const animateChart = () => {
  //     animationState.current = 0;
  //     runTiming(0, targetPercentage, {
  //       duration: 1250,
  //       easing: Easing.inOut(Easing.cubic),
  //     });
  //   };

  let percentageCompleted;
  let overSpentAmountInNegative;
  let overSpentAmountInPositive;
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
  // (totalTransactionsAmountOnDemand * 100) / totalAmountBudgeted / 100;

  console.log("PERCENTAGE COMPLETED:", percentageCompleted);

  const movingForwardToMonthsPadView = () => {
    navigation.navigate("Months_Pad_View", {
      user_id,
      set_month_year_toRender,
      comingFrom: "HowMonthIsGoingView",
      setTotalTransactionsAmountOnDemand,
      setTotalAmountBudgeted,
    });
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
        flexibility={Platform.OS === "ios" ? 0.3 : 0.35}
        justify={"center"}
        isBordered={false}
      >
        <CircularChartComponent
          primaryAmount={totalTransactionsAmountOnDemand}
          secondaryAmount={totalAmountBudgeted}
          percentageCompleted={percentageCompleted}
          radius={130}
          secondaryLabel="Budgeted:"
          overSpentAmountInNegative={overSpentAmountInNegative}
        />
      </FlexibleContainer>
      <FlexibleContainer
        color={theme.colors.neutrals.e2_F5F5F5}
        // color={"lightblue"}
        direction="column"
        flexibility={0.185}
        justify={"center"}
        isBordered={false}
      >
        <AccountAndThingsTile
          caption={"Spent vs Budgeted"}
          navigation={navigation}
          icon_name={"TransactionsIcon"}
          active_icon={false}
          action={() => null}
        />
        <AccountAndThingsTile
          caption={"Spent vs income"}
          navigation={navigation}
          icon_name={"TransactionsIcon"}
          active_icon={false}
          action={() => null}
        />
      </FlexibleContainer>
    </GeneralFlexContainer>
  );
};
