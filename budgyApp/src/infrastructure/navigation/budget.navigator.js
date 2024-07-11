import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Home } from "../../Views/home/home.view";
import { BudgetView } from "../../Views/budgets/budget.view";
import { MonthsPadView } from "../../Views/general_views/months_pad.view";
// import { GeneralSelectCategoryView } from "../../Views/general_views/select_category.view";

const BudgetStack = createNativeStackNavigator();

export const BudgetNavigator = () => {
  return (
    <BudgetStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <BudgetStack.Screen name="BudgetView" component={BudgetView} />

      <BudgetStack.Screen
        name="Months_Pad_View"
        component={MonthsPadView}
        options={{ animation: "slide_from_right" }}
      />
    </BudgetStack.Navigator>
  );
};
