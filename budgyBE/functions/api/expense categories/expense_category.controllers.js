const { v4: uuidv4 } = require("uuid");

const { db } = require("../../fb");

const getAllExpensesCategories = async () => {
  return await db
    .collection("expense_categories")
    .get()
    .then((data) => {
      let expenses_categories = [];
      let docs = data.docs;
      if (docs.length) {
        docs.map((doc) => {
          const selectedExpenseCategory = {
            category_name: doc.data().category_name,
            category_id: doc.data().category_id,
            icon_path: doc.data().icon_path,
            type: doc.data().type,
            limit_amount_by_percentage: doc.data().limit_amount_by_percentage,
            status: doc.data().status,
            short_name: doc.data().short_name,
          };
          expenses_categories.push(selectedExpenseCategory);
        });
        // res.status(200).json(expenses_categories);
        return expenses_categories;
      }
      if (!docs.length) {
        return expenses_categories;
      }
    });
};

// ** get a Expense category by ID
const getExpenseCategoryById = async (expense_category_id) => {
  console.log("EXPENSE CATEGORY_ID AT CONTROLLER:", expense_category_id);
  return await db
    .collection("expense_categories")
    .doc(expense_category_id)
    .get()
    .then((expense_category) => expense_category.data());
};

// ** Create a Expense category
const createExpenseCategory = async (expense_category) => {
  //   const { category_id } = expense_category;
  const category_id = uuidv4();
  const category_expenseToCreate = {
    ...expense_category,
    category_id,
  };
  await db
    .collection("expense_categories")
    .doc(`/${category_id}/`)
    .create(category_expenseToCreate);
  return expense_category;
};

const updateExpenseCategory = async (expense_category) => {
  await db
    .collection("expense_categories")
    .doc(expense_category.expense_category_id)
    .update(expense_category);
  return expense_category;
};

module.exports = {
  getAllExpensesCategories,
  getExpenseCategoryById,
  createExpenseCategory,
  updateExpenseCategory,
};
