const app = require("../../express")();
const { v4: uuidv4 } = require("uuid");

const billController = require("./bills.controllers");

//******************** GETS ****************************************
//** Getting all Expenses categories
app.get("/", (req, res) => {
  (async () => {
    try {
      await billController.getAllBills().then((bills) => {
        bills.length
          ? res.status(200).json(bills)
          : res.status(404).send({
              status: "404",
              msg: "BILLS WERE NOT FOUND",
            });
      });
    } catch (error) {
      return res.status(500).send({
        status: "Failed",
        msg: error,
      });
    }
  })();
});
//** Getting Bills List by user ID
app.get("/billsListByUserId", (req, res) => {
  const user_id = req.query.user_id;
  (async () => {
    try {
      await billController.getBillsListByUserID(user_id).then((bills_list) => {
        console.log("BILLS LIST AT ROUTE:", bills_list);
        bills_list
          ? res.status(200).json(bills_list)
          : res
              .status(404)
              .send({ status: "404", msg: "BILLS LIST NOT FOUND" });
      });
    } catch (error) {
      return res.status(404).send({
        status: "500",
        msg: error,
      });
    }
  })();
});

//** Post a category list
app.post("/new_bills_list_by_user", async (req, res) => {
  const bills_list_id = uuidv4();
  const { user_id, creation_date, bills_by_user, bills_total_amount } =
    req.body;

  const bills_list_toCreate = {
    user_id,
    creation_date,
    bills_by_user,
    bills_list_id,
    bills_total_amount,
  };

  (async () => {
    try {
      const bills_list_created = await billController.createBillsList(
        bills_list_toCreate
      );

      console.log("BILLS_LIST_CREATED AT BILLS ROUTE:", bills_list_created);

      bills_list_created
        ? res.status(201).json(bills_list_created)
        : res.status(503).send({
            status: "503",
            msg: "ERROR 503 - BILLS LIST WAS NOT CREATED - SERVER UNAVAILABLE OR NETWORK ERROR",
          });
    } catch (error) {
      return res.status(500).send({
        status: "Failed",
        msg: error,
      });
    }
  })();
});

// ** Just for developing purposes
app.post("/postMultipleBills", (req, res) => {
  const bills_by_default = req.body.bills_by_default;
  (async () => {
    bills_by_default.map(async (bill) => {
      try {
        await billController.createBill(bill).then((data) => {
          // res.json(transaction);
          console.log("DATA", data);
        });
      } catch (error) {
        return res.status(500).send({
          status: "Failed",
          msg: error,
        });
      }
    });
    res.json(bills_by_default);
  })();
});

//** Update a Category List Expense Category node and Category Data's expense category node
app.put("/updateBillListByUserId", (req, res) => {
  const {
    user_id,
    bill_title,
    bill_id,
    bill_short_name,
    bill_amount,
    payment_date,
    icon_name,
    type,
    updated_on,
    status,
  } = req.body;

  const bill_toUpdate = {
    user_id,
    bill_title,
    bill_id,
    bill_short_name,
    bill_amount,
    payment_date,
    icon_name,
    type,
    updated_on,
    status,
  };
  console.log("BILL TO UPDATE:", bill_toUpdate);

  (async () => {
    try {
      const billsListByUserId = await billController.getBillsListByUserID(
        user_id
      );
      const { bills_by_user } = billsListByUserId;
      const index = bills_by_user.findIndex((obj) => obj.bill_id === bill_id);
      const bill_node_toUpdate = bills_by_user[index];
      bill_node_toUpdate.bill_title = bill_title;
      bill_node_toUpdate.bill_short_name = bill_short_name;
      bill_node_toUpdate.bill_amount = bill_amount;
      bill_node_toUpdate.payment_date = payment_date;
      bill_node_toUpdate.icon_name = icon_name;
      bill_node_toUpdate.type = type;
      bill_node_toUpdate.updated_on = updated_on;
      bill_node_toUpdate.status = status;
      bills_by_user[index] = bill_node_toUpdate;

      // ******************** Updating Bills List Total amount ***************

      billsListByUserId.bills_total_amount = bills_by_user.reduce(
        (acc, obj) => {
          return acc + obj.bill_amount;
        },
        0
      );
      console.log("TOTAL AMOUNT:", billsListByUserId.bills_total_amount);

      // **********************************************************************
      const billListUpdated = await billController.updateBillListByUserID(
        billsListByUserId
      );
      billListUpdated
        ? res.status(201).json(billListUpdated)
        : res.status(503).send({
            status: "503",
            msg: "ERROR 503 - BILLS LIST WAS NOT UPDATED - SERVER UNAVAILABLE OR NETWORK ERROR",
          });
    } catch (error) {
      return res.status(500).send({
        status: "Failed",
        msg: error,
      });
    }
  })();
});
//** Update a Category List Expense Category node and Category Data's expense category node
app.put("/createBillByUserId", (req, res) => {
  const bill_id = uuidv4();
  const {
    user_id,
    bill_title,
    bill_short_name,
    bill_amount,
    payment_date,
    icon_name,
    type,
    updated_on,
    status,
  } = req.body;

  const bill_toCreate = {
    bill_title,
    bill_short_name,
    bill_amount,
    payment_date,
    icon_name,
    type,
    updated_on,
    status,
    bill_id,
  };
  console.log("BILL TO CREATE:", bill_toCreate);

  (async () => {
    try {
      const billsListByUserId = await billController.getBillsListByUserID(
        user_id
      );
      const { bills_by_user } = billsListByUserId;
      const index = bills_by_user.findIndex((obj) => obj.bill_id === bill_id);
      if (index === -1) {
        bills_by_user.push(bill_toCreate);
      }

      // ******************** Updating Bills List Total amount ***************

      billsListByUserId.bills_total_amount = bills_by_user.reduce(
        (acc, obj) => {
          return acc + obj.bill_amount;
        },
        0
      );
      console.log("TOTAL AMOUNT:", billsListByUserId.bills_total_amount);

      // **********************************************************************
      const billListUpdated = await billController.updateBillListByUserID(
        billsListByUserId
      );
      billListUpdated
        ? res.status(201).json(billListUpdated)
        : res.status(503).send({
            status: "503",
            msg: "ERROR 503 - BILLS LIST WAS NOT UPDATED - SERVER UNAVAILABLE OR NETWORK ERROR",
          });
    } catch (error) {
      return res.status(500).send({
        status: "Failed",
        msg: error,
      });
    }
  })();
});

// if (index === -1) {
//   expense_category_array.push(new_node);
//   sortingExpensesCategories(expense_category_array);
//   if (type_controller === "category_list") {
//     category_list_updated = await category_listController.updateCategoryList(
//       document_to_update
//     );
//   }
//   if (type_controller === "category_data") {
//     // ********************************************************
//     const prepared_total_amounts =
//       await preparingBudgetedAndSpentTotalAmountsOfACategoryData(
//         expense_category_array
//       );

//     const category_data_width_total_amounts = {
//       ...document_to_update,
//       total_amount_budgeted: prepared_total_amounts.total_amount_budgeted,
//       // total_amount_spent: prepared_total_amounts.total_amount_spent,
//     };
//     // const { category_data_expenseCategories } = category_data_width_total_amounts;
//     // ********************************************************
//     await categoryDataController.updateCategoryData(
//       category_data_width_total_amounts
//     );
//   }
//   return {
//     status: "Success",
//     msg: "Expense Category added to Category List  successfully...",
//     category_list_updated: category_list_updated,
//   };
// }

module.exports = app;

// {
//   "updated_on": "2024-10-09T17:16:50.923Z",
//   "bill_id": "bbc1ecde-1a8a-4d48-89bd-3c340d4329e7",
//   "bill_amount": 0,
//   "bill_short_name": "Water",
//   "type": "Default",
//   "icon_name": "WaterBillIcon",
//   "payment_date": "Oct 27",
//   "status": "Unpaid",
//   "bill_title": "Water service"
// },
// {
//   "updated_on": "2024-10-10T16:13:29.081Z",
//   "new_bill_id": "85d7db94-af8d-4d5b-aedb-a03fcc4eea3f"
//   "bill_amount": 100,
//   "bill_short_name": "Cat S.",
//   "type": "by_user",
//   "icon_name": "CustomIcon",
//   "payment_date": "Oct 15",
//   "status": "Unpaid",
//   "bill_title": "Cat services",
//   "user_id": "34c110af-5d1e-41ee-948f-ca366ae3c53b",
// }
