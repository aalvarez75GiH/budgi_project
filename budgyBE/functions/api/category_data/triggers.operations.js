const categoryDataController = require("../category_data/category_data.controllers");
const {
  preparing_multiple_expense_category_nodes_and_category_data,
  updatingExpenseCategoryNodeUsingTransactionsAmount,
  updatingCategoryDataAfterTransactionsOrCategoryListUpdates,
} = require("../category_data/category_data.handlers");

module.exports.gettingCategoryDataToUpdateWithTransactionsMoneyAmount = async (
  user_id,
  month_year
) => {
  try {
    const category_data_to_modified =
      await categoryDataController.getCategoryData_ByUser_ID_And_MonthYear(
        user_id,
        month_year
      );
    return category_data_to_modified;
  } catch (error) {
    return {
      status: "500",
      msg: error,
    };
  }
};

module.exports.updateCategoryData_expenseCategory_amounts = async (
  category_id,
  transactions_amount,
  category_data,
  creation_date
) => {
  const category_data_toUpdate =
    updatingExpenseCategoryNodeUsingTransactionsAmount(
      category_data,
      category_id,
      transactions_amount,
      creation_date
    );

  try {
    updatingCategoryDataAfterTransactionsOrCategoryListUpdates(
      category_id,
      category_data_toUpdate
    );
  } catch (error) {
    return {
      status: "500",
      msg: error,
    };
  }
};
