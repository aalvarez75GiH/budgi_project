import React from "react";
import { PixelRatio, Platform } from "react-native";

import { FlexibleContainer } from "../../containers/flexible_container";
import { theme } from "../../../infrastructure/theme";
import { ChartContainer } from "./circular_chart.styles";
import { BudgetsDonutChartComponent } from "./budgets_donut_chart.component";
import { IsLoadingContainer } from "../../containers/isLoading_container";
import { Text } from "../../../infrastructure/typography/text.component";

export const BudgetsCircularChartComponent = ({
  primaryAmount,
  secondaryAmount,
  percentageCompleted,
  secondaryLabel,
  overSpentAmountInNegative,
  isSpinnerLoading,
}) => {
  console.log("OVER SPENT AMOUNT:", overSpentAmountInNegative);
  const radius = PixelRatio.roundToNearestPixel(120);

  return (
    <FlexibleContainer
      color={theme.colors.bg.p_FFFFFF}
      // color={"blue"}
      direction="row"
      flexibility={0.4}
      justify={"center"}
      isBordered={false}
    >
      {isSpinnerLoading && Platform.OS === "android" && (
        <Text text_variant="neutral_bold_text_14">Loading...</Text>
      )}
      {isSpinnerLoading && Platform.OS === "ios" && (
        <IsLoadingContainer
          size="medium"
          color={theme.colors.brand.primary}
          caption=""
        ></IsLoadingContainer>
      )}
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
