const category_listController = require("../api/category_list/category_list.controllers");
const categoryDataController = require("../api/category_data/category_data.controllers");
// const {
//   preparingBudgetedAndSpentTotalAmountsOfACategoryData,
// } = require("../api/category_data/category_data.handlers");

const preparingBudgetedAndSpentTotalAmountsOfACategoryData = async (
  category_data_expenseCategories
) => {
  return Promise.resolve().then(() => {
    let total_amount_budgeted = category_data_expenseCategories.reduce(
      (a, b) => a + b.limit_amount,
      0
    );
    let total_amount_spent = category_data_expenseCategories.reduce(
      (a, b) => a + b.amount_spent,
      0
    );

    const prepared_total_amounts = {
      total_amount_budgeted: total_amount_budgeted,
      total_amount_spent: total_amount_spent,
    };

    return prepared_total_amounts;
  });
};

const sortingExpensesCategories = (expense_categories) => {
  expense_categories.sort((a, b) => {
    const category_nameA = a.category_name.toUpperCase(); // ignore upper and lowercase
    const category_nameB = b.category_name.toUpperCase(); // ignore upper and lowercase
    if (category_nameA < category_nameB) {
      return -1;
    }
    if (category_nameA > category_nameB) {
      return 1;
    }

    // names must be equal
    return 0;
  });
};

module.exports.validation_and_update_process_of_a_new_expense_category_node =
  async (
    mandatory,
    expense_category_array,
    document_to_update,
    new_node,
    type_controller
  ) => {
    const { category_id, category_name } = new_node;
    let category_list_updated;

    if (!mandatory) {
      index = expense_category_array.findIndex(
        (obj) =>
          obj.category_id === category_id || obj.category_name === category_name
      );

      console.log("INDEX AT VALIDATION:", index);

      if (index === -1) {
        expense_category_array.push(new_node);
        sortingExpensesCategories(expense_category_array);
        if (type_controller === "category_list") {
          category_list_updated =
            await category_listController.updateCategoryList(
              document_to_update
            );
        }
        if (type_controller === "category_data") {
          // ********************************************************
          const prepared_total_amounts =
            await preparingBudgetedAndSpentTotalAmountsOfACategoryData(
              expense_category_array
            );

          const category_data_width_total_amounts = {
            ...document_to_update,
            total_amount_budgeted: prepared_total_amounts.total_amount_budgeted,
            // total_amount_spent: prepared_total_amounts.total_amount_spent,
          };
          // const { category_data_expenseCategories } = category_data_width_total_amounts;
          // ********************************************************
          await categoryDataController.updateCategoryData(
            category_data_width_total_amounts
          );
        }
        return {
          status: "Success",
          msg: "Expense Category added to Category List  successfully...",
          category_list_updated: category_list_updated,
        };
      }

      if (index !== -1) {
        return {
          status: "Same name or ID",
          msg: "Expense Category already exists....",
        };
      }
    }
    if (mandatory) {
      index = expense_category_array.findIndex(
        (obj) => obj.category_id === category_id
      );

      if (index === -1) {
        expense_category_array.push(new_node);
        sortingExpensesCategories(expense_category_array);
        if (type_controller === "category_list") {
          category_list_updated =
            await category_listController.updateCategoryList(
              document_to_update
            );
        }
        if (type_controller === "category_data") {
          await categoryDataController.updateCategoryData(document_to_update);
        }
        return {
          status: "Success",
          msg: "Expense Category added successfully...",
          category_list_updated: category_list_updated,
        };
      }
      if (index !== -1) {
        return {
          status: "Same name or ID",
          msg: "Expense Category already exists....",
        };
      }
    }
  };

module.exports.gettingIndexCategoryId = (array, node, category_id) => {
  let index;
  console.log("ARRAY:", array);
  console.log("NODE:", node);
  console.log("CATEGORY ID:", category_id);
  if (node.category_id === category_id) {
    index = array.findIndex((obj) => obj.category_id === category_id);
  }
  return index;
};

module.exports.roundingNumberToTwoDecimals = async (number) => {
  const numberFixedRounded = (Math.round(number * 100) / 100).toFixed(2);
  const numberFixedRoundedAndParsedToInt = parseFloat(numberFixedRounded);
  return numberFixedRoundedAndParsedToInt;
};
