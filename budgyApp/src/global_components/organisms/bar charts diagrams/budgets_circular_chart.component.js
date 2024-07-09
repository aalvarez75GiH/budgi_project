import React from "react";
import { PixelRatio } from "react-native";

import { FlexibleContainer } from "../../containers/flexible_container";
import { theme } from "../../../infrastructure/theme";
import { ChartContainer } from "./circular_chart.styles";
import { DonutChartComponent } from "./donut_chart.component";
import { BudgetsDonutChartComponent } from "./budgets_donut_chart.component";
import { IsLoadingContainer } from "../../containers/isLoading_container";

export const BudgetsCircularChartComponent = ({
  primaryAmount,
  secondaryAmount,
  percentageCompleted,
  secondaryLabel,
  overSpentAmountInNegative,
  isSpinnerLoading,
}) => {
  console.log("OVER SPENT AMOUNT:", overSpentAmountInNegative);
  const radius = PixelRatio.roundToNearestPixel(130);
  return (
    <FlexibleContainer
      color={theme.colors.bg.p_FFFFFF}
      // color={"lightblue"}
      direction="row"
      flexibility={0.4}
      justify={"center"}
      isBordered={false}
    >
      {isSpinnerLoading ? (
        <IsLoadingContainer
          size="medium"
          color={theme.colors.brand.primary}
          caption=""
        >
          {/* <Text text_variant="bold_text_16">Loading...</Text> */}
        </IsLoadingContainer>
      ) : null}
      {!isSpinnerLoading ? (
        <>
          <ChartContainer radius={radius}>
            <BudgetsDonutChartComponent
              backgroundColor={theme.colors.ui.s_FFFFFF}
              radius={radius}
              strokeWidth={12}
              percentageComplete={1}
              primaryAmount={primaryAmount}
              secondaryAmount={secondaryAmount}
              color={theme.colors.bg.s_142223C}
              secondaryLabel={secondaryLabel}
              overSpentAmountInNegative={overSpentAmountInNegative}
            />
          </ChartContainer>
          <ChartContainer radius={radius}>
            <BudgetsDonutChartComponent
              backgroundColor={theme.colors.ui.s_FFFFFF}
              radius={radius}
              strokeWidth={12}
              percentageComplete={percentageCompleted}
              primaryAmount={primaryAmount}
              secondaryAmount={secondaryAmount}
              //   color={theme.colors.ui.error_cancels}
              color={
                overSpentAmountInNegative < 0
                  ? theme.colors.ui.error_cancels
                  : theme.colors.ui.success
              }
              secondaryLabel={secondaryLabel}
              overSpentAmountInNegative={overSpentAmountInNegative}
            />
          </ChartContainer>
        </>
      ) : null}
    </FlexibleContainer>
  );
};
