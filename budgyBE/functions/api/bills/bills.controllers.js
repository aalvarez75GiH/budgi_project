const { v4: uuidv4 } = require("uuid");

const { db } = require("../../fb");

const getAllBills = async () => {
  return await db
    .collection("bills_by_default")
    .get()
    .then((data) => {
      let bills = [];
      let docs = data.docs;
      if (docs.length) {
        docs.map((doc) => {
          const selectedBill = {
            bill_title: doc.data().bill_title,
            bill_short_name: doc.data().bill_short_name,
            icon_name: doc.data().icon_name,
            type: doc.data().type,
            bill_amount: doc.data().bill_amount,
            updated_on: doc.data().updated_on,
            status: doc.data().status,
            payment_date: doc.data().payment_date,
          };

          bills.push(selectedBill);
        });
        // res.status(200).json(expenses_categories);
        return bills;
      }
      if (!docs.length) {
        return bills;
      }
    });
};

const getBillsListByUserID = async (user_id) => {
  let found_billsList;
  await db
    .collection("bills_list")
    .where("user_id", "==", user_id)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        found_billsList = doc.data();
      });
    });
  // console.log("CATEGORY LIST AT CONTROLLER:", found_categoryList);
  return found_billsList;
};

const createBill = async (bill) => {
  //   const { category_id } = expense_category;
  const bill_id = uuidv4();
  const bill_toCreate = {
    ...bill,
    bill_id,
  };
  await db
    .collection("bills_by_default")
    .doc(`/${bill_id}/`)
    .create(bill_toCreate);
  return bill_toCreate;
};

const updateBillListByUserID = async (bill_list_toUpdate) => {
  const { bills_list_id } = bill_list_toUpdate;
  await db
    .collection("bills_list")
    .doc(bills_list_id)
    .update(bill_list_toUpdate);
  return bill_list_toUpdate;
};

// ** Create Category List - by http request
const createBillsList = async (bills_list_toCreate) => {
  const { bills_list_id } = bills_list_toCreate;
  await db
    .collection("bills_list")
    .doc(`/${bills_list_id}/`)
    .create(bills_list_toCreate);
  return bills_list_toCreate;
};

module.exports = {
  createBill,
  getAllBills,
  createBillsList,
  getBillsListByUserID,
  updateBillListByUserID,
};
