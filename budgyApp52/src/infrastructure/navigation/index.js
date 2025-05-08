import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";

import { AppNavigator } from "./app.navigator";
import { HomeNavigator } from "./home.navigator";

// import { AuthenticationContext } from "../services/authentication/authentication.context";

export const Navigation = () => {
  //   const { isAuthenticated, guest_authenticated, isGuestUser } = useContext(
  //     AuthenticationContext
  //   );
  //   console.log(isAuthenticated);
  return (
    <NavigationContainer>
      {/* {isAuthenticated && <AppNavigator />} */}
      {/* <HomeNavigator /> */}
      <AppNavigator />
    </NavigationContainer>
  );
};
