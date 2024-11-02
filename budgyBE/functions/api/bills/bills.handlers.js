module.exports.doingBillsListTotalAmountMath = async (billsListByUserId) => {
  const { bills_by_user } = billsListByUserId;
  billsListByUserId.bills_total_amount = bills_by_user
    .filter((bill) => bill.status !== "Paused")
    .reduce((acc, obj) => {
      return acc + obj.bill_amount;
    }, 0);
  console.log("TOTAL AMOUNT:", billsListByUserId.bills_total_amount);
  return billsListByUserId;
};

module.exports.removingBillNodeFromBillsList = (
  bill_id,
  bills_list_by_user_id
) => {
  const { bills_by_user } = bills_list_by_user_id;
  const index = bills_by_user.findIndex((obj) => obj.bill_id === bill_id);
  const node = bills_by_user[index];
  if (node.bill_id === bill_id) {
    bills_by_user.splice(index, 1);
  }
  return bills_list_by_user_id;
};

module.exports.pausingBillNodeFromBillsList = (
  bill_id,
  bills_list_by_user_id
) => {
  const { bills_by_user } = bills_list_by_user_id;
  const index = bills_by_user.findIndex((obj) => obj.bill_id === bill_id);
  const node = bills_by_user[index];
  if (node.bill_id === bill_id) {
    node.status = "Paused";
    node.isSelected = false;
  }
  return bills_list_by_user_id;
};

module.exports.activatingBillNodeFromBillsList = (
  bill_id,
  bills_list_by_user_id
) => {
  const { bills_by_user } = bills_list_by_user_id;
  const index = bills_by_user.findIndex((obj) => obj.bill_id === bill_id);
  const node = bills_by_user[index];
  if (node.bill_id === bill_id) {
    node.status = "Unpaid";
  }
  return bills_list_by_user_id;
};

module.exports.selectingBillNodeFromBillsList = (
  bill_id,
  bills_list_by_user_id
) => {
  const { bills_by_user } = bills_list_by_user_id;
  const index = bills_by_user.findIndex((obj) => obj.bill_id === bill_id);
  const node = bills_by_user[index];
  if (node.bill_id === bill_id) {
    node.isSelected = !node.isSelected;
    // node.isSelected === true ? (node.isSelected = false) : true;
    // node.isSelected = true;
  }
  return bills_list_by_user_id;
};
