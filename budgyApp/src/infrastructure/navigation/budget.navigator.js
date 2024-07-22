import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { BudgetView } from "../../Views/budgets/budget.view";
import { MonthsPadView } from "../../Views/general_views/months_pad.view";
import { TransactionsView } from "../../Views/general_views/transactions.view";
import { GeneralNewNameView } from "../../Views/general_views/general_new__name.view";
import { AnyTransactionDetailsView } from "../../Views/general_views/any_transaction_details.view";
import { EnterAmountView } from "../../Views/general_views/enter_amount.view";
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
      <BudgetStack.Screen
        name="Transactions_View"
        component={TransactionsView}
        options={{ animation: "slide_from_right" }}
      />
      <BudgetStack.Screen
        name="New_category_name_View"
        component={GeneralNewNameView}
        options={{ animation: "slide_from_right" }}
      />
      <BudgetStack.Screen
        name="Transaction_details_view"
        component={AnyTransactionDetailsView}
        options={{ animation: "slide_from_right" }}
        // options={{ gestureDirection: "horizontal-inverted" }}
      />

      <BudgetStack.Screen
        name="Enter_amount_view"
        component={EnterAmountView}
        options={{ animation: "slide_from_right" }}
        // options={{ gestureDirection: "horizontal-inverted" }}
      />
    </BudgetStack.Navigator>
  );
};
