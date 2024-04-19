const transactionsController = require("./transactions.controllers");

module.exports.gettingTransactionsMoneyAmountByMonthYear_CategoryID_UserID =
  async (category_id, user_id, month_year) => {
    let transactions_amount;
    try {
      await transactionsController
        .getTransactions_ByUser_IDCategory_IDMonthYear(
          user_id,
          category_id,
          month_year
        )
        .then(async (transactions) => {
          console.log(
            "TRANSACTIONS BY USER, CATEGORY ID AND MONTH YEAR REQUESTED:",
            transactions
          );

          transactions_amount = transactions.reduce((a, b) => ({
            amount: a.amount + b.amount,
          }));
        });
    } catch (error) {
      return res.status(404).send({
        status: "500",
        msg: error,
      });
    }
    return transactions_amount;
  };
