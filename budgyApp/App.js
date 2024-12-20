import React from "react";
import "react-native-reanimated";
import { ThemeProvider } from "styled-components/native";

import { theme } from "./src/infrastructure/theme";
import { AuthenticationContextProvider } from "./src/infrastructure/services/authentication/authentication.context";
import { HomeContextProvider } from "./src/infrastructure/services/Home services/home.context";
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
  // if (__DEV__ && originalConsole && Platform.OS !== "android") {
  // Console wrapping logic here
  const [dmSansRegularLoaded] = useRegDMS({
    DMSans_400Regular,
  });
  const [dmSansBoldLoaded] = useBoldDMS({
    DMSans_700Bold,
  });

  if (!dmSansRegularLoaded || !dmSansBoldLoaded) {
    return null;
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <AuthenticationContextProvider>
          <DateOperationsContextProvider>
            <HomeContextProvider>
              <CategoryDataContextProvider>
                <TransactionContextProvider>
                  <CategoryListContextProvider>
                    <RealIncomeContextProvider>
                      <ExpectedIncomeContextProvider>
                        <Navigation />
                      </ExpectedIncomeContextProvider>
                    </RealIncomeContextProvider>
                  </CategoryListContextProvider>
                </TransactionContextProvider>
              </CategoryDataContextProvider>
            </HomeContextProvider>
          </DateOperationsContextProvider>
        </AuthenticationContextProvider>
      </ThemeProvider>
    </>
  );
}
