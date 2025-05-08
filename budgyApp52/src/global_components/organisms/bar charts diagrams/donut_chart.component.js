import React from "react";
import { Skia, Path, Text, useFont } from "@shopify/react-native-skia";
import { Easing } from "react-native";
// import * as d3 from "d3";

import { theme } from "../../../infrastructure/theme";
import { GeneralFlexContainer } from "../../containers/general_flex_container";
import { CanvasContainer } from "./circular_chart.styles";

export const DonutChartComponent = ({
  radius,
  strokeWidth,
  percentageComplete,
  primaryAmount,
  secondaryAmount,
  color,
  secondaryLabel,
  overSpentAmountInNegative,
  thirdLabel,
}) => {
  console.log("OVER SPENT AMOUNT IN NEGATIVE:", overSpentAmountInNegative);
  const innerRadius = radius - strokeWidth / 2;
  // let primaryAmount = 1300.16;
  const primaryAmountFixed = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(primaryAmount);

  // console.log("OVER SPENT:", overSpentAmountInNegative);
  const secondaryAmountFixed = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(secondaryAmount);

  const path = Skia.Path.Make();
  path.addCircle(radius, radius, innerRadius);

  //   const titleWidth = smallerFont.getTextWidth("Power");

  const amount_font = useFont(
    require("../../../../assets/fonts/DMSans_700Bold.ttf"),
    40
  );
  const smallerFont = useFont(
    require("../../../../assets/fonts/DMSans_700Bold.ttf"),
    16
  );
  const primary_amount_width = amount_font
    ? amount_font.getTextWidth(primaryAmountFixed)
    : 0;
  const secondary_amount_width = smallerFont
    ? smallerFont.getTextWidth(secondaryAmountFixed)
    : 0;

  return (
    <GeneralFlexContainer>
      <CanvasContainer>
        <Text
          x={
            overSpentAmountInNegative
              ? innerRadius - secondary_amount_width / 1
              : innerRadius - secondary_amount_width / 1.4
          }
          y={radius - 40}
          text={"You have spent"}
          // text={
          //   overSpentAmountInNegative ? "You have over spent" : "You have spent"
          // }
          font={smallerFont}
          opacity={1}
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
          // x={innerRadius - primary_amount_width / 2.1}
          x={
            overSpentAmountInNegative
              ? innerRadius - primary_amount_width / 2.1
              : innerRadius - primary_amount_width / 2.1
          }
          y={radius + 8}
          text={primaryAmountFixed}
          // text={
          //   overSpentAmountInNegative
          //     ? new Intl.NumberFormat("en-US", {
          //         style: "currency",
          //         currency: "USD",
          //       }).format(overSpentAmountInNegative)
          //     : primaryAmountFixed
          // }
          font={amount_font}
          opacity={1}
          color={theme.colors.ui.p_142223C}
        />
        {overSpentAmountInNegative < 0 && (
          <Text
            x={innerRadius - secondary_amount_width / 1.02}
            y={radius + 50}
            // text={`${thirdLabel} ${secondaryAmountFixed}`}
            text={`${thirdLabel} ${overSpentAmountInNegative}`}
            font={smallerFont}
            opacity={1}
            color={theme.colors.ui.p_142223C}
          />
        )}
        {
          // overSpentAmountInNegative > 0 &&
          overSpentAmountInNegative === undefined && (
            <Text
              x={innerRadius - secondary_amount_width / 1.1}
              y={radius + 70}
              text={`${secondaryLabel} ${secondaryAmountFixed}`}
              font={smallerFont}
              opacity={1}
              color={theme.colors.ui.p_142223C}
            />
          )
        }
      </CanvasContainer>
    </GeneralFlexContainer>
  );
};
