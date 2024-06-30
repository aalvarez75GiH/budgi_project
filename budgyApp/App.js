import React from "react";
import "react-native-reanimated";
import { ThemeProvider } from "styled-components/native";
// import { useFonts } from "expo-font";

import { theme } from "./src/infrastructure/theme";
import { AuthenticationContextProvider } from "./src/infrastructure/services/authentication/authentication.context";
import { NumPadContextProvider } from "./src/infrastructure/services/numPad/numPad.context";
import { TransactionContextProvider } from "./src/infrastructure/services/transactions/transactions.context";
import { CategoryListContextProvider } from "./src/infrastructure/services/category_list/category_list.context";
import { DateOperationsContextProvider } from "./src/infrastructure/services/date_operations/date_operations.context";
import { CategoryDataContextProvider } from "./src/infrastructure/services/category_data/category_data.context";
import { RealIncomeContextProvider } from "./src/infrastructure/services/real_income/real_income.context";
import { ExpectedIncomeContextProvider } from "./src/infrastructure/services/expected _income/expected_income.context";

import { Navigation } from "./src/infrastructure/navigation";
// ***************************************************
import {
  useFonts as useRegDMS,
  DMSans_400Regular,
} from "@expo-google-fonts/dm-sans";

import {
  useFonts as useBoldDMS,
  DMSans_700Bold,
} from "@expo-google-fonts/dm-sans";
// ***************************************************

export default function App() {
  const [dmSansRegularLoaded] = useRegDMS({
    DMSans_400Regular,
  });
  const [dmSansBoldLoaded] = useBoldDMS({
    DMSans_700Bold,
  });

  if (!dmSansRegularLoaded || !dmSansBoldLoaded) {
    return null;
  }

  // ***************************************************
  // const [fontsLoaded] = useFonts({
  //   "DMSans_400Regular": require("./assets/fonts/DMSans-Regular.ttf"),
  //   "DMSans_700Bold": require("./assets/fonts/DMSans-Bold.ttf"),
  // });

  // if (!fontsLoaded) {
  //   return null;
  // }

  return (
    <>
      <ThemeProvider theme={theme}>
        <AuthenticationContextProvider>
          <DateOperationsContextProvider>
            <NumPadContextProvider>
              <TransactionContextProvider>
                <CategoryListContextProvider>
                  <CategoryDataContextProvider>
                    <RealIncomeContextProvider>
                      <ExpectedIncomeContextProvider>
                        <Navigation />
                      </ExpectedIncomeContextProvider>
                    </RealIncomeContextProvider>
                  </CategoryDataContextProvider>
                </CategoryListContextProvider>
              </TransactionContextProvider>
            </NumPadContextProvider>
          </DateOperationsContextProvider>
        </AuthenticationContextProvider>
      </ThemeProvider>
    </>
  );
}
