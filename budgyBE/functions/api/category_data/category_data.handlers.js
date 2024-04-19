const categoryDataController = require("../category_data/category_data.controllers");
const category_listController = require("../category_list/category_list.controllers");
const expected_incomeController = require("../expected income/expected_income.controllers");
const roundingNumberToTwoDecimals = require("../general_handlers");

const {
  addingExpectedIncomeNodeIfDoesNotExists,
} = require("../expected income/expected_income.handlers");

const {
  validation_and_update_process_of_a_new_expense_category_node,
} = require("../general_handlers");

// ** This handler receive category data, category ID of the transaction and transaction amount
// ** modifies amount spent and amount available of the expense category and return the category data
const updatingExpenseCategoryNodeUsingTransactionsAmount = (
  category_data,
  category_id,
  transactions_amount,
  creation_date
) => {
  const expense_categories = category_data.category_data_expenseCategories;

  const transactionsAmountFixedRounded = (
    Math.round(transactions_amount * 100) / 100
  ).toFixed(2);
  const transactionsAmountFixedRoundedAndParsed = parseFloat(
    transactionsAmountFixedRounded
  );

  expense_categories.map(async (expense_category) => {
    if (expense_category.category_id === category_id) {
      console.log(expense_category);
      index = expense_categories.findIndex(
        (obj) => obj.category_id == category_id
      );
      console.log("BEFORE UPDATE", expense_categories[index]);
      expense_categories[index].amount_spent =
        transactionsAmountFixedRoundedAndParsed;
      expense_categories[index].amount_avail =
        expense_categories[index].limit_amount -
        transactionsAmountFixedRoundedAndParsed;
      expense_categories[index].updated = true;
      expense_categories[index].updated_on = creation_date;
      console.log("AFTER UPDATE", expense_categories[index]);
    }
  });
  return category_data;
};

// ** Receive expense categories from user category list and prepare node by node turning each one of them in a Category Data expense category node - Return: Category Data with all nodes prepared
const preparing_multiple_expense_category_nodes_and_category_data = async (
  user_id,
  creation_date,
  expense_categories_from_category_list
) => {
  let expense_categories = [];
  expense_categories_from_category_list.map((expense_category) => {
    const expense_category_for_categoryData = {
      amount_avail: expense_category.limit_amount,
      amount_spent: 0,
      category_id: expense_category.category_id,
      category_name: expense_category.category_name,
      limit_amount: expense_category.limit_amount,
      updated: false,
      updated_on: expense_category.updated_on,
      status: expense_category.status,
    };
    expense_categories.push(expense_category_for_categoryData);
  });

  const category_data = {
    user_id: user_id,
    creation_date: creation_date,
    category_data_expenseCategories: expense_categories,
  };
  return category_data;
};

// ** Receive user_id and month year and verify if a category data with the same parameters exists - Return: True if exists or False if not
const verifyingIfCategoryDataExistsByUserId = async (user_id, month_year) => {
  const isVerified =
    await categoryDataController.getCategoryData_ByUser_ID_And_MonthYear(
      user_id,
      month_year
    );
  if (isVerified) {
    return true;
  }
  if (!isVerified) {
    return false;
  }
};

// If a transaction of a specific Month Year do not find a Category data that matches with that month year, it is prepared for creation here - Return: New Category Data already prepared for creation
const preparingCategoryDataAfterTransactionForExistingUser = async (
  user_id,
  creation_date
) => {
  let expense_categories_from_category_list;
  let expected_incomes;
  let expected_income_id;
  let expected_income_creation_date;

  await category_listController
    .getCategoryListByUserID(user_id)
    .then((category_list) => {
      expense_categories_from_category_list = category_list.expense_categories;
    });

  //** Updating expected income adding expected income node if does not exists */
  await expected_incomeController
    .getExpectedIncomeByID(user_id)
    .then((expected_income) => {
      expected_incomes = expected_income.expected_incomes;
      expected_income_id = expected_income.expected_income_id;
      expected_income_creation_date = expected_income.creation_date;
    });

  await addingExpectedIncomeNodeIfDoesNotExists(
    user_id,
    creation_date,
    expected_incomes,
    expected_income_id,
    expected_income_creation_date
  );

  const category_data =
    preparing_multiple_expense_category_nodes_and_category_data(
      user_id,
      creation_date,
      expense_categories_from_category_list
    );
  return category_data;
};

const updatingCategoryDataAfterTransactionsOrCategoryListUpdates = (
  category_id,
  category_data
) => {
  const { category_data_expenseCategories } = category_data;
  category_data_expenseCategories.map((node) => {
    if (node.category_id !== category_id) {
      node.updated = false;
    }
  });
  categoryDataController.updateCategoryData(category_data);
};

// ** Here we receive new expense category name and/or limit amount of a specific expense category node and update that node in the user Categories Data
const updateCategoryDataWithNewExpenseCategoryNameAndAmount = async (
  user_id,
  new_category_name,
  new_limit_amount,
  category_id,
  month_year,
  updated_on
) => {
  const categories_data_toUpdate =
    await categoryDataController.getCategoryDataByUserID(user_id);

  categories_data_toUpdate.map((category_data) => {
    const { category_data_expenseCategories } = category_data;
    const category_data_monthYear = category_data.month_year;

    const index = category_data_expenseCategories.findIndex(
      (obj) => obj.category_id === category_id
    );

    const node = category_data_expenseCategories[index];

    if (node.category_name !== new_category_name) {
      node.category_name = new_category_name;
      node.updated = true;
      node.updated_on = updated_on;
      updatingCategoryDataAfterTransactionsOrCategoryListUpdates(
        category_id,
        category_data
      );
    } else {
      node.category_name = node.category_name;
    }

    if (
      node.limit_amount !== new_limit_amount &&
      category_data_monthYear === month_year
    ) {
      node.limit_amount = new_limit_amount;
      node.amount_avail = new_limit_amount - node.amount_spent;
      node.updated = true;
      node.updated_on = updated_on;

      updatingCategoryDataAfterTransactionsOrCategoryListUpdates(
        category_id,
        category_data
      );
      return;
    } else {
      node.limit_amount = node.limit_amount;
      node.amount_avail = node.amount_avail;
    }
  });
  return categories_data_toUpdate;
};

// ************* Adding a single category data's expense category handlers ************************
// ** Here a single new Expense Category Node is prepared to be inserted in a user Category Data
const preparing_a_single_new_category_data_expense_category_node = (
  new_expense_category_node
) => {
  console.log("NEW NODE TO INSERT", new_expense_category_node);

  const { category_name, category_id, limit_amount, updated_on, status } =
    new_expense_category_node;

  const expenseCategoryNodeForCategoryData = {
    amount_avail: limit_amount,
    amount_spent: 0,
    category_id: category_id,
    category_name: category_name,
    limit_amount: limit_amount,
    updated: true,
    updated_on: updated_on,
    status: status,
  };
  return expenseCategoryNodeForCategoryData;
};

// ** Here a single new Expense Category Node is validated and inserted in a user Categories Data - Return: N/A
const adding_a_single_new_expense_category_node_at_user_category_data = async (
  user_id,
  new_expense_category_node,
  mandatory
) => {
  const categories_data_toUpdate =
    await categoryDataController.getCategoryDataByUserID(user_id);

  let type_controller = "category_data";
  const newNodeForCategoryData =
    preparing_a_single_new_category_data_expense_category_node(
      new_expense_category_node
    );

  categories_data_toUpdate.map(async (category_data) => {
    const { category_data_expenseCategories } = category_data;

    await validation_and_update_process_of_a_new_expense_category_node(
      mandatory,
      category_data_expenseCategories,
      category_data,
      newNodeForCategoryData,
      type_controller
    );
  });
};

//** We receive user ID, creation date and expenses categories after a Category List is created in order to created categories data - Return: Categories data created */
const createCategoryDataAfterCategoryListCreation = async (category_list) => {
  const { user_id, creation_date, expense_categories } = category_list;

  console.log("CATEGORY_LIST_CREATED AT CD HANDLER:", category_list);

  const expense_categories_from_category_list = expense_categories;

  const category_data =
    await preparing_multiple_expense_category_nodes_and_category_data(
      user_id,
      creation_date,
      expense_categories_from_category_list
    );
  console.log("CATEGORY_DATA_PREPARED AT CD HANDLER:", category_data);

  try {
    const categories_data_created =
      await categoryDataController.createCategoryDataAutomaticallyForNewUsers(
        category_data
      );

    return categories_data_created;
  } catch (error) {
    console.log("THERE IS AN ERROR OCURRING... ");
    return {
      status: "500",
      msg: error,
    };
  }
};

module.exports = {
  updatingExpenseCategoryNodeUsingTransactionsAmount,
  verifyingIfCategoryDataExistsByUserId,
  preparingCategoryDataAfterTransactionForExistingUser,
  updatingCategoryDataAfterTransactionsOrCategoryListUpdates,
  updateCategoryDataWithNewExpenseCategoryNameAndAmount,
  adding_a_single_new_expense_category_node_at_user_category_data,
  preparing_multiple_expense_category_nodes_and_category_data,
  createCategoryDataAfterCategoryListCreation,
};
