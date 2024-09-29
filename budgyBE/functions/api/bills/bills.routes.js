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

module.exports = app;
