import React, { useContext, useState, useEffect } from "react";
import {
  Button,
  Easing,
  StyleSheet,
  View,
  PixelRatio,
  TouchableOpacity,
  Text,
} from "react-native";
import { useFont, runTiming, useValue } from "@shopify/react-native-skia";

import { SafeArea } from "../../global_components/safe-area.component";
import { ExitHeaderComponent } from "../../global_components/organisms/headers/exit_header.component";
import { theme } from "../../infrastructure/theme";
import { DonutChartComponent } from "./donut_chart.component";
import { GeneralFlexContainer } from "../../global_components/containers/general_flex_container";
import { FlexibleContainer } from "../../global_components/containers/flexible_container";

import { TransactionsContext } from "../../infrastructure/services/transactions/transactions.context";
import { CategoryDataContext } from "../../infrastructure/services/category_data/category_data.context";
import { DateOperationsContext } from "../../infrastructure/services/date_operations/date_operations.context";
import { AuthenticationContext } from "../../infrastructure/services/authentication/authentication.context";

const fontFamily = theme.fonts.bold;
const fontStyle = {
  fontFamily,
  fontSize: 14,
  fontWeight: "bold",
};
const radius = PixelRatio.roundToNearestPixel(130);
const STROKE_WIDTH = 16;

export const CircularChartView = ({ navigation }) => {
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
  const [totalAmountOnDemand, setTotalAmountOnDemand] = useState(
    totalAmountOnDemand ? totalAmountOnDemand : total_amount
  );
  const [totalAmountBudgeted, setTotalAmountBudgeted] = useState(
    totalAmountBudgeted ? totalAmountBudgeted : total_amount_budgeted
  );

  //   const [percentageCompleted, setPercentageCompleted] = useState(0);

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
        setTotalAmountOnDemand(response.transactions_total_amount);
        setTotalAmountBudgeted(response.totalBudgeted);
      };
      test();
    };
  }, []);
  //   *****************************************************************************************************

  //   const animationState = useValue(0);
  const targetPercentage = totalAmountOnDemand / 100;

  //   const animateChart = () => {
  //     animationState.current = 0;
  //     runTiming(0, targetPercentage, {
  //       duration: 1250,
  //       easing: Easing.inOut(Easing.cubic),
  //     });
  //   };

  const font = useFont(require("../../../assets/fonts/DMSans_700Bold.ttf"), 50);
  const amount_font = useFont(
    require("../../../assets/fonts/DMSans_700Bold.ttf"),
    40
  );
  const smallerFont = useFont(
    require("../../../assets/fonts/DMSans_700Bold.ttf"),
    16
  );

  const percentageCompletedBig =
    (totalAmountOnDemand * 100) / totalAmountBudgeted;
  const percentageCompleted = percentageCompletedBig / 100;

  console.log("PERCENTAGE COMPLETED:", percentageCompleted);

  return (
    <GeneralFlexContainer>
      <ExitHeaderComponent
        navigation={navigation}
        direction={"column"}
        color={theme.colors.bg.p_FFFFFF}
        // color={"#FAA"}
        flexibility={0.12}
      />
      <FlexibleContainer
        color={theme.colors.bg.p_FFFFFF}
        // color={"lightblue"}
        direction="row"
        flexibility={0.4}
        justify={"center"}
        isBordered={false}
      >
        <View style={styles.ringChartContainer}>
          <DonutChartComponent
            backgroundColor={theme.colors.ui.s_FFFFFF}
            radius={radius}
            strokeWidth={STROKE_WIDTH}
            percentageComplete={1}
            targetPercentage={targetPercentage}
            smallerFont={smallerFont}
            color={theme.colors.ui.p_142223C}
            amount_font={amount_font}
            totalAmountBudgeted={totalAmountBudgeted}
          />
        </View>
        <View style={styles.ringChartContainer}>
          <DonutChartComponent
            backgroundColor="white"
            radius={radius}
            strokeWidth={STROKE_WIDTH}
            percentageComplete={percentageCompleted}
            // percentageComplete={0.5}
            targetPercentage={targetPercentage}
            font={font}
            smallerFont={smallerFont}
            color={theme.colors.ui.success}
          />
        </View>
      </FlexibleContainer>
      <FlexibleContainer
        color={theme.colors.bg.p_FFFFFF}
        // color={"lightblue"}
        direction="row"
        flexibility={0.4}
        justify={"center"}
        isBordered={false}
      ></FlexibleContainer>
    </GeneralFlexContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  ringChartContainer: {
    position: "absolute",
    width: radius * 2,
    height: radius * 2,
  },

  button: {
    marginTop: 40,
    backgroundColor: "orange",
    paddingHorizontal: 60,
    paddingVertical: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
});
