import React, { useState, createContext, useEffect, useContext } from "react";

export const ExpectedIncomeContext = createContext();

import {
  getExpectedIncome_By_UserID,
  registerExpectedIncomeRequest,
} from "./expected_income.services";
import { AuthenticationContext } from "../authentication/authentication.context";
import { DateOperationsContext } from "../date_operations/date_operations.context";

export const ExpectedIncomeContextProvider = ({ children }) => {
  const { user, db } = useContext(AuthenticationContext);
  const { user_id } = user;

  const { month_year, gettingAcronym } = useContext(DateOperationsContext);

  const [expectedIncome, setExpectedIncome] = useState({});
  //   const [realIncomeByMonth, setRealIncomeByMonth] = useState({});
  const [expectedIncomes, setExpectedIncomes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  //   const [realIncomeTotalAmount, setRealIncomeTotalAmount] = useState(0);

  const EXPECTED_INCOME_INITIAL = {
    user_id: user_id,
    month_year: month_year,
    new_expected_income: {
      amount: 0,
      month_year: "",
      updated: false,
    },
  };

  const [expectedIncomeForRequest, setExpectedIncomeForRequest] = useState(
    EXPECTED_INCOME_INITIAL
  );

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const expected_income = await getExpectedIncome_By_UserID(user_id);
        if (expected_income.status === 404) {
          setExpectedIncome({});
          return;
        } else {
          setExpectedIncome(expected_income.data);
          setExpectedIncomes(expected_income.data.expected_incomes);
        }
      } catch (error) {
        console.log("HERE IS THE ERROR:", error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const cleaningState = () => {
    setExpectedIncomeForRequest(EXPECTED_INCOME_INITIAL);
  };

  const gettingExpectedIncomeForEachButton = (month_name) => {
    const month_year_by_each_button = gettingAcronym(month_name);
    const index = expectedIncomes.findIndex(
      (expected_income) =>
        expected_income.month_year === month_year_by_each_button
    );
    if (index === -1) {
      return -1;
    } else {
      return expectedIncomes[index];
    }
  };

  const registeringExpectedIncomeTransaction = async (
    navigation,
    expectedIncomeForRequest
  ) => {
    setIsLoading(true);
    setTimeout(async () => {
      try {
        const response = await registerExpectedIncomeRequest(
          expectedIncomeForRequest
        );
        response ? setIsLoading(false) : setIsLoading(true);
        (await response) ? listenForNewChangesAtExpectedIncomeDB() : null;
        navigation.navigate("income_confirmation_view", {
          comingFrom: "addExpectedIncomeTile",
        });
      } catch (error) {
        console.log("THERE WAS AN ERROR:", error);
      }
    }, 3000);
  };

  const listenForNewChangesAtExpectedIncomeDB = () => {
    const collectionRef = db.collection("expected_income");
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
      }
      try {
        const expected_income = await getExpectedIncome_By_UserID(user_id);
        if (expected_income.status === 404) {
          console.log("REAL INCOME STATUS 404");
          setExpectedIncome({});
          return;
        } else {
          setExpectedIncome(expected_income.data);
          setExpectedIncomes(expected_income.data.expected_incomes);
        }
      } catch (error) {
        console.log("HERE IS THE ERROR:", error);
      } finally {
        setIsLoading(false);
      }
    });
  };

  return (
    <ExpectedIncomeContext.Provider
      value={{
        expectedIncome,
        isLoading,
        gettingExpectedIncomeForEachButton,
        expectedIncomeForRequest,
        cleaningState,
        setExpectedIncomeForRequest,
        expectedIncomeForRequest,
        registeringExpectedIncomeTransaction,
      }}
    >
      {children}
    </ExpectedIncomeContext.Provider>
  );
};
