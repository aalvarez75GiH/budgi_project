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

module.exports.updatingMostRecentTransactionToFalse = async (
  transaction_created
) => {
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
