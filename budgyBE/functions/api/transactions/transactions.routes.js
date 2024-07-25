const app = require("../../express")();

const transactionsController = require("./transactions.controllers");
const {
  gettingTotalAmountTransactionsByUserIDAndMonthYear,
  gettingTotalAmountTransactionsByUserIDCategoryIDAndMonthYear,
} = require("./transactions.handlers");

const {
  receivingAndPreparingTransactionInfoFromRequest,
  receivingAndPreparing_TS_TransactionInfoFromRequest,
} = require("./transactions.handlers");
const {
  postingTransactionWithCategoryDataVerified,
  postingTransactionWithCategoryDataNotVerified,
  postingTSTransactionWithCategoryDataVerified,
} = require("./transactions.handlers");

const {
  verifyingIfCategoryDataExistsByUserId,
} = require("../category_data/category_data.handlers");

//******************** GETS ****************************************

//** Getting all transactions
app.get("/", (req, res) => {
  (async () => {
    try {
      await transactionsController.getAllTransactions().then((transactions) => {
        transactions.length
          ? res.status(200).json(transactions)
          : res
              .status(404)
              .send({ status: "404", msg: "TRANSACTIONS WERE NOT FOUND" });
      });
    } catch (error) {
      return res.status(500).send({
        status: "Failed",
        msg: error,
      });
    }
  })();
});

//** Getting a transaction by ID
app.get("/transactionById", (req, res) => {
  const transaction_id = req.query.transaction_id;
  (async () => {
    try {
      await transactionsController
        .getTransactionById(transaction_id)
        .then((transaction) => {
          transaction
            ? res.status(200).json(transaction)
            : res
                .status(404)
                .send({ status: "404", msg: "TRANSACTION NOT FOUND" });
        });
    } catch (error) {
      return res.status(404).send({
        status: "500",
        msg: error,
      });
    }
  })();
});

//** Getting a transaction by ID
app.get("/transactionsByCatID", (req, res) => {
  const category_id = req.query.category_id;
  (async () => {
    try {
      await transactionsController
        .getTransactionsByCategoryId(category_id)
        .then((transactions) => {
          transactions.length
            ? res.status(200).json(transactions)
            : res.status(404).send({
                status: "404",
                msg: `TRANSACTIONS OF CATEGORY ID: ${category_id} WERE NOT FOUND`,
              });
        });
    } catch (error) {
      return res.status(404).send({
        status: "500",
        msg: error,
      });
    }
  })();
});

//** Getting transactions by userID, Category ID and Month year
app.get("/transactionsByUserId_CategoryID_MonthYear_Ordered", (req, res) => {
  const user_id = req.query.user_id;
  const category_id = req.query.category_id;
  const month_year = req.query.month_year;
  console.log("USER ID:", user_id);
  console.log("CATEGORY ID:", category_id);
  console.log("TRANSACTION DATE:", month_year);
  (async () => {
    try {
      await transactionsController
        .getTransactions_ByUser_IDCategory_IDMonthYear_Ordered(
          user_id,
          category_id,
          month_year
        )
        .then(async (transactions) => {
          const total_amount =
            await gettingTotalAmountTransactionsByUserIDCategoryIDAndMonthYear(
              transactions
            );

          transactions.length
            ? res.status(200).json({
                transactions,
                total_amount: total_amount.amount,
              })
            : res.status(404).send({
                status: "404",
                msg: `TRANSACTIONS WITH CATEGORY ID: ${category_id}, USER_ID: ${user_id} AND MONTH YEAR: ${month_year} WERE NOT FOUND`,
              });
        });
    } catch (error) {
      return res.status(404).send({
        status: "500",
        msg: error,
      });
    }
  })();
});

//** Getting transactions by userID, Category ID
app.get("/transactionsByUserId_CategoryID", (req, res) => {
  const user_id = req.query.user_id;
  const category_id = req.query.category_id;
  console.log("USER ID:", user_id);
  console.log("CATEGORY ID:", category_id);
  (async () => {
    try {
      await transactionsController
        .getTransactions_ByUser_ID_Cat_ID(user_id, category_id)
        .then((transactions) => {
          transactions.length
            ? res.status(200).json(transactions)
            : res.status(404).send({
                status: "404",
                msg: `TRANSACTIONS WITH CATEGORY ID: ${category_id}, USER_ID: ${user_id}  WERE NOT FOUND`,
              });
        });
    } catch (error) {
      return res.status(404).send({
        status: "500",
        msg: error,
      });
    }
  })();
});

//** Getting transactions by userID and Month year
app.get("/transactionsByUserId_MonthYear", (req, res) => {
  const user_id = req.query.user_id;
  const month_year = req.query.month_year;
  // const user_id = req.body.user_id;
  // const month_year = req.body.month_year;
  console.log("USER ID:", user_id);
  console.log("MONTH YEAR:", month_year);
  (async () => {
    try {
      await transactionsController
        .getTransactions_ByUser_ID_MonthYear(user_id, month_year)
        .then(async (transactions) => {
          if (transactions.length) {
            const total_amount =
              await gettingTotalAmountTransactionsByUserIDAndMonthYear(
                transactions
              );
            console.log(total_amount.amount);
            res.status(200).json({
              transactions,
              total_amount: total_amount.amount,
            });
          } else {
            res.status(404).send({
              status: "404",
              msg: `TRANSACTIONS WITH USER ID: ${user_id} AND MONTH YEAR: ${month_year} WERE NOT FOUND`,
            });
          }
        });
    } catch (error) {
      return res.status(404).send({
        status: "500",
        msg: error,
      });
    }
  })();
});

//** Getting transactions by userID and Month year ORDERED by timeStamp
app.get("/transactionsByUserId_MonthYearOrdered", (req, res) => {
  const user_id = req.query.user_id;
  const month_year = req.query.month_year;
  console.log("USER ID:", user_id);
  console.log("MONTH YEAR:", month_year);
  (async () => {
    try {
      await transactionsController
        .getTransactions_ByUser_ID_MonthYearOrdered(user_id, month_year)
        .then(async (transactions) => {
          if (transactions.length) {
            const total_amount =
              await gettingTotalAmountTransactionsByUserIDAndMonthYear(
                transactions
              );
            console.log(total_amount.amount);
            res.status(200).json({
              transactions,
              total_amount: total_amount.amount,
            });
          } else {
            res.status(404).send({
              status: "404",
              msg: `TRANSACTIONS WITH USER ID: ${user_id} AND MONTH YEAR: ${month_year} WERE NOT FOUND`,
            });
          }
        });
    } catch (error) {
      return res.status(404).send({
        status: "500",
        msg: error,
      });
    }
  })();
});

//** Getting transaction's total amount by userID and Month year ***
app.get("/transactionsTotalAmountByUserId_MonthYear", (req, res) => {
  const user_id = req.query.user_id;
  const month_year = req.query.month_year;
  console.log("USER ID:", user_id);
  console.log("MONTH YEAR:", month_year);
  (async () => {
    try {
      await transactionsController
        .getTransactions_ByUser_ID_MonthYear(user_id, month_year)
        .then(async (transactions) => {
          if (transactions.length) {
            const total_amount =
              await gettingTotalAmountTransactionsByUserIDAndMonthYear(
                transactions
              );
            console.log(total_amount.amount);
            res.status(200).json({
              total_amount: total_amount.amount,
            });
          } else {
            res.status(404).send({
              status: "404",
              msg: `TRANSACTIONS WITH USER ID: ${user_id} AND MONTH YEAR: ${month_year} WERE NOT FOUND`,
            });
          }
        });
    } catch (error) {
      return res.status(404).send({
        status: "500",
        msg: error,
      });
    }
  })();
});

//******************** POSTS ****************************************

//** Post a single transaction
app.post("/", async (req, res) => {
  const transaction = receivingAndPreparingTransactionInfoFromRequest(req);
  console.log("TRANSACTION CREATED WITH TIME STAMP:", transaction);
  const { user_id, month_year, creation_date } = transaction;
  let transaction_created;
  (async () => {
    await verifyingIfCategoryDataExistsByUserId(user_id, month_year).then(
      async (isVerified) => {
        console.log("IS VERIFIED:", isVerified);
        if (isVerified) {
          transaction_created =
            await postingTransactionWithCategoryDataVerified(transaction);
          console.log("TRANSACTION created:", transaction);
        }

        if (!isVerified) {
          transaction_created = postingTransactionWithCategoryDataNotVerified(
            transaction,
            user_id,
            creation_date
          );
        }
      }
    );

    res.status(201).json(transaction_created);
  })();
});

// *********************************************************************************
//** Post multiple transactions - This is a FDEP (For Developers End Point) end point
app.post("/postMultipleTransactions", (req, res) => {
  const transactions = req.body.transactions;
  (async () => {
    transactions.map(async (transaction) => {
      console.log("transactions ID's:", transaction.transaction_id);

      try {
        await transactionsController.createTransaction(transaction);
      } catch (error) {
        return res.status(500).send({
          status: "Failed",
          msg: error,
        });
      }
    });
    res.json(transactions);
  })();
});

//******************** PUTS ****************************************
//** Update a single transaction
app.put("/", (req, res) => {
  const transaction = receivingAndPreparingTransactionInfoFromRequest(req);
  (async () => {
    try {
      await transactionsController
        .updateTransaction(transaction, transaction.transaction_id)
        .then((data) => {
          res.json(transaction);
          console.log("DATA", data);
        });
    } catch (error) {
      return res.status(500).send({
        status: "Failed",
        msg: error,
      });
    }
  })();
});

//** Update multiple transactions - This is a FDEP (For Developers End Point) end point
app.put("/updateMultipleTransactions", (req, res) => {
  const transactions = req.body.transactions;
  (async () => {
    transactions.map(async (transaction) => {
      // const indexOfProductToUpdate = warehouse.products.findIndex(
      console.log("transactions ID's:", transaction.transaction_id);

      try {
        await transactionsController
          .updateTransaction(transaction)
          .then((data) => {
            console.log("DATA", data);
          });
      } catch (error) {
        return res.status(500).send({
          status: "Failed",
          msg: error,
        });
      }
    });
    res.json(transactions);
  })();
});

//** Update multiple transactions - This is a Developer provisional end point
app.put("/updateMultipleTransactionsTimestamps", (req, res) => {
  const transactions_with_ts = req.body.transactions;
  // console.log("TRANSACTIONS NO TS:", transactions_no_ts);
  const user_id = req.query.user_id;
  const month_year = req.query.month_year;
  (async () => {
    const transactions_no_ts =
      await transactionsController.getTransactions_ByUser_ID_MonthYear(
        user_id,
        month_year
      );
    transactions_no_ts.map((transaction_no_ts) => {
      transactions_with_ts.map((transaction_ts, index) => {
        if (transaction_no_ts.amount === transaction_ts.amount) {
          console.log("FOUND IT");
          console.log("INDEX:", index);
          transactions_no_ts[index].timeStamp = transaction_ts.timeStamp;
        } else {
          console.log("DIFFERENT...");
        }
      });
    });
    console.log("TRANSACTION NO TS:", transactions_no_ts);

    res.json(transactions_no_ts);
  })();
});

//******************** DELETES ****************************************
//** Delete a transaction
app.delete("/", (req, res) => {
  const transaction_id = req.query.transaction_id;
  (async () => {
    try {
      await transactionsController
        .deleteTransaction(transaction_id)
        .then((transaction_id) => {
          res
            .status(200)
            .send(
              `Transaction with ID: ${transaction_id} has been deleted successfully...`
            );
        });
    } catch (error) {
      return res.status(500).send({
        status: "Failed",
        msg: error,
      });
    }
  })();
});

//** DELETE MULTIPLE TRANSACTIONS - THIS IS JUST A DEVELOPER END POINT
app.delete("/transactionsByUserId_CategoryId", (req, res) => {
  const user_id = req.query.user_id;
  const category_id = req.query.category_id;
  (async () => {
    try {
      await transactionsController
        .deleteTransactionsByUserIDAndCategoryID(user_id, category_id)
        .then((transaction_id) => {
          res
            .status(200)
            .send(`Transactions  has been deleted successfully...`);
        });
    } catch (error) {
      return res.status(500).send({
        status: "Failed",
        msg: error,
      });
    }
  })();
});

module.exports = app;
