import React, { createContext, useState } from "react";

import { weekDays, months, month_acronyms } from "./date_operations_data";
export const DateOperationsContext = createContext();

export const DateOperationsContextProvider = ({ children }) => {
  const system_date = new Date();
  const day_week = system_date.getDate().toString(); //this one add a '0' when day < 10
  const month_name = months[system_date.getMonth()];
  const year = system_date.getFullYear().toString();
  const month = system_date.getUTCMonth() + 1;
  const expenseDate = `${month_name + " " + day_week + "," + " " + year}`;
  const calendar_date_initial_date = `${year}-${month}-${day_week}`;

  const gettingAcronym = (month_name) => {
    const index = month_acronyms.findIndex(
      (obj) => obj.month_name === month_name
    );

    const new_month_year = `${
      month_acronyms[index].month_acronym + " " + year
    }`;
    return new_month_year;
  };
  const month_year = gettingAcronym(month_name);

  const [month_year_toRender, set_month_year_toRender] = useState(month_year);
  const [month_selected, setMonthSelected] = useState(
    month_selected ? month_selected : month_name
  );
  console.log("MONTH YEAR TO RENDER AT DATE OPERATIONS:", month_year_toRender);
  //   ********* This function get month name and outcomes the acronym from month acronyms array

  const settingMonthYearForRequest = (month) => {
    const month_year_for_request = gettingAcronym(month);
    console.log(
      "MONTH YEAR FOR REQUEST AT DATE OPERATIONS:",
      month_year_for_request
    );
    return month_year_for_request;
  };

  const resetMonth_year_toRender = () => {
    set_month_year_toRender(month_year);
  };

  const packingExpenseDateForDifferentDay = (date) => {
    const system_date_for_different_day = new Date(date);
    console.log("SYSTEM DATE", system_date_for_different_day);
    const month_name = months[system_date_for_different_day.getMonth()];
    console.log("MONTH NAME", month_name);
    const year = system_date_for_different_day.getFullYear().toString();
    console.log("YEAR", year);
    const day_week = system_date_for_different_day.getDate();
    console.log("DAY WEEK", day_week);
    const expenseDate = `${month_name + " " + day_week + "," + " " + year}`;
    console.log("EXPENSE DATE", expenseDate);

    const gettingAcronym = (month_name) => {
      const index = month_acronyms.findIndex(
        (obj) => obj.month_name === month_name
      );

      const new_month_year = `${
        month_acronyms[index].month_acronym + " " + year
      }`;
      return new_month_year;
    };
    const month_year_for_different_day = gettingAcronym(month_name);
    console.log("MONTH YEAR FOR DIFFERENT DAY", month_year_for_different_day);

    return {
      expenseDate,
      month_year_for_different_day,
      system_date_for_different_day,
    };
  };

  // ************************************************************************************
  // Step 2: Get the current month (0-11, where January is 0 and December is 11)
  const currentMonthIndex = new Date().getMonth();

  // Step 3: Slice the array to get months up to the current month
  const monthsUntilNow = months.slice(0, currentMonthIndex + 1);

  // console.log("MONTHS UNTIL NOW:", monthsUntilNow);
  // ************************************************************************************

  return (
    <DateOperationsContext.Provider
      value={{
        system_date,
        month_year,
        expenseDate,
        calendar_date_initial_date,
        packingExpenseDateForDifferentDay,
        gettingAcronym,
        month_name,
        month_selected,
        setMonthSelected,
        settingMonthYearForRequest,
        monthsUntilNow,
        month_year_toRender,
        set_month_year_toRender,
        resetMonth_year_toRender,
      }}
    >
      {children}
    </DateOperationsContext.Provider>
  );
};
