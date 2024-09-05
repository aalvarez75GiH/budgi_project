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

export const categoryDataInfoForMoneyTransferRequest = (
  user_id,
  month_year
) => ({
  transmitter_category_id: "",
  transmitter_category_name: "",
  transmitter_available_amount: 0,
  receiver_category_id: "",
  receiver_category_name: "",
  month_year: month_year,
  user_id: user_id,
});
