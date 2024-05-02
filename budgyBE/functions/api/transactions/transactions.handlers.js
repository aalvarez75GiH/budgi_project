const { v4: uuidv4 } = require("uuid");

const transactionsController = require("./transactions.controllers");
const categoryDataController = require("../category_data/category_data.controllers");
const {
  preparingCategoryDataAfterTransactionForExistingUser,
} = require("../category_data/category_data.handlers");

// ** Here we receive the request with transaction info and we prepare it in an object and return it back
module.exports.receivingAndPreparingTransactionInfoFromRequest = (req) => {
  const transaction_id = req.body.transaction_id;

  if (transaction_id) {
    const transaction = {
      amount: req.body.amount,
      category_name: req.body.category_name,
      category_id: req.body.category_id,
      creation_date: req.body.creation_date,
      month_year: req.body.month_year,
      transaction_id: req.body.transaction_id,
      user_id: req.body.user_id,
      most_recent: req.body.most_recent,
      transaction_date: req.body.transaction_date,
      short_name: req.body.short_name,
      icon_name: req.body.icon_name,
      timeStamp: req.body.timeStamp,
      description: req.body.description,
    };
    return transaction;
  }
  if (!transaction_id) {
    const transaction_id = uuidv4();
    const transaction = {
      amount: req.body.amount,
      category_name: req.body.category_name,
      category_id: req.body.category_id,
      creation_date: req.body.creation_date,
      month_year: req.body.month_year,
      transaction_id,
      user_id: req.body.user_id,
      most_recent: req.body.most_recent,
      transaction_date: req.body.transaction_date,
      short_name: req.body.short_name,
      icon_name: req.body.icon_name,
      timeStamp: req.body.timeStamp,
      description: req.body.description,
    };
    return transaction;
  }
};

const updatingMostRecentTransactionToFalse = async (transaction_created) => {
  const { user_id, month_year, transaction_id } = transaction_created;
  console.log(" TRANSACTION CREATED AT UPDATING:", transaction_created);
  try {
    const found_transactions =
      await transactionsController.getTransactions_ByUser_ID_MonthYear(
        user_id,
        month_year
      );
    console.log(
      "FOUND TRANSACTIONS BY MONTH YEAR AND USER ID:",
      found_transactions
    );
    found_transactions.map(async (transaction) => {
      if (transaction.transaction_id !== transaction_id) {
        console.log("ITS DIFFERENT...");
        transaction.most_recent = false;
        await transactionsController.updateTransaction(transaction);
      }
    });
  } catch (error) {}
};

// Here we post a transaction after category data (for month year of the transaction) is verified that exists
module.exports.postingTransactionWithCategoryDataVerified = (transaction) => {
  console.log(" TRANSACTION AT PTWCDV:", transaction);
  (async () => {
    try {
      const transaction_created =
        await transactionsController.createTransaction(transaction);
      console.log(
        " TRANSACTION COMING FROM CONTROLLER AT PTWCDV:",
        transaction_created
      );
      await updatingMostRecentTransactionToFalse(transaction_created);
    } catch (error) {
      return {
        status: "Failed",
        msg: error,
      };
    }
  })();
  return transaction;
};

// Here we post a transaction after category data (for month year of the transaction) is verified that  does not exists
// We post a single category data for the month_year and user id of the transaction and then the transaction itself
module.exports.postingTransactionWithCategoryDataNotVerified = (
  transaction,
  user_id,
  creation_date
) => {
  preparingCategoryDataAfterTransactionForExistingUser(
    user_id,
    creation_date
  ).then(async (category_data) => {
    try {
      await categoryDataController
        .createCategoryData(category_data)
        .then((data) => {
          console.log("DATA", data);
        });
      const transaction_created =
        await transactionsController.createTransaction(transaction);

      await updatingMostRecentTransactionToFalse(transaction_created);
    } catch (error) {
      return {
        status: "Failed",
        msg: error,
      };
    }
  });
  return transaction;
};

module.exports.gettingTotalAmountTransactionsByUserIDAndMonthYear = (
  transactions
) => {
  let transactions_amount;
  transactions_amount = transactions.reduce((a, b) => ({
    amount: a.amount + b.amount,
  }));
  return transactions_amount;
};

module.exports.gettingTotalAmountTransactionsByUserIDCategoryIDAndMonthYear = (
  transactions
) => {
  let transactions_amount;
  transactions_amount = transactions.reduce((a, b) => ({
    amount: a.amount + b.amount,
  }));
  return transactions_amount;
};
