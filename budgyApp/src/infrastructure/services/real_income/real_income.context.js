import React, { useState, createContext, useEffect, useContext } from "react";

export const RealIncomeContext = createContext();
import {
  getRealIncome_By_UserID_MonthYearRequest,
  getRealIncomes_By_UserIDRequest,
  registerRealIncomeRequest,
} from "./real_income.services";
import { AuthenticationContext } from "../authentication/authentication.context";
import { DateOperationsContext } from "../date_operations/date_operations.context";

export const RealIncomeContextProvider = ({ children }) => {
  const { user } = useContext(AuthenticationContext);
  const { user_id } = user;

  const { month_year, gettingAcronym } = useContext(DateOperationsContext);

  const [realIncome, setRealIncome] = useState({});
  const [realIncomeByMonth, setRealIncomeByMonth] = useState({});
  const [realIncomes, setRealIncomes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [realIncomeTotalAmount, setRealIncomeTotalAmount] = useState(0);

  const REAL_INCOME_INITIAL = {
    user_id: user_id,
    month_year: month_year,
    app_id: "",
    earned_amount: 0,
    week_name: "",
    app_name: "",
    logo_path: "",
  };

  const [realIncomeForRequest, setRealIncomeForRequest] =
    useState(REAL_INCOME_INITIAL);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const real_income = await getRealIncome_By_UserID_MonthYearRequest(
          user_id,
          month_year
        );
        if (real_income.status === 404) {
          console.log("REAL INCOME STATUS 404");
          setRealIncomeTotalAmount(0);
          setRealIncome({});
          return;
        } else {
          const { total_amount } = real_income.data;
          setRealIncomeTotalAmount(total_amount);
          setRealIncome(real_income.data);
        }

        const real_incomes = await getRealIncomes_By_UserIDRequest(user_id);
        if (real_incomes.status === 404) {
          console.log("REAL INCOMES STATUS 404");
          setRealIncomes([]);
          return;
        } else {
          setRealIncomes(real_incomes.data);
        }
      } catch (error) {
        console.log("HERE IS THE ERROR:", error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  // const REAL_INCOME_INITIAL = {
  //   user_id: user_id,
  //   month_year: month_year,
  //   app_id: "",
  //   earned_amount: 0,
  //   week_name: "",
  //   app_name: "",
  //   logo_path: "",
  // };

  // const [realIncomeForRequest, setRealIncomeForRequest] =
  //   useState(REAL_INCOME_INITIAL);

  console.log("REAL INCOMES AT CONTEXT:", realIncomes);

  //   useEffect(() => {
  //     const month_year_by_each_button = gettingAcronym(month_name);
  //     console.log("MONTH YEAR AT BUTTON:", month_year_by_each_button);
  //     const index = realIncomes.findIndex(
  //       (real_income) => real_income.month_year === month_year_by_each_button
  //     );
  //     if (index === -1) {
  //       console.log("NO REAL INCOME FOR THAT MONTH");
  //     } else {
  //       console.log("INDEX AT BUTTON:", index);
  //       console.log("REAL INCOME AT BUTTON:", realIncomes[index].total_amount);
  //       setRealIncomeAmount(realIncomes[index].total_amount);
  //     }
  //   }, []);

  const cleaningState = () => {
    setRealIncomeForRequest(REAL_INCOME_INITIAL);
  };

  const gettingRealIncomeForEachButton = (month_name) => {
    const month_year_by_each_button = gettingAcronym(month_name);
    console.log("MONTH YEAR AT BUTTON:", month_year_by_each_button);
    const index = realIncomes.findIndex(
      (real_income) => real_income.month_year === month_year_by_each_button
    );
    if (index === -1) {
      console.log("NO REAL INCOME FOR THAT MONTH");
    } else {
      console.log("INDEX AT BUTTON:", index);
      console.log("REAL INCOME AT BUTTON:", realIncomes[index].total_amount);
      //   setRealIncomeByMonth(realIncomes[index]);
      return realIncomes[index];
    }
  };

  const registeringRealIncome = async (realIncomeForRequest) => {
    // Set the loading state to true.
    setIsLoading(true);

    try {
      // Create a new promise that will resolve with the response from the updateTransactionRequest function.
      const response = await new Promise((resolve, reject) => {
        // Delay the execution of the following code by 3000ms (3 seconds).
        setTimeout(async () => {
          try {
            // Call the updateTransactionRequest function with the transactionInfoForUpdate object.
            const response = await registerRealIncomeRequest(
              realIncomeForRequest
            );
            console.log("RESPONSE AT CONTEXT:", response);

            // If the response is truthy, call the listenForNewChangesAtDB function.
            // (await response) ? listenForNewChangesAtDB() : null;

            // If the loading state is false, resolve the promise with the response.
            // !isLoading ? resolve(response) : null;
            response.status === 200 ? resolve(response) : null;
          } catch (error) {
            // If there's an error, log it and reject the promise with the error.
            console.log("THERE WAS AN ERROR:", error);
            reject(error);
          } finally {
            setIsLoading(false);
          }
        }, 3000);
      });

      // Return the response.
      return response;
    } catch (error) {
      // If there's an error, log it.
      console.log("THERE WAS AN ERROR:", error);
    }
  };

  return (
    <RealIncomeContext.Provider
      value={{
        realIncome,
        realIncomes,
        isLoading,
        setIsLoading,
        realIncomeTotalAmount,
        realIncomeByMonth,
        gettingRealIncomeForEachButton,
        realIncomeForRequest,
        setRealIncomeForRequest,
        registeringRealIncome,
        cleaningState,
      }}
    >
      {children}
    </RealIncomeContext.Provider>
  );
};
