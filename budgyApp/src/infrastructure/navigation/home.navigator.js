import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Home } from "../../Views/home/home.view";
import { TransactionConfirmationView } from "../../Views/home/transaction_confirmation.view";
import { TransactionSummaryView } from "../../Views/home/transaction_summary.view";

import { AccountAndThingsView } from "../../Views/home/account_and_things.view";
import { MyTransactionsView } from "../../Views/home/myTransactions.view";
import { GeneralCalendarView } from "../../Views/general_views/calendar.view";
import { GeneralAddDescriptionView } from "../../Views/general_views/add_description.view";
import { GeneralSelectCategoryView } from "../../Views/general_views/select_category.view";
import { AnyTransactionDetailsView } from "../../Views/general_views/any_transaction_details.view";
import { EnterAmountView } from "../../Views/general_views/enter_amount.view";
import { CancelDeleteConfirmationView } from "../../Views/general_views/cancel_delete_confirmation.view";
import { MonthsPadView } from "../../Views/general_views/months_pad.view";
import { HowMonthIsGoingView } from "../../Views/home/how_your_month_goes";
import { BillsToPayListView } from "../../Views/home/bills_to_pay_list.view";
import { GeneralNewNameView } from "../../Views/general_views/general_new__name.view";
import { BillsPaymentDayView } from "../../Views/home/bills_payment_day.view";

const HomeStack = createNativeStackNavigator();

export const HomeNavigator = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <HomeStack.Screen name="HomeView" component={Home} />

      <HomeStack.Screen
        name="General_select_category_view"
        component={GeneralSelectCategoryView}
        options={{ animation: "slide_from_right" }}
        // options={{ gestureDirection: "horizontal-inverted" }}
      />

      <HomeStack.Screen
        name="Transaction_summary"
        component={TransactionSummaryView}
      />
      <HomeStack.Screen
        name="Transaction_confirmation"
        component={TransactionConfirmationView}
      />
      <HomeStack.Screen
        name="Menu"
        component={AccountAndThingsView}
        options={{ animation: "slide_from_left" }}
        // options={{ gestureDirection: "horizontal-inverted" }}
      />
      <HomeStack.Screen
        name="My transactions"
        component={MyTransactionsView}
        options={{ animation: "slide_from_right" }}
        // options={{ gestureDirection: "horizontal-inverted" }}
      />
      <HomeStack.Screen
        name="How month is going"
        component={HowMonthIsGoingView}
        options={{ animation: "slide_from_right" }}
        // options={{ gestureDirection: "horizontal-inverted" }}
      />

      <HomeStack.Screen
        name="General_calendar_view"
        component={GeneralCalendarView}
        options={{ animation: "slide_from_right" }}
        // options={{ gestureDirection: "horizontal-inverted" }}
      />

      <HomeStack.Screen
        name="General_AddDescription_view"
        component={GeneralAddDescriptionView}
        options={{ animation: "slide_from_right" }}
        // options={{ gestureDirection: "horizontal-inverted" }}
      />
      <HomeStack.Screen
        name="Transaction_details_view"
        component={AnyTransactionDetailsView}
        options={{ animation: "slide_from_right" }}
        // options={{ gestureDirection: "horizontal-inverted" }}
      />
      <HomeStack.Screen
        name="Enter_amount_view"
        component={EnterAmountView}
        options={{ animation: "slide_from_right" }}
        // options={{ gestureDirection: "horizontal-inverted" }}
      />
      <HomeStack.Screen
        name="Delete_confirmation_view"
        component={CancelDeleteConfirmationView}
        options={{ animation: "slide_from_right" }}
        // options={{ gestureDirection: "horizontal-inverted" }}
      />
      <HomeStack.Screen
        name="Months_Pad_View"
        component={MonthsPadView}
        options={{ animation: "slide_from_right" }}
        // options={{ gestureDirection: "horizontal-inverted" }}
      />
      <HomeStack.Screen
        name="Bills_to_pay_View"
        component={BillsToPayListView}
        options={{ animation: "slide_from_right" }}
        // options={{ gestureDirection: "horizontal-inverted" }}
      />
      <HomeStack.Screen
        name="bill_name_view"
        component={GeneralNewNameView}
        options={{ animation: "slide_from_right" }}
        // options={{ gestureDirection: "horizontal-inverted" }}
      />
      <HomeStack.Screen
        name="bill_payment_day_view"
        component={BillsPaymentDayView}
        options={{ animation: "slide_from_right" }}
        // options={{ gestureDirection: "horizontal-inverted" }}
      />
    </HomeStack.Navigator>
  );
};
