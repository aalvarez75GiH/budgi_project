import React from "react";
import { PixelRatio } from "react-native";

import { FlexibleContainer } from "../../containers/flexible_container";
import { theme } from "../../../infrastructure/theme";
import { ChartContainer } from "./circular_chart.styles";
import { DonutChartComponent } from "../../../Views/home/donut_chart.component";

export const CircularChartComponent = ({
  totalTransactionsAmountOnDemand,
  percentageCompleted,
  totalAmountBudgeted,
  radius,
  amount_font,
  smallerFont,
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
          mainAmountTextToRender={totalTransactionsAmountOnDemand}
          smallerFont={smallerFont}
          color={theme.colors.ui.p_142223C}
          amount_font={amount_font}
          totalAmountBudgeted={totalAmountBudgeted}
        />
      </ChartContainer>
      <ChartContainer radius={radius}>
        <DonutChartComponent
          backgroundColor={theme.colors.ui.s_FFFFFF}
          radius={PixelRatio.roundToNearestPixel(radius)}
          strokeWidth={16}
          percentageComplete={percentageCompleted}
          mainAmountTextToRender={totalTransactionsAmountOnDemand}
          amount_font={amount_font}
          smallerFont={smallerFont}
          color={theme.colors.ui.success}
          totalAmountBudgeted={totalAmountBudgeted}
        />
      </ChartContainer>
    </FlexibleContainer>
  );
};
