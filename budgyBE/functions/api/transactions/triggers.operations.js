const transactionsController = require("./transactions.controllers");

module.exports.gettingTransactionsMoneyAmountByMonthYear_CategoryID_UserID =
  async (category_id, user_id, month_year) => {
    let transactions_amount = 0;
    try {
      const transactions =
        await transactionsController.getTransactions_ByUser_IDCategory_IDMonthYear(
          user_id,
          category_id,
          month_year
        );

      if (transactions.length === 0) {
        return (transactions_amount = 0);
      } else {
        const transactions_amount = transactions.reduce((a, b) => ({
          amount: a.amount + b.amount,
        }));
        console.log(
          "TRANSACTIONS AMOUNT AT TRIGGER:",
          transactions_amount.amount
        );
        return transactions_amount;
      }
    } catch (error) {
      console.log("ERROR AT GETTING TRANSACTIONS AMOUNT BY MONTH YEAR:", error);
      // return res.status(404).send({
      //   status: "500",
      //   msg: error,
      // });
    }
  };
