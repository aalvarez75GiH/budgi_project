import React from "react";
import { PixelRatio } from "react-native";

import { FlexibleContainer } from "../../containers/flexible_container";
import { theme } from "../../../infrastructure/theme";
import { ChartContainer } from "./circular_chart.styles";
import { DonutChartComponent } from "./donut_chart.component";

export const CircularChartComponent = ({
  primaryAmount,
  secondaryAmount,
  percentageCompleted,
  radius,
  secondaryLabel,
  overSpentAmountInNegative,
}) => {
  return (
    <FlexibleContainer
      color={theme.colors.bg.p_FFFFFF}
      // color={"lightblue"}
      direction="row"
      flexibility={0.4}
      justify={"center"}
      isBordered={false}
    >
      <ChartContainer radius={radius}>
        <DonutChartComponent
          backgroundColor={theme.colors.ui.s_FFFFFF}
          radius={PixelRatio.roundToNearestPixel(radius)}
          strokeWidth={16}
          percentageComplete={1}
          primaryAmount={primaryAmount}
          secondaryAmount={secondaryAmount}
          color={theme.colors.bg.s_142223C}
          secondaryLabel={secondaryLabel}
          overSpentAmountInNegative={overSpentAmountInNegative}
        />
      </ChartContainer>
      <ChartContainer radius={radius}>
        <DonutChartComponent
          backgroundColor={theme.colors.ui.s_FFFFFF}
          radius={PixelRatio.roundToNearestPixel(radius)}
          strokeWidth={16}
          percentageComplete={percentageCompleted}
          primaryAmount={primaryAmount}
          secondaryAmount={secondaryAmount}
          color={
            overSpentAmountInNegative
              ? theme.colors.ui.error_cancels
              : theme.colors.ui.success
          }
          secondaryLabel={secondaryLabel}
          overSpentAmountInNegative={overSpentAmountInNegative}
        />
      </ChartContainer>
    </FlexibleContainer>
  );
};
