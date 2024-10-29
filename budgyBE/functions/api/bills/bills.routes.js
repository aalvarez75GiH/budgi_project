const app = require("../../express")();
const { v4: uuidv4 } = require("uuid");

const {
  doingBillsListTotalAmountMath,
  removingBillNodeFromBillsList,
  pausingBillNodeFromBillsList,
  doingBillsListTotalAmountMathWithoutPausedNodes,
  activatingBillNodeFromBillsList,
  selectingBillNodeFromBillsList,
} = require("./bills.handlers");
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

//** Update a Bills List's Bill node
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
    payment_date_timeStamp,
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
    payment_date_timeStamp,
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
      bill_node_toUpdate.payment_date_timeStamp = payment_date_timeStamp;
      bills_by_user[index] = bill_node_toUpdate;

      // ******************** Updating Bills List Total amount ***************
      const billsListWithTotalAmountUpdated =
        await doingBillsListTotalAmountMath(billsListByUserId);

      // **********************************************************************
      const billListUpdated = await billController.updateBillListByUserID(
        billsListWithTotalAmountUpdated
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
//** Create a Bills List's Bill node
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
    payment_date_timeStamp,
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
    payment_date_timeStamp,
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
      const billsListWithTotalAmountUpdated =
        await doingBillsListTotalAmountMath(billsListByUserId);

      const billListUpdated = await billController.updateBillListByUserID(
        billsListWithTotalAmountUpdated
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

//** Removing a Bill from Bills List
app.put("/removingBillByUserIdAndBillId", (req, res) => {
  const user_id = req.query.user_id;
  const bill_id = req.query.bill_id;
  console.log("USER ID AT DELETE BILL ENDPOINT:", user_id);
  console.log("BILL ID AT DELETE BILL ENDPOINT:", bill_id);
  (async () => {
    try {
      const billsListByUserId = await billController.getBillsListByUserID(
        user_id
      );
      const bills_list_with_bill_removed = await removingBillNodeFromBillsList(
        bill_id,
        billsListByUserId
      );

      const billsListWithTotalAmountUpdated =
        await doingBillsListTotalAmountMath(bills_list_with_bill_removed);

      const billListUpdated = await billController.updateBillListByUserID(
        billsListWithTotalAmountUpdated
      );
      billListUpdated
        ? res.status(201).json(billListUpdated)
        : res.status(503).send({
            status: "503",
            msg: "ERROR 503 - BILLS LIST WAS NOT UPDATED - SERVER UNAVAILABLE OR NETWORK ERROR",
          });

      // ******************************************
    } catch (error) {
      return res.status(500).send({
        status: "Failed",
        msg: error,
      });
    }
  })();
});

//** Pausing a Bill from Bills List
app.put("/pausingBillByUserIdAndBillId", (req, res) => {
  const user_id = req.query.user_id;
  const bill_id = req.query.bill_id;
  console.log("USER ID AT PAUSE BILL ENDPOINT:", user_id);
  console.log("BILL ID AT PAUSE BILL ENDPOINT:", bill_id);
  (async () => {
    try {
      const billsListByUserId = await billController.getBillsListByUserID(
        user_id
      );
      const bills_list_with_bill_paused = await pausingBillNodeFromBillsList(
        bill_id,
        billsListByUserId
      );

      const billsListWithTotalAmountUpdated =
        await doingBillsListTotalAmountMath(bills_list_with_bill_paused);

      const billListUpdated = await billController.updateBillListByUserID(
        billsListWithTotalAmountUpdated
      );

      billListUpdated
        ? res.status(201).json(billListUpdated)
        : res.status(503).send({
            status: "503",
            msg: "ERROR 503 - BILLS LIST WAS NOT UPDATED - SERVER UNAVAILABLE OR NETWORK ERROR",
          });

      // ******************************************
    } catch (error) {
      return res.status(500).send({
        status: "Failed",
        msg: error,
      });
    }
  })();
});
//** Pausing a Bill from Bills List
app.put("/activatingBillByUserIdAndBillId", (req, res) => {
  const user_id = req.query.user_id;
  const bill_id = req.query.bill_id;
  console.log("USER ID AT PAUSE BILL ENDPOINT:", user_id);
  console.log("BILL ID AT PAUSE BILL ENDPOINT:", bill_id);
  (async () => {
    try {
      const billsListByUserId = await billController.getBillsListByUserID(
        user_id
      );
      const bills_list_with_bill_activated =
        await activatingBillNodeFromBillsList(bill_id, billsListByUserId);

      const billsListWithTotalAmountUpdated =
        await doingBillsListTotalAmountMath(bills_list_with_bill_activated);

      const billListUpdated = await billController.updateBillListByUserID(
        billsListWithTotalAmountUpdated
      );

      billListUpdated
        ? res.status(201).json(billListUpdated)
        : res.status(503).send({
            status: "503",
            msg: "ERROR 503 - BILLS LIST WAS NOT UPDATED - SERVER UNAVAILABLE OR NETWORK ERROR",
          });

      // ******************************************
    } catch (error) {
      return res.status(500).send({
        status: "Failed",
        msg: error,
      });
    }
  })();
});

app.put("/selectingBillByUserIdAndBillId", (req, res) => {
  const user_id = req.query.user_id;
  const bill_id = req.query.bill_id;
  console.log("USER ID AT PAUSE BILL ENDPOINT:", user_id);
  console.log("BILL ID AT PAUSE BILL ENDPOINT:", bill_id);
  (async () => {
    try {
      const billsListByUserId = await billController.getBillsListByUserID(
        user_id
      );
      const bills_list_with_bill_selected =
        await selectingBillNodeFromBillsList(bill_id, billsListByUserId);

      // const billsListWithTotalAmountUpdated =
      //   await doingBillsListTotalAmountMath(bills_list_with_bill_activated);

      const billListUpdated = await billController.updateBillListByUserID(
        bills_list_with_bill_selected
      );

      billListUpdated
        ? res.status(200).json(billListUpdated)
        : res.status(503).send({
            status: "503",
            msg: "ERROR 503 - BILLS LIST WAS NOT UPDATED - SERVER UNAVAILABLE OR NETWORK ERROR",
          });

      // ******************************************
    } catch (error) {
      return res.status(500).send({
        status: "Failed",
        msg: error,
      });
    }
  })();
});

module.exports = app;
