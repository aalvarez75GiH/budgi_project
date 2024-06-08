import React, { useState, createContext, useEffect, useContext } from "react";

export const RealIncomeContext = createContext();
import {
  getRealIncome_By_UserID_MonthYearRequest,
  getRealIncomes_By_UserIDRequest,
} from "./real_income.services";
import { AuthenticationContext } from "../authentication/authentication.context";
import { DateOperationsContext } from "../date_operations/date_operations.context";

export const RealIncomeContextProvider = ({ children }) => {
  const [realIncome, setRealIncome] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [realIncomeTotalAmount, setRealIncomeTotalAmount] = useState(0);

  const { user } = useContext(AuthenticationContext);
  const { user_id } = user;

  const { month_year } = useContext(DateOperationsContext);

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
      } catch (error) {
        console.log("HERE IS THE ERROR:", error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  //   const getRealIncomes_By_UserID = (user_id) => {
  //     (async () => {
  //       try {
  //         const realIncomes = await getRealIncomes_By_UserIDRequest(user_id);
  //         realIncomes
  //           ? return realIncome
  //           : return null
  //       } catch (error) {
  //         return res.status(404).send({
  //           status: "500",
  //           msg: error,
  //         });
  //       }
  //     })();
  //   };

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
