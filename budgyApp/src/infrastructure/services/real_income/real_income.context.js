import React, { useState, createContext, useEffect, useContext } from "react";

export const RealIncomeContext = createContext();
import {
  getRealIncome_By_UserID_MonthYearRequest,
  getRealIncomes_By_UserIDRequest,
  registerRealIncomeRequest,
  registerCashIncomeRequest,
} from "./real_income.services";
import { AuthenticationContext } from "../authentication/authentication.context";
import { DateOperationsContext } from "../date_operations/date_operations.context";

export const RealIncomeContextProvider = ({ children }) => {
  const { user, db } = useContext(AuthenticationContext);
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

  const REAL_INCOME_FULL_STRUCTURE = {
    creation_date: new Date(),
    month_year: month_year,
    total_amount: 0,
    user_id: user_id,
    work_apps: [
      {
        app_id: "9368eeac-4ee7-44cd-9a07-4bbc7d3a885d",
        app_name: "Uber",
        collected_money: 0,
        icon_color: "#14223C",
        logo_path: "UberIcon",
        weeks: [
          {
            earned_amount: 0,
            week_name: "Week 1",
          },
          {
            earned_amount: 0,
            week_name: "Week 2",
          },
          {
            earned_amount: 0,
            week_name: "Week 3",
          },
          {
            earned_amount: 0,
            week_name: "Week 4",
          },
          {
            earned_amount: 0,
            week_name: "Week 5",
          },
        ],
      },
      {
        app_id: "9b29d597-0129-48c7-aba1-5b4a668a4ece",
        app_name: "Grubhub",
        collected_money: 0,
        icon_color: "#14223C",
        logo_path: "GrubHubIcon",
        weeks: [
          {
            earned_amount: 0,
            week_name: "Week 1",
          },
          {
            earned_amount: 0,
            week_name: "Week 2",
          },
          {
            earned_amount: 0,
            week_name: "Week 3",
          },
          {
            earned_amount: 0,
            week_name: "Week 4",
          },
          {
            earned_amount: 0,
            week_name: "Week 5",
          },
        ],
      },
      {
        app_id: "b5555073-5f59-4002-887f-642f4cc57539",
        app_name: "Lyft",
        collected_money: 0,
        icon_color: "#F700B9",
        logo_path: "LyftIcon",
        weeks: [
          {
            earned_amount: 0,
            week_name: "Week 1",
          },
          {
            earned_amount: 0,
            week_name: "Week 2",
          },
          {
            earned_amount: 0,
            week_name: "Week 3",
          },
          {
            earned_amount: 0,
            week_name: "Week 4",
          },
          {
            earned_amount: 0,
            week_name: "Week 5",
          },
        ],
      },
      {
        app_id: "baeca3dd-05de-4ab3-bd0e-0eba7b650534",
        app_name: "Cash",
        collected_money: 0,
        icon_color: "#14223C",
        logo_path: "SpendingIcon",
      },
      {
        app_id: "c90e8ff0-7cc2-4808-8647-4d7f1a6f7043",
        app_name: "Doordash",
        collected_money: 0,
        icon_color: "#FA462D",
        logo_path: "DoordashIcon",
        weeks: [
          {
            earned_amount: 0,
            week_name: "Week 1",
          },
          {
            earned_amount: 0,
            week_name: "Week 2",
          },
          {
            earned_amount: 0,
            week_name: "Week 3",
          },
          {
            earned_amount: 0,
            week_name: "Week 4",
          },
          {
            earned_amount: 0,
            week_name: "Week 5",
          },
        ],
      },
    ],
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
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

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
      return -1;
    } else {
      console.log("INDEX AT BUTTON:", index);
      console.log("REAL INCOME AT BUTTON:", realIncomes[index].total_amount);
      //   setRealIncomeByMonth(realIncomes[index]);
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
        navigation.navigate("income_confirmation_view");
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
