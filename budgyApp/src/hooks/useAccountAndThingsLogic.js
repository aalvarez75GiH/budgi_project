import { useContext } from "react";
import { AuthenticationContext } from "../infrastructure/services/authentication/authentication.context";

export const useAccountAndThingsLogic = () => {
  //   ****** DATA FROM AUTHENTICATION CONTEXT ************

  const { user } = useContext(AuthenticationContext);
  const { first_name, last_name, email } = user;
  const fullName = first_name + " " + last_name;

  const movingToMyTransactions = (navigation) => {
    navigation.navigate("My transactions");
  };
  const movingToHowYourMonthIsGoing = (navigation) => {
    navigation.navigate("How month is going");
  };
  return {
    movingToMyTransactions,
    movingToHowYourMonthIsGoing,
    fullName,
    email,
  };
};
