import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { IncomeView } from "../../Views/income/income.view";
import { AmountsMonthsPadView } from "../../Views/general_views/amounts_months_pad.view";
import { SelectWorkAppView } from "../../Views/income/select_work_app.view";
import { SelectWeekView } from "../../Views/income/select_week.view";
import { EnterAmountView } from "../../Views/general_views/enter_amount.view";
import { IncomeDetailsView } from "../../Views/income/income_details.view";
import { IncomeConfirmationView } from "../../Views/income/income_confirmation.view";

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
      <IncomeStack.Screen
        name="Select_work_app_view"
        component={SelectWorkAppView}
        options={{ animation: "slide_from_right" }}
      />
      <IncomeStack.Screen
        name="Select_week_view"
        component={SelectWeekView}
        options={{ animation: "slide_from_right" }}
      />
      <IncomeStack.Screen
        name="Enter_amount_view"
        component={EnterAmountView}
        options={{ animation: "slide_from_right" }}
      />
      <IncomeStack.Screen
        name="income_details_view"
        component={IncomeDetailsView}
        options={{ animation: "slide_from_right" }}
      />
      <IncomeStack.Screen
        name="income_confirmation_view"
        component={IncomeConfirmationView}
        options={{ animation: "slide_from_right" }}
      />
    </IncomeStack.Navigator>
  );
};
