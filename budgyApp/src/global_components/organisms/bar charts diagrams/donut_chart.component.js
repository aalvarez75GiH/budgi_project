import React from "react";
import { Skia, Path, Text, useFont } from "@shopify/react-native-skia";
import { Easing } from "react-native";
// import * as d3 from "d3";

import { SafeArea } from "../../safe-area.component";
import { theme } from "../../../infrastructure/theme";
import { GeneralFlexContainer } from "../../containers/general_flex_container";
import { CanvasContainer } from "./circular_chart.styles";
const fontFamily = theme.fonts.bold;

export const DonutChartComponent = ({
  radius,
  strokeWidth,
  percentageComplete,
  primaryAmount,
  secondaryAmount,
  color,
  secondaryLabel,
  overSpentAmountInNegative,
}) => {
  const innerRadius = radius - strokeWidth / 2;

  const primaryAmountFixed = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(primaryAmount);

  console.log("OVER SPENT:", overSpentAmountInNegative);
  const secondaryAmountFixed = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(secondaryAmount);

  const path = Skia.Path.Make();
  path.addCircle(radius, radius, innerRadius);

  //   const width = font.getTextWidth(targetText);
  //   const titleWidth = smallerFont.getTextWidth("Power");

  const amount_font = useFont(
    require("../../../../assets/fonts/DMSans_700Bold.ttf"),
    40
  );
  const smallerFont = useFont(
    require("../../../../assets/fonts/DMSans_700Bold.ttf"),
    16
  );

  return (
    <GeneralFlexContainer>
      <CanvasContainer>
        <Text
          x={
            overSpentAmountInNegative
              ? innerRadius - 150 / 2
              : innerRadius - 100 / 2
          }
          y={radius - 40}
          text={
            overSpentAmountInNegative ? "You have over spent" : "You have spent"
          }
          font={smallerFont}
          opacity={percentageComplete}
          color={theme.colors.ui.p_142223C}
        />
        <Path
          path={path}
          color={color}
          style="stroke"
          strokeWidth={strokeWidth}
          strokeCap="round"
          start={0}
          end={percentageComplete}
        />

        <Text
          x={
            overSpentAmountInNegative
              ? innerRadius - 170 / 2
              : innerRadius - 140 / 2
          }
          //   y={radius + strokeWidth}
          y={radius + 8}
          text={
            overSpentAmountInNegative
              ? new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(overSpentAmountInNegative)
              : primaryAmountFixed
          }
          font={amount_font}
          opacity={percentageComplete}
          color={theme.colors.ui.p_142223C}
        />
        <Text
          x={innerRadius - 140 / 2}
          y={radius + 50}
          text={`${secondaryLabel} ${secondaryAmountFixed}`}
          // text={`Budgeted: ${totalAmountBudgetedFixed}`}
          font={smallerFont}
          opacity={percentageComplete}
          color={theme.colors.ui.p_142223C}
        />
      </CanvasContainer>
    </GeneralFlexContainer>
  );
};
