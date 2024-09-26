export const updateBillNodeObject = (user_id) => ({
  user_id: user_id,
  bill_title: "",
  bill_id: "",
  bill_short_name: "",
  icon_name: "",
  type: "",
  bill_amount: 0,
  updated_on: "",
  status: "",
  payment_date: "-",
});
export const creationBillNodeObject = (user_id) => ({
  user_id: user_id,
  bill_title: "",
  bill_short_name: "",
  icon_name: "CustomIcon",
  type: "by_user",
  bill_amount: 0,
  updated_on: Date.now(),
  status: "active",
  payment_date: "-",
});
