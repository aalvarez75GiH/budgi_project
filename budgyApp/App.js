import React from "react";
import { ThemeProvider } from "styled-components/native";

import { theme } from "./src/infrastructure/theme";
import { AuthenticationContextProvider } from "./src/infrastructure/services/authentication/authentication.context";
import { NumPadContextProvider } from "./src/infrastructure/services/numPad/numPad.context";
import { TransactionContextProvider } from "./src/infrastructure/services/transactions/transactions.context";
import { CategoryListContextProvider } from "./src/infrastructure/services/category_list/category_list.context";
import { DateOperationsContextProvider } from "./src/infrastructure/services/date_operations/date_operations.context";

import { Navigation } from "./src/infrastructure/navigation";

import {
  useFonts as useRegDMS,
  DMSans_400Regular,
} from "@expo-google-fonts/dm-sans";
import {
  useFonts as useBoldDMS,
  DMSans_700Bold,
} from "@expo-google-fonts/dm-sans";

export default function App() {
  // ****************** Font Config **************************
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
            <NumPadContextProvider>
              <TransactionContextProvider>
                <CategoryListContextProvider>
                  <Navigation />
                </CategoryListContextProvider>
              </TransactionContextProvider>
            </NumPadContextProvider>
          </DateOperationsContextProvider>
        </AuthenticationContextProvider>
      </ThemeProvider>
    </>
  );
}
