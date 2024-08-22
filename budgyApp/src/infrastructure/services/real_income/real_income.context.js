import React, { useState, createContext, useEffect, useContext } from "react";

export const RealIncomeContext = createContext();
import {
  getRealIncome_By_UserID_MonthYearRequest,
  getRealIncomes_By_UserIDRequest,
  registerRealIncomeRequest,
  registerCashIncomeRequest,
  post_real_income_Request,
} from "./real_income.services";
import { AuthenticationContext } from "../authentication/authentication.context";
import { DateOperationsContext } from "../date_operations/date_operations.context";
import {
  REAL_INCOME_FULL_STRUCTURE,
  REAL_INCOME_INITIAL,
} from "./real_income.data";

export const RealIncomeContextProvider = ({ children }) => {
  const { user, db } = useContext(AuthenticationContext);
  const { user_id } = user;

  const { month_year, gettingAcronym, system_date } = useContext(
    DateOperationsContext
  );

  const [realIncome, setRealIncome] = useState({});
  const [realIncomeByMonth, setRealIncomeByMonth] = useState({});
  const [realIncomes, setRealIncomes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [realIncomeTotalAmount, setRealIncomeTotalAmount] = useState(0);

  const [realIncomeForRequest, setRealIncomeForRequest] = useState(
    REAL_INCOME_INITIAL(user_id)
  );

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      setRealIncomeForRequest({
        ...realIncomeForRequest,
        user_id: user_id,
        month_year: month_year,
      });
      try {
        const real_income = await getRealIncome_By_UserID_MonthYearRequest(
          user_id,
          month_year
        );
        // console.log(
        //   "REAL INCOME...",
        //   JSON.stringify(real_income.status, null, 2)
        // );
        if (real_income.status === 404) {
          const real_income_toCreate = await post_real_income_Request(
            user_id,
            system_date,
            month_year
          );
          // setRealIncomeTotalAmount(0);
          setRealIncome(real_income_toCreate.data);
          // return;
        }
        if (real_income.status === 200) {
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
        if (error.response) {
          // Server responded with a status other than 200 range
          console.error("Error Response:", error.response.data);
          console.error("Status:", error.response.status); // Accessing the status code
          console.error("Headers:", error.response.headers);
        }
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const cleaningState = () => {
    setRealIncomeForRequest(REAL_INCOME_INITIAL(user_id));
  };

  const gettingRealIncomeForEachButton = (month_name) => {
    const month_year_by_each_button = gettingAcronym(month_name);
    const index = realIncomes.findIndex(
      (real_income) => real_income.month_year === month_year_by_each_button
    );
    if (index === -1) {
      return -1;
    } else {
      return realIncomes[index];
    }
  };

  const registeringRealIncomeTransaction = async (
    navigation,
    realIncomeForRequest
  ) => {
    setIsLoading(true);
    setTimeout(async () => {
      try {
        const response = await registerRealIncomeRequest(realIncomeForRequest);
        // console.log("RESPONSE:", JSON.stringify(response, null, 2));
        response ? setIsLoading(false) : setIsLoading(true);
        (await response) ? listenForNewChangesAtDB() : null;
        // console.log("REAL INCOME RESPONSE:", response.data);
        navigation.navigate("income_confirmation_view", {
          comingFrom: "Select_week_view",
        });
      } catch (error) {
        console.log("THERE WAS AN ERROR:", error);
      }
    }, 3000);
  };
  const registeringCashIncomeTransaction = async (
    navigation,
    realIncomeForRequest
  ) => {
    setIsLoading(true);
    setTimeout(async () => {
      try {
        const response = await registerCashIncomeRequest(realIncomeForRequest);
        // console.log("RESPONSE:", JSON.stringify(response, null, 2));
        response ? setIsLoading(false) : setIsLoading(true);
        (await response) ? listenForNewChangesAtDB() : null;
        // console.log("REAL INCOME RESPONSE:", response.data);
        navigation.navigate("income_confirmation_view", {
          comingFrom: "comingFromCash",
        });
      } catch (error) {
        console.log("THERE WAS AN ERROR:", error);
      }
    }, 3000);
  };

  const listenForNewChangesAtDB = () => {
    const collectionRef = db.collection("real_income");
    collectionRef.onSnapshot(async (snapshot) => {
      let hasNewData = false;

      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const newData = change.doc.data();
          // console.log("NEW TRANSACTION IS:", newData);
          if (newData) {
            hasNewData = true;
          }
        }
      });

      if (hasNewData) {
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
      }
    });
  };

  return (
    <RealIncomeContext.Provider
      value={{
        realIncome,
        realIncomes,
        isLoading,
        realIncomeTotalAmount,
        realIncomeByMonth,
        gettingRealIncomeForEachButton,
        realIncomeForRequest,
        setRealIncomeForRequest,
        cleaningState,
        registeringRealIncomeTransaction,
        registeringCashIncomeTransaction,
        REAL_INCOME_FULL_STRUCTURE,
      }}
    >
      {children}
    </RealIncomeContext.Provider>
  );
};
