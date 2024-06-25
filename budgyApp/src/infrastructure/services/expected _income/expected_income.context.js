import React, { useState, createContext, useEffect, useContext } from "react";

export const EXpectedIncomeContext = createContext();

import { getExpectedIncome_By_UserID } from "./expected_income.services";
import { AuthenticationContext } from "../authentication/authentication.context";
import { DateOperationsContext } from "../date_operations/date_operations.context";

export const ExpectedIncomeContextProvider = ({ children }) => {
  const { user, db } = useContext(AuthenticationContext);
  const { user_id } = user;

  const { month_year, gettingAcronym } = useContext(DateOperationsContext);

  const [expectedIncome, setExpectedIncome] = useState({});
  //   const [realIncomeByMonth, setRealIncomeByMonth] = useState({});
  //   const [realIncomes, setRealIncomes] = useState([]);
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
  //   {
  //     "user_id": "5f60ea8c-70e7-43ee-9d26-2a72aaf0972b",
  //     "month_year": "April 2023",
  //     "new_expected_income":
  //       {
  //         "amount": 3900,
  //         "month_year": "April 2023",
  //         "updated": true
  //       }
  //   }

  const [expectedIncomeForRequest, setExpectedIncomeForRequest] = useState(
    EXPECTED_INCOME_INITIAL
  );

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const expected_income = await getExpectedIncome_By_UserID(user_id);
        if (expected_income.status === 404) {
          console.log("REAL INCOME STATUS 404");
          setExpectedIncome({});
          return;
        } else {
          setExpectedIncome(expected_income.data);
        }
      } catch (error) {
        console.log("HERE IS THE ERROR:", error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  console.log("REAL INCOMES AT CONTEXT:", realIncomes);

  const cleaningState = () => {
    setExpectedIncomeForRequest(EXPECTED_INCOME_INITIAL);
  };

  //   const gettingExpectedIncomeForEachButton = (month_name) => {
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
  //       //   setRealIncomeByMonth(realIncomes[index]);
  //       return realIncomes[index];
  //     }
  //   };

  //   const registeringExpectedIncomeTransaction = async (
  //     navigation,
  //     realIncomeForRequest
  //   ) => {
  //     console.log("REAL INCOME FOR REQUEST BEFORE LIVING:", realIncomeForRequest);
  //     setIsLoading(true);
  //     setTimeout(async () => {
  //       try {
  //         const response = await registerRealIncomeRequest(realIncomeForRequest);
  //         // console.log("RESPONSE:", JSON.stringify(response, null, 2));
  //         response ? setIsLoading(false) : setIsLoading(true);
  //         (await response) ? listenForNewChangesAtDB() : null;
  //         // console.log("REAL INCOME RESPONSE:", response.data);
  //         navigation.navigate("income_confirmation_view");
  //       } catch (error) {
  //         console.log("THERE WAS AN ERROR:", error);
  //       }
  //     }, 3000);
  //   };

  //   const listenForNewChangesAtDB = () => {
  //     const collectionRef = db.collection("real_income");
  //     collectionRef.onSnapshot(async (snapshot) => {
  //       let hasNewData = false;

  //       snapshot.docChanges().forEach((change) => {
  //         if (change.type === "added") {
  //           const newData = change.doc.data();
  //           // console.log("NEW TRANSACTION IS:", newData);
  //           if (newData) {
  //             hasNewData = true;
  //           }
  //         }
  //       });

  //       if (hasNewData) {
  //         try {
  //           const real_income = await getRealIncome_By_UserID_MonthYearRequest(
  //             user_id,
  //             month_year
  //           );
  //           if (real_income.status === 404) {
  //             console.log("REAL INCOME STATUS 404");
  //             setRealIncomeTotalAmount(0);
  //             setRealIncome({});
  //             return;
  //           } else {
  //             const { total_amount } = real_income.data;
  //             setRealIncomeTotalAmount(total_amount);
  //             setRealIncome(real_income.data);
  //           }

  //           const real_incomes = await getRealIncomes_By_UserIDRequest(user_id);
  //           if (real_incomes.status === 404) {
  //             console.log("REAL INCOMES STATUS 404");
  //             setRealIncomes([]);
  //             return;
  //           } else {
  //             setRealIncomes(real_incomes.data);
  //           }
  //         } catch (error) {
  //           console.log("HERE IS THE ERROR:", error);
  //         } finally {
  //           setIsLoading(false);
  //         }
  //       }
  //     });
  //   };

  return (
    <EXpectedIncomeContext.Provider
      value={{
        expectedIncome,
        isLoading,
        // gettingExpectedIncomeForEachButton,
        expectedIncomeForRequest,
        cleaningState,
        // registeringExpectedIncomeTransaction,
      }}
    >
      {children}
    </EXpectedIncomeContext.Provider>
  );
};
