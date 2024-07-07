import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Home } from "../../Views/home/home.view";
import { BudgetView } from "../../Views/budgets/budget.view";
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

      {/* <BudgetStack.Screen
        name="General_select_category_view"
        component={GeneralSelectCategoryView}
        options={{ animation: "slide_from_right" }}
        // options={{ gestureDirection: "horizontal-inverted" }}
      /> */}
    </BudgetStack.Navigator>
  );
};
