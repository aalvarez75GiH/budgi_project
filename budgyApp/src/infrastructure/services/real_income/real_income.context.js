import React, { useState, createContext, useEffect, useContext } from "react";

export const RealIncomeContext = createContext();
import { getRealIncome_By_UserID_MonthYearRequest } from "./real_income.services";
import { AuthenticationContext } from "../authentication/authentication.context";
import { DateOperationsContext } from "../date_operations/date_operations.context";
import { set } from "date-fns";

export const RealIncomeContextProvider = ({ children }) => {
  const [realIncome, setRealIncome] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [realIncomeTotalAmount, setRealIncomeTotalAmount] = useState(0);

  const { user } = useContext(AuthenticationContext);
  const { user_id } = user;

  const { month_year } = useContext(DateOperationsContext);

  console.log("MONTH YEAR AT CONTEXT:", month_year);
  console.log("USER ID AT CONTEXT:", user_id);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const real_income = await getRealIncome_By_UserID_MonthYearRequest(
          user_id,
          month_year
        );
        if (real_income.status === "404") {
          setRealIncomeTotalAmount(0);
          setRealIncome({});
          return;
        }
        const { total_amount } = real_income.data;
        setRealIncomeTotalAmount(total_amount);
        setRealIncome(real_income.data);
        // real_income
        //   ? setRealIncome(real_income.data)
        //   : console.log("THERE MUST BE AN ERROR FETCHING REAL INCOME...");
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  console.log("REAL INCOME DATA:", JSON.stringify(realIncome, null, 2));

  return (
    <RealIncomeContext.Provider
      value={{
        realIncome,
        isLoading,
        realIncomeTotalAmount,
      }}
    >
      {children}
    </RealIncomeContext.Provider>
  );
};
