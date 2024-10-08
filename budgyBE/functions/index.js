const { fcn } = require("./fb");
// require("dotenv").config();
// console.log(process.env);

const transactionsRouter = require("./api/transactions/transactions.routes");
const categoryDataRouter = require("./api/category_data/category_data.routes");
const expenseCategoryRouter = require("./api/expense categories/expense_category.routes");
const categoryListRouter = require("./api/category_list/category_list.routes");
const usersRouter = require("./api/users/users.routes");
const expectedIncomeRouter = require("./api/expected income/expected_income.routes");
const workingAppsRouter = require("./api/working_apps/working_apps.routes");
const realIncomeRouter = require("./api/real_income/real_income.routes");
const billsRouter = require("./api/bills/bills.routes");

const {
  gettingTransactionsMoneyAmountByMonthYear_CategoryID_UserID,
} = require("./api/transactions/triggers.operations");

const {
  updateCategoryData_expenseCategory_amounts,
  gettingCategoryDataToUpdateWithTransactionsMoneyAmount,
  updateCategoryData_two_expensesCategories_amounts,
} = require("./api/category_data/triggers.operations");

// // ******************** FIREBASE ON REQUESTS ****************************
exports.transactionsEndPoint = fcn.https.onRequest(transactionsRouter);
exports.categoryDataEndPoint = fcn.https.onRequest(categoryDataRouter);
exports.expenseCategoryEndPoint = fcn.https.onRequest(expenseCategoryRouter);
exports.categoryListEndPoint = fcn.https.onRequest(categoryListRouter);
exports.usersEndPoint = fcn.https.onRequest(usersRouter);
exports.expectedIncomeEndPoint = fcn.https.onRequest(expectedIncomeRouter);
exports.workingAppsEndPoint = fcn.https.onRequest(workingAppsRouter);
exports.realIncomeEndPoint = fcn.https.onRequest(realIncomeRouter);
exports.billsEndPoint = fcn.https.onRequest(billsRouter);

// // ******************** TRIGGERS ****************************************

// ** Trigger - Updating an user category data after posting a transaction
exports.CategoryDataUpdateProcessAfterTransaction = fcn.firestore
  .document("transactions/{documentId}")
  .onCreate(async (snap, context) => {
    const { category_id, user_id, month_year, creation_date } = snap.data();

    // ** Getting the amount of money when summing all transactions that match with Month year, Category and User
    const transactions_amount =
      await gettingTransactionsMoneyAmountByMonthYear_CategoryID_UserID(
        category_id,
        user_id,
        month_year
      );

    // ** Getting category data by same month_year and user_id of transaction
    const category_data =
      await gettingCategoryDataToUpdateWithTransactionsMoneyAmount(
        user_id,
        month_year
      );
    // console.log("CATEGORY DATA FOUND:", category_data);

    // ** Updating  category data with transactions amount
    await updateCategoryData_expenseCategory_amounts(
      category_id,
      transactions_amount.amount,
      category_data,
      creation_date
    );
  });

exports.CategoryDataUpdateProcessAfterTransactionUpdate = fcn.firestore
  .document("transactions/{documentId}")
  .onUpdate(async (change, context) => {
    const after = change.after.data();
    const before = change.before.data();
    console.log("TRANSACTION AFTER UPDATED:", after);
    console.log("TRANSACTION BEFORE UPDATED:", before);
    const { category_id, user_id, month_year, creation_date } = after;
    const {
      category_id: category_id_before,
      user_id: user_id_before,
      month_year: month_year_before,
    } = before;
    // // ** Getting the amount of money when summing all transactions that match with Month year, Category and User
    if (category_id === category_id_before) {
      const transactions_amount =
        await gettingTransactionsMoneyAmountByMonthYear_CategoryID_UserID(
          category_id,
          user_id,
          month_year
        );

      // // ** Getting category data by same month_year and user_id of transaction
      const category_data =
        await gettingCategoryDataToUpdateWithTransactionsMoneyAmount(
          user_id,
          month_year
        );
      // console.log("CATEGORY DATA FOUND:", category_data);

      // // ** Updating  category data with transactions amount
      if (transactions_amount === 0) {
        await updateCategoryData_expenseCategory_amounts(
          category_id,
          transactions_amount,
          category_data,
          creation_date
        );
      }
      if (transactions_amount !== 0) {
        await updateCategoryData_expenseCategory_amounts(
          category_id,
          transactions_amount.amount,
          category_data,
          creation_date
        );
      }
    }
    // ****************************************************************************
    if (category_id !== category_id_before) {
      console.log("THIS IS A CATEGORY TRANSFER TRANSACTION UPDATE...");
      const previous_category_transactions_amount =
        await gettingTransactionsMoneyAmountByMonthYear_CategoryID_UserID(
          category_id_before,
          user_id,
          month_year
        );
      const new_category_transactions_amount =
        await gettingTransactionsMoneyAmountByMonthYear_CategoryID_UserID(
          category_id,
          user_id,
          month_year
        );

      const category_data =
        await gettingCategoryDataToUpdateWithTransactionsMoneyAmount(
          user_id,
          month_year
        );

      if (previous_category_transactions_amount === 0) {
        await updateCategoryData_two_expensesCategories_amounts(
          category_id,
          category_id_before,
          new_category_transactions_amount.amount,
          previous_category_transactions_amount,
          category_data,
          creation_date
        );
      }

      if (
        new_category_transactions_amount !== 0 &&
        previous_category_transactions_amount !== 0
      ) {
        await updateCategoryData_two_expensesCategories_amounts(
          category_id,
          category_id_before,
          new_category_transactions_amount.amount,
          previous_category_transactions_amount.amount,
          category_data,
          creation_date
        );
      }
    }
    // ****************************************************************************
  });

exports.CategoryDataUpdateProcessAfterDeletion = fcn.firestore
  .document("transactions/{documentId}")
  .onDelete(async (snap, context) => {
    const { category_id, user_id, month_year, creation_date } = snap.data();
    console.log("SNAP DATA:", snap.data());
    // ** Getting the amount of money when summing all transactions that match with Month year, Category and User
    const transactions_amount =
      await gettingTransactionsMoneyAmountByMonthYear_CategoryID_UserID(
        category_id,
        user_id,
        month_year
      );

    // ** Getting category data by same month_year and user_id of transaction
    const category_data =
      await gettingCategoryDataToUpdateWithTransactionsMoneyAmount(
        user_id,
        month_year
      );

    // ** Updating  category data with transactions amount
    if (transactions_amount === 0) {
      await updateCategoryData_expenseCategory_amounts(
        category_id,
        transactions_amount,
        category_data,
        creation_date
      );
    }
    if (transactions_amount !== 0) {
      await updateCategoryData_expenseCategory_amounts(
        category_id,
        transactions_amount.amount,
        category_data,
        creation_date
      );
    }
  });
