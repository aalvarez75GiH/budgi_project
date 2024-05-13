import React from "react";
import { Skia, Canvas, Path, Text } from "@shopify/react-native-skia";
import { Button, Easing, StyleSheet, View } from "react-native";
import * as d3 from "d3";

import { SafeArea } from "../../global_components/safe-area.component";
import { theme } from "../../infrastructure/theme";
const fontFamily = theme.fonts.bold;

export const DonutChartComponent = ({
  radius,
  strokeWidth,
  percentageComplete,
  mainAmountTextToRender,
  color,
  smallerFont,
  amount_font,
  totalAmountBudgeted,
}) => {
  const innerRadius = radius - strokeWidth / 2;

  const targetTextFixed = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(mainAmountTextToRender);

  const totalAmountBudgetedFixed = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(totalAmountBudgeted);

  const path = Skia.Path.Make();
  path.addCircle(radius, radius, innerRadius);

  //   const width = font.getTextWidth(targetText);
  //   const titleWidth = smallerFont.getTextWidth("Power");
  return (
    <View style={styles.container}>
      <Canvas style={styles.container}>
        <Text
          x={innerRadius - 100 / 2}
          y={radius - 40}
          text={"You have spent"}
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
          x={innerRadius - 140 / 2}
          //   y={radius + strokeWidth}
          y={radius + 8}
          text={targetTextFixed}
          font={amount_font}
          opacity={percentageComplete}
          color={theme.colors.ui.p_142223C}
        />
        <Text
          x={innerRadius - 140 / 2}
          y={radius + 50}
          text={`Budgeted: ${totalAmountBudgetedFixed}`}
          //   text={`Budgeted: $1,700.00`}
          font={smallerFont}
          opacity={percentageComplete}
          color={theme.colors.ui.p_142223C}
        />
      </Canvas>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "red",
  },
});
