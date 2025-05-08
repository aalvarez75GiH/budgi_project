import React, { useEffect } from "react";
import { Skia, Path, Text, useFont } from "@shopify/react-native-skia";
import {
  useSharedValue,
  useDerivedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { theme } from "../../../infrastructure/theme";
import { GeneralFlexContainer } from "../../containers/general_flex_container";
import { CanvasContainer } from "./circular_chart.styles";

import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from "react-native-reanimated";

// This is the default configuration

export const BudgetsDonutChartComponent = ({
  radius,
  strokeWidth,
  percentageComplete,
  primaryAmount,
  secondaryAmount,
  color,
  secondaryLabel,
  overSpentAmountInNegative,
}) => {
  console.log("COLOR AT DONUT:", color);
  console.log("PRIMARY AMOUNT AT DONUT:", primaryAmount);
  console.log("SECONDARY AMOUNT AT DONUT:", secondaryAmount);
  console.log("OVER SPENT IN NEGATIVE AT DONUT:", overSpentAmountInNegative);
  console.log("RADIUS AT DONUT:", radius);
  console.log("STROKE WIDTH AT DONUT:", strokeWidth);
  console.log("PERCENTAGE COMPLETE AT DONUT:", percentageComplete);
  console.log("SECONDARY LABEL AT DONUT:", secondaryLabel);

  configureReanimatedLogger({
    level: ReanimatedLogLevel.warn,
    strict: false, // Reanimated runs in strict mode by default
  });

  const innerRadius = radius - strokeWidth / 2;
  const primaryAmountFixed = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(primaryAmount);

  const secondaryAmountFixed = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(secondaryAmount);

  const overSpentAmountInNegativeFixed = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(overSpentAmountInNegative);
  // const path = Skia.Path.Make();
  // path.addCircle(radius, radius, innerRadius);
  const path = Skia.Path.MakeFromSVGString("M 344 172 Q 344 167 343.793 163");
  const progress = useSharedValue(0.5);

  useEffect(() => {
    if (path) {
      path.addCircle(radius, radius, innerRadius);
    }
  }, [path, radius, innerRadius]);
  const animatedStyle = useAnimatedStyle(() => {
    if (path) {
      return {
        transform: [{ interpolate: path.interpolate(path, progress.value) }],
      };
    }
    return {};
  });

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

  try {
    return (
      <CanvasContainer>
        <Text
          x={
            overSpentAmountInNegative
              ? innerRadius - primary_amount_width / 2.9
              : innerRadius - primary_amount_width / 2.8
          }
          y={radius - 40}
          text={"You have spent"}
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
          x={
            overSpentAmountInNegative
              ? innerRadius - primary_amount_width / 2.1
              : innerRadius - primary_amount_width / 2.1
          }
          y={radius + 8}
          text={primaryAmountFixed}
          font={amount_font}
          opacity={1}
          color={theme.colors.ui.p_142223C}
        />

        <Text
          //   x={innerRadius - secondary_amount_width / 1}
          x={
            overSpentAmountInNegative
              ? innerRadius - secondary_amount_width / 0.8
              : innerRadius - secondary_amount_width / 1.05
          }
          y={radius + 50}
          text={`${secondaryLabel} ${
            overSpentAmountInNegative
              ? overSpentAmountInNegativeFixed
              : secondaryAmountFixed
          }`}
          font={smallerFont}
          opacity={1}
          color={theme.colors.ui.p_142223C}
        />
      </CanvasContainer>
    );
  } catch (error) {
    console.error("Error rendering Skia Canvas:", error);
  }
};
