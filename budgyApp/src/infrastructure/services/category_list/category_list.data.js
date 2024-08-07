export const getCategoryListInitialInfo = (user_id) => ({
  user_id: user_id,
  mandatory: false,
  new_expense_category_node: {
    category_name: "",
    short_name: "",
    icon_name: "CustomIcon",
    type: "by_user",
    limit_amount: 0,
    updated_on: "",
    status: "active",
  },
});

export const updateCategoryListExpenseCategoryObject = (
  user_id,
  month_year
) => ({
  user_id: user_id,
  new_category_name: "",
  new_limit_amount: 0,
  new_short_name: "",
  month_year: month_year,
  updated_on: "",
  category_id: "",
});
