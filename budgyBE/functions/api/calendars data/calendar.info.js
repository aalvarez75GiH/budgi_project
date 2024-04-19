module.exports.monthsArray = [
  "JAN 2024",
  "FEB 2024",
  "MAR 2024",
  "APR 2024",
  "MAY 2024",
  "JUN 2024",
  "JUL 2024",
  "AUG 2024",
  "SEP 2024",
  "OCT 2024",
  "NOV 2024",
  "DEC 2024",
];

module.exports.creatingMonthYear = (creation_date) => {
  console.log("CREATION DATE AT MONTH YEAR FUNCTION:", creation_date);
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
    },
    {
      month_name: "February",
      month_acronym: "FEB",
    },
    {
      month_name: "March",
      month_acronym: "MAR",
    },
    {
      month_name: "April",
      month_acronym: "APR",
    },
    {
      month_name: "May",
      month_acronym: "MAY",
    },
    {
      month_name: "June",
      month_acronym: "JUN",
    },
    {
      month_name: "July",
      month_acronym: "JUL",
    },
    {
      month_name: "August",
      month_acronym: "AUG",
    },
    {
      month_name: "September",
      month_acronym: "SEP",
    },
    {
      month_name: "October",
      month_acronym: "OCT",
    },
    {
      month_name: "November",
      month_acronym: "NOV",
    },
    {
      month_name: "December",
      month_acronym: "DEC",
    },
  ];

  const d = new Date(creation_date);
  const dateInString = d.toString();
  const day_name = weekDays[d.getDay()];
  const month_day = d.getDate().toString();
  let month_name = months[d.getMonth()];
  const year = d.getFullYear().toString();

  const gettingAcronym = (month_name) => {
    const index = month_acronyms.findIndex(
      (obj) => obj.month_name === month_name
    );

    const month_year = `${month_acronyms[index].month_acronym + " " + year}`;
    return month_year;
  };
  const month_year = gettingAcronym(month_name);

  // const month_year = month_name + " " + year;
  console.log("DATE:", d);
  console.log("DATE IN STRING:", dateInString);
  console.log("DAY NAME:", day_name);
  console.log("MONTH DAY:", month_day);
  console.log("MONTH NAME:", month_name);
  console.log("YEAR:", year);
  console.log("MONTH - YEAR:", month_year);

  return month_year;
};
