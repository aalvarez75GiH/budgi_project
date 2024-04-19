const app = require("../../express")();
const expenseCategoryController = require("./expense_category.controllers");

//******************** GETS ****************************************
//** Getting all Expenses categories
app.get("/", (req, res) => {
  (async () => {
    try {
      await expenseCategoryController
        .getAllExpensesCategories()
        .then((expenses_categories) => {
          expenses_categories.length
            ? res.status(200).json(expenses_categories)
            : res.status(404).send({
                status: "404",
                msg: "EXPENSES CATEGORIES WERE NOT FOUND",
              });
        });
    } catch (error) {
      return res.status(500).send({
        status: "Failed",
        msg: error,
      });
    }
  })();
});

//** Getting a expense category by ID
app.get("/expenseCategoryById", (req, res) => {
  const expense_category_id = req.query.expense_category_id;
  (async () => {
    try {
      await expenseCategoryController
        .getExpenseCategoryById(expense_category_id)
        .then((expense_category) => {
          expense_category
            ? res.status(200).json(expense_category)
            : res
                .status(404)
                .send({ status: "404", msg: "EXPENSE CATEGORY NOT FOUND" });
        });
    } catch (error) {
      return res.status(404).send({
        status: "500",
        msg: error,
      });
    }
  })();
});

app.post("/", (req, res) => {
  //   const category_id = uuidv4();
  //   console.log("EXPENSE CATEGORY ID:", expense_category_id);
  const expense_category = {
    category_name: req.body.category_name,
    icon_path: req.body.icon_path,
    type: req.body.type,
    short_name: req.body.short_name,
    status: req.body.status,
  };

  (async () => {
    try {
      await expenseCategoryController
        .createExpenseCategory(expense_category)
        .then((data) => {
          console.log("EXPENSE CATEGORY AT ROUTE", data);
          res.json(expense_category);
        });
    } catch (error) {
      return res.status(500).send({
        status: "Failed",
        msg: error,
      });
    }
  })();
});

// ** Just for developing purposes
app.post("/postMultipleExpenseCategories", (req, res) => {
  const expense_categories = req.body.expense_categories;
  (async () => {
    expense_categories.map(async (expense_category) => {
      try {
        await expenseCategoryController
          .createExpenseCategory(expense_category)
          .then((data) => {
            // res.json(transaction);
            console.log("DATA", data);
          });
      } catch (error) {
        return res.status(500).send({
          status: "Failed",
          msg: error,
        });
      }
    });
    res.json(expense_categories);
  })();
});

app.put("/", (req, res) => {
  const expense_category = {
    category_name: req.body.category_name,
    expense_category_id: req.body.expense_category_id,
    icon_path: req.body.icon_path,
    type: req.body.type,
    limit_amount_by_percentage: req.body.limit_amount_by_percentage,
  };

  (async () => {
    try {
      await expenseCategoryController
        .updateExpenseCategory(expense_category)
        .then((data) => {
          console.log("EXPENSE CATEGORY AT ROUTE", data);
          res.json(expense_category);
        });
    } catch (error) {
      return res.status(500).send({
        status: "Failed",
        msg: error,
      });
    }
  })();
});

module.exports = app;
