import React, { createContext, useState } from "react";

export const DateOperationsContext = createContext();

export const DateOperationsContextProvider = ({ children }) => {
  // const [month_selected, setMonthSelected] = useState(
  //   month_selected ? month_selected : month_name
  // );
  console.log("MONTH SELECTED AT CONTEXT:", month_selected);
  const settingMonthYearForRequest = (month) => {
    const month_year_for_request = gettingAcronym(month);
    console.log("MONTH YEAR FOR REQUEST:", month_year_for_request);
    return month_year_for_request;
  };
  const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const month_acronyms = [
    {
      month_name: "January",
      month_acronym: "JAN",
      month_number: "1",
    },
    {
      month_name: "February",
      month_acronym: "FEB",
      month_number: "2",
    },
    {
      month_name: "March",
      month_acronym: "MAR",
      month_number: "3",
    },
    {
      month_name: "April",
      month_acronym: "APR",
      month_number: "4",
    },
    {
      month_name: "May",
      month_acronym: "MAY",
      month_number: "5",
    },
    {
      month_name: "June",
      month_acronym: "JUN",
      month_number: "6",
    },
    {
      month_name: "July",
      month_acronym: "JUL",
      month_number: "7",
    },
    {
      month_name: "August",
      month_acronym: "AUG",
      month_number: "8",
    },
    {
      month_name: "September",
      month_acronym: "SEP",
      month_number: "9",
    },
    {
      month_name: "October",
      month_acronym: "OCT",
      month_number: "10",
    },
    {
      month_name: "November",
      month_acronym: "NOV",
      month_number: "11",
    },
    {
      month_name: "December",
      month_acronym: "DEC",
      month_number: "12",
    },
  ];

  const system_date = new Date();
  const day_week = system_date.getDate().toString(); //this one add a '0' when day < 10
  const month_name = months[system_date.getMonth()];
  const year = system_date.getFullYear().toString();
  const month = system_date.getUTCMonth() + 1;
  const expenseDate = `${month_name + " " + day_week + "," + " " + year}`;
  const calendar_date_initial_date = `${year}-${month}-${day_week}`;

  const [month_selected, setMonthSelected] = useState(
    month_selected ? month_selected : month_name
  );
  //   ********* This function get month name and outcomes the acronym from month acronyms array
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

  const operationsDateData = {
    system_date: system_date,
    day_week: day_week,
    month_name: month_name,
    year: year,
    month: month,
    expenseDate: expenseDate,
    calendar_date_initial_date: calendar_date_initial_date,
    month_year: month_year,
  };

  console.log(
    "OPERATIONS DATE INFO:",
    JSON.stringify(operationsDateData, null, 2)
  );

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
    const month_year = gettingAcronym(month_name);
    console.log("MONTH YEAR", month_year);

    return {
      expenseDate,
      month_year,
      system_date_for_different_day,
    };
  };

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
      }}
    >
      {children}
    </DateOperationsContext.Provider>
  );
};
