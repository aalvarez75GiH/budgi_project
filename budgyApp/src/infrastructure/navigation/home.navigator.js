import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Home } from "../../Views/home/home.view";
import { SelectCategoryView } from "../../Views/home/select_category.view";
import { TransactionConfirmationView } from "../../Views/home/transaction_confirmation.view";
import { TransactionSummaryView } from "../../Views/home/transaction_summary.view";

import { AccountAndThingsView } from "../../Views/home/account_and_things.view";
import { MyTransactionsView } from "../../Views/home/myTransactions.view";
import { CalendarView } from "../../Views/home/calendar.view";
import { AddDescriptionView } from "../../Views/home/add_description.view";
// import { HowMonthIsGoingView } from "../../Views/home/how_your_month_goes";

const HomeStack = createNativeStackNavigator();

export const HomeNavigator = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen name="Categories" component={SelectCategoryView} />
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
      {/* <HomeStack.Screen
        name="How month is going"
        component={HowMonthIsGoingView}
        options={{ animation: "slide_from_right" }}
        // options={{ gestureDirection: "horizontal-inverted" }}
      /> */}

      <HomeStack.Screen
        name="Calendar_view"
        component={CalendarView}
        options={{ animation: "slide_from_right" }}
        // options={{ gestureDirection: "horizontal-inverted" }}
      />

      <HomeStack.Screen
        name="AddDescription_view"
        component={AddDescriptionView}
        options={{ animation: "slide_from_right" }}
        // options={{ gestureDirection: "horizontal-inverted" }}
      />
    </HomeStack.Navigator>
  );
};
