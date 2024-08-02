// export const REAL_INCOME_INITIAL = {
//   user_id: "",
//   month_year: "",
//   app_id: "",
//   earned_amount: 0,
//   week_name: "",
//   app_name: "",
//   logo_path: "",
// };
export const REAL_INCOME_INITIAL = (user_id) => ({
  user_id: user_id,
  month_year: "",
  app_id: "",
  earned_amount: 0,
  week_name: "",
  app_name: "",
  logo_path: "",
});

export const REAL_INCOME_FULL_STRUCTURE = (user_id, month_year) => ({
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
});
