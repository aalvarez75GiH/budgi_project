import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { IncomeView } from "../../Views/income/income.view";
import { AmountsMonthsPadView } from "../../Views/general_views/amounts_months_pad.view";

const IncomeStack = createNativeStackNavigator();

export const IncomeNavigator = () => {
  return (
    <IncomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <IncomeStack.Screen name="IncomeView" component={IncomeView} />

      <IncomeStack.Screen
        name="Amounts_months_pad_view"
        component={AmountsMonthsPadView}
        options={{ animation: "slide_from_right" }}
      />
    </IncomeStack.Navigator>
  );
};
