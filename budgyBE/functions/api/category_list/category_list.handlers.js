const {
  validation_and_update_process_of_a_new_expense_category_node,
  // gettingIndexCategoryId,
} = require("../general_handlers");

const categoryDataController = require("../category_data/category_data.controllers");
const {
  preparingBudgetedAndSpentTotalAmountsOfACategoryData,
} = require("../category_data/category_data.handlers");

// ** Update a expense category node(category name and/or amount) within a user category list - Return: user category list with expense category node updated
module.exports.updateCategoryListNode = async (
  category_list_by_user_id,
  category_name,
  category_id,
  limit_amount,
  new_short_name,
  status
) => {
  const { expense_categories } = category_list_by_user_id;

  //   let old_node;
  expense_categories.map((expense_category_node) => {
    if (expense_category_node.category_id === category_id) {
      index = expense_categories.findIndex(
        (obj) => obj.category_id == category_id
      );

      expense_categories[index].category_name = category_name;
      expense_categories[index].limit_amount = limit_amount;
      expense_categories[index].short_name = new_short_name;
      expense_categories[index].status = status;
    }
  });

  return category_list_by_user_id;
};

// ** Adding a expense category node within a user category list - Return: user category list with new expense category node created
module.exports.adding_a_single_new_expense_category_node_at_user_category_list =
  async (new_expense_category_node, mandatory, category_list_by_user_id) => {
    const type_controller = "category_list";

    const { expense_categories } = category_list_by_user_id;

    const category_list_test =
      await validation_and_update_process_of_a_new_expense_category_node(
        mandatory,
        expense_categories,
        category_list_by_user_id,
        new_expense_category_node,
        type_controller
      );

    console.log("CATEGORY LIST TEST:", category_list_test);
    return category_list_test;
  };

// ** Suspending a expense category node within a user category list - Return: user category list with expense category node suspended
module.exports.switchingExpenseCategoryNodeToSuspendedAtCategoryList = (
  category_id,
  category_list_by_user_id
) => {
  const { expense_categories } = category_list_by_user_id;
  expense_categories.map((expense_category_node) => {
    if (expense_category_node.category_id === category_id) {
      index = expense_categories.findIndex(
        (obj) => obj.category_id == category_id
      );

      expense_categories[index].status = "suspended";
    }
  });
  return category_list_by_user_id;
};

module.exports.removingExpenseCategoryNodeFromCategoryList = (
  category_id,
  category_list_by_user_id
) => {
  const { expense_categories } = category_list_by_user_id;
  const index = expense_categories.findIndex(
    (obj) => obj.category_id == category_id
  );
  const node = expense_categories[index];
  if (node.category_id === category_id) {
    expense_categories.splice(index, 1);
  }
  return category_list_by_user_id;
};

module.exports.removingExpenseCategoryNodeAtUserCategoriesData = async (
  user_id,
  category_id
) => {
  try {
    const categories_data_toUpdate =
      await categoryDataController.getCategoryDataByUserID(user_id);

    categories_data_toUpdate.map(async (category_data) => {
      const { category_data_expenseCategories } = category_data;
      const index = category_data_expenseCategories.findIndex(
        (obj) => obj.category_id === category_id
      );
      const node = category_data_expenseCategories[index];
      if (node.category_id === category_id) {
        // node.status = "suspended";
        category_data_expenseCategories.splice(index, 1);
      }
      const prepared_total_amounts =
        await preparingBudgetedAndSpentTotalAmountsOfACategoryData(
          category_data_expenseCategories
        );
      const category_data_width_total_amounts = {
        ...category_data,
        total_amount_budgeted: prepared_total_amounts.total_amount_budgeted,
      };
      categoryDataController.updateCategoryData(
        category_data_width_total_amounts
      );
    });
    return categories_data_toUpdate;
  } catch (error) {
    console.log(error);
  }
};

module.exports.suspendingExpenseCategoryNodeAtUserCategoriesData = async (
  user_id,
  category_id
) => {
  try {
    const categories_data_toUpdate =
      await categoryDataController.getCategoryDataByUserID(user_id);

    categories_data_toUpdate.map(async (category_data) => {
      const { category_data_expenseCategories } = category_data;
      const index = category_data_expenseCategories.findIndex(
        (obj) => obj.category_id === category_id
      );
      const node = category_data_expenseCategories[index];
      if (node.category_id === category_id) {
        node.status = "suspended";
        node.limit_amount = 0;
      }
      const prepared_total_amounts =
        await preparingBudgetedAndSpentTotalAmountsOfACategoryData(
          category_data_expenseCategories
        );
      const category_data_width_total_amounts = {
        ...category_data,
        total_amount_budgeted: prepared_total_amounts.total_amount_budgeted,
      };
      categoryDataController.updateCategoryData(
        category_data_width_total_amounts
      );
    });
    return categories_data_toUpdate;
  } catch (error) {
    console.log(error);
  }
};
