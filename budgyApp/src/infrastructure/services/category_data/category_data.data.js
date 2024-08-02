export const categoryDataCleanObject = (user_id, month_year) => ({
  user_id: user_id,
  category_data_id: "",
  creation_date: new Date(),
  month_year: month_year,
  total_amount_budgeted: 0,
  total_amount_spent: 0,
  category_data_expenseCategories: [
    {
      amount_avail: 0,
      amount_spent: 0,
      category_id: "",
      category_name: "Test",
      icon_name: "FoodIcon",
      limit_amount: 0,
      short_name: "Test",
      status: "",
      updated: false,
      updated_on: "",
    },
  ],
});
