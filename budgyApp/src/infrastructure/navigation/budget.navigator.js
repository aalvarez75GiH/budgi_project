import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { BudgetView } from "../../Views/budgets/budget.view";
import { MonthsPadView } from "../../Views/general_views/months_pad.view";
import { TransactionsView } from "../../Views/general_views/transactions.view";
import { GeneralNewNameView } from "../../Views/general_views/general_new__name.view";
import { AnyTransactionDetailsView } from "../../Views/general_views/any_transaction_details.view";
import { EnterAmountView } from "../../Views/general_views/enter_amount.view";
import { TransactionsByCategoryView } from "../../Views/budgets/transactions_by_category.view";
import { GeneralSelectCategoryView } from "../../Views/general_views/select_category.view";
import { GeneralCalendarView } from "../../Views/general_views/calendar.view";
import { GeneralAddDescriptionView } from "../../Views/general_views/add_description.view";
import { CancelDeleteConfirmationView } from "../../Views/general_views/cancel_delete_confirmation.view";
import { EnterAmountWithOptionsView } from "../../Views/budgets/enter_amount_with_options.view";
import { NewOrUpdateCategorySummaryView } from "../../Views/budgets/new_update_category_summary.view";
import { Home } from "../../Views/home/home.view";
import { NewOrUpdateCategoryConfirmationView } from "../../Views/budgets/new_update_category_confirmation";

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
        name="Transactions_by_category_View"
        component={TransactionsByCategoryView}
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
      <BudgetStack.Screen
        name="General_select_category_view"
        component={GeneralSelectCategoryView}
        options={{ animation: "slide_from_right" }}
        // options={{ gestureDirection: "horizontal-inverted" }}
      />
      <BudgetStack.Screen
        name="General_calendar_view"
        component={GeneralCalendarView}
        options={{ animation: "slide_from_right" }}
        // options={{ gestureDirection: "horizontal-inverted" }}
      />
      <BudgetStack.Screen
        name="General_AddDescription_view"
        component={GeneralAddDescriptionView}
        options={{ animation: "slide_from_right" }}
        // options={{ gestureDirection: "horizontal-inverted" }}
      />
      <BudgetStack.Screen
        name="Delete_confirmation_view"
        component={CancelDeleteConfirmationView}
        options={{ animation: "slide_from_right" }}
        // options={{ gestureDirection: "horizontal-inverted" }}
      />
      <BudgetStack.Screen
        name="Enter_amount_with_options_view"
        component={EnterAmountWithOptionsView}
        options={{ animation: "slide_from_right" }}
        // options={{ gestureDirection: "horizontal-inverted" }}
      />
      <BudgetStack.Screen
        name="New_category_summary_view"
        component={NewOrUpdateCategorySummaryView}
        options={{ animation: "slide_from_right" }}
        // options={{ gestureDirection: "horizontal-inverted" }}
      />
      <BudgetStack.Screen
        name="New_category_confirmation_view"
        component={NewOrUpdateCategoryConfirmationView}
        options={{ animation: "slide_from_right" }}
        // options={{ gestureDirection: "horizontal-inverted" }}
      />
    </BudgetStack.Navigator>
  );
};
