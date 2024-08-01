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
