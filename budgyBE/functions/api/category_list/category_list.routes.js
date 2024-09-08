const { v4: uuidv4 } = require("uuid");

const app = require("../../express")();
let number = 4;
const {
  updateCategoryDataWithNewExpenseCategoryNameAndAmount,
  adding_a_single_new_expense_category_node_at_user_category_data,
  createCategoryDataAfterCategoryListCreation,
  preparingBudgetedAndSpentTotalAmountsOfACategoryData,
} = require("../category_data/category_data.handlers");

const {
  adding_a_single_new_expense_category_node_at_user_category_list,
  switchingExpenseCategoryNodeToSuspendedAtCategoryList,
  removingExpenseCategoryNodeFromCategoryList,
  removingExpenseCategoryNodeAtUserCategoriesData,
  suspendingExpenseCategoryNodeAtUserCategoriesData,
} = require("./category_list.handlers");

const { updateUserFirstTimeField } = require("../users/triggers.operations");

const category_listController = require("./category_list.controllers");
const categoryDataController = require("../category_data/category_data.controllers");
const { updateCategoryListNode } = require("./category_list.handlers");
const {
  getTransactions_ByUser_ID_Cat_ID,
} = require("../transactions/transactions.controllers");

//** Getting all Category List
app.get("/", (req, res) => {
  (async () => {
    try {
      await category_listController
        .getAllCategoryList()
        .then((category_lists) => {
          console.log("CATEGORY LIST AT ROUTE:", category_lists);
          category_lists
            ? res.status(200).json(category_lists)
            : res
                .status(404)
                .send({ status: "404", msg: "CATEGORY LISTS NOT FOUND" });
        });
    } catch (error) {
      return res.status(404).send({
        status: "500",
        msg: error,
      });
    }
  })();
});

//** Getting Category List by user ID
app.get("/categoryListByUserId", (req, res) => {
  const user_id = req.query.user_id;
  (async () => {
    try {
      await category_listController
        .getCategoryListByUserID(user_id)
        .then((category_list) => {
          console.log("CATEGORY LIST AT ROUTE:", category_list);
          category_list
            ? res.status(200).json(category_list)
            : res
                .status(404)
                .send({ status: "404", msg: "CATEGORY LIST NOT FOUND" });
        });
    } catch (error) {
      return res.status(404).send({
        status: "500",
        msg: error,
      });
    }
  })();
});

//******************** POSTS ****************************************

//** Post a category list
app.post("/", async (req, res) => {
  const category_list_id = uuidv4();
  const { user_id, creation_date, expense_categories } = req.body;

  const category_list_toCreate = {
    user_id,
    creation_date,
    expense_categories,
    category_list_id,
  };

  (async () => {
    try {
      const category_list_created =
        await category_listController.createCategoryList(
          category_list_toCreate
        );

      const { user_id } = category_list_created;
      await updateUserFirstTimeField(user_id);

      console.log("CATEGORY_LIST_CREATED AT CL ROUTE:", category_list_created);
      const categories_data_created =
        await createCategoryDataAfterCategoryListCreation(
          category_list_created
        );
      console.log("RESPONSE:", categories_data_created);

      const category_list_creation_response = {
        categories_list_created: category_list_created,
        categories_data_created: categories_data_created,
      };

      category_list_created
        ? res.status(201).json(category_list_creation_response)
        : res.status(503).send({
            status: "503",
            msg: "ERROR 503 - CATEGORY LIST WAS NOT CREATED - SERVER UNAVAILABLE OR NETWORK ERROR",
          });
    } catch (error) {
      return res.status(500).send({
        status: "Failed",
        msg: error,
      });
    }
  })();
});

//******************** PUTS *****************************************************************

//** Updating Category List with new Expense Category node
app.put("/newUserExpenseCategory", (req, res) => {
  const new_category_category_id = uuidv4();
  const { user_id, new_expense_category_node, mandatory } = req.body;

  const new_expense_category_toCreate = {
    ...new_expense_category_node,
    category_id: new_category_category_id,
  };

  (async () => {
    try {
      // ************* Adding a new expense category node at user Category list *****************************
      const category_list_by_user_id =
        await category_listController.getCategoryListByUserID(user_id);

      const newNodeAtCategoryList =
        await adding_a_single_new_expense_category_node_at_user_category_list(
          new_expense_category_toCreate,
          mandatory,
          category_list_by_user_id
        );

      console.log("NEW NODE:", newNodeAtCategoryList);

      const { category_list_updated } = newNodeAtCategoryList;

      // ************* Adding a new expense category node at user Categories data *****************************
      await adding_a_single_new_expense_category_node_at_user_category_data(
        user_id,
        new_expense_category_toCreate,
        mandatory
      );

      const category_data_updated_with_new_node =
        await categoryDataController.getCategoryDataByUserID(user_id);

      // ******************************************
      if (newNodeAtCategoryList.status === "Success") {
        res.status(201).json({
          category_list_updated: category_list_updated,
          category_data_updated_with_new_node:
            category_data_updated_with_new_node,
        });
      }

      if (newNodeAtCategoryList.status === "Same name or ID") {
        res.status(200).send({
          status: "Same name or ID",
          msg: "Expense Category already exists....",
        });
      }

      // ******************************************
    } catch (error) {
      return res.status(500).send({
        status: "Failed",
        msg: error,
      });
    }
  })();
});

//** Update a Category List Expense Category node and Category Data's expense category node
app.put("/updateUserExpenseCategory", (req, res) => {
  const {
    user_id,
    new_category_name,
    new_limit_amount,
    category_id,
    month_year,
    updated_on,
    new_short_name,
    status,
  } = req.body;

  (async () => {
    try {
      const categories_data_updated =
        await updateCategoryDataWithNewExpenseCategoryNameAndAmount(
          user_id,
          new_category_name,
          new_limit_amount,
          category_id,
          month_year,
          updated_on,
          new_short_name,
          status
        );

      // *********************************************************************
      const category_list_by_user_id =
        await category_listController.getCategoryListByUserID(user_id);
      const category_list_toUpdate = await updateCategoryListNode(
        category_list_by_user_id,
        new_category_name,
        category_id,
        new_limit_amount,
        new_short_name,
        status
      );

      await category_listController.updateCategoryList(category_list_toUpdate);
      const category_list_update_response = {
        category_list_updated: category_list_toUpdate,
        categories_data_updated: categories_data_updated,
      };
      res.status(200).json(category_list_update_response);
    } catch (error) {
      return res.status(500).send({
        status: "Failed",
        msg: error,
      });
    }
  })();
});

//******************** DELETES *****************************************************************

app.delete("/deleteExpenseCategory", (req, res) => {
  const user_id = req.query.user_id;
  const category_id = req.query.category_id;
  console.log("USER ID AT DELETE EXPENSE CATEGORY ENDPOINT:", user_id);
  console.log("CATEGORY ID AT DELETE EXPENSE CATEGORY ENDPOINT:", category_id);
  (async () => {
    try {
      const transactions_by_category_id =
        await getTransactions_ByUser_ID_Cat_ID(user_id, category_id);
      console.log(
        "TRANSACTIONS BY CATEGORY ID AT ENDPOINT:",
        JSON.stringify(transactions_by_category_id, null, 2)
      );
      // ** Suspending expense category node if we find transactions by category id
      if (transactions_by_category_id.length) {
        // *********************************************************
        const categories_data_updated =
          await suspendingExpenseCategoryNodeAtUserCategoriesData(
            user_id,
            category_id
          );

        const category_list_by_user_id =
          await category_listController.getCategoryListByUserID(user_id);
        const category_list_toUpdate =
          switchingExpenseCategoryNodeToSuspendedAtCategoryList(
            category_id,
            category_list_by_user_id
          );

        await category_listController.updateCategoryList(
          category_list_toUpdate
        );

        const categoryListAndCategoriesDataUpdatedResponse = {
          category_list_updated: category_list_toUpdate,
          categories_data_updated: categories_data_updated,
          operation_status: "expense_category_suspended",
        };
        // *********************************************************
        res.status(201).json(categoryListAndCategoriesDataUpdatedResponse);
      }
      // ** Deleting expense category node if we DO NOT find transactions by category id
      if (!transactions_by_category_id.length) {
        const categories_data_updated =
          await removingExpenseCategoryNodeAtUserCategoriesData(
            user_id,
            category_id
          );

        const category_list_by_user_id =
          await category_listController.getCategoryListByUserID(user_id);

        const category_list_toUpdate =
          removingExpenseCategoryNodeFromCategoryList(
            category_id,
            category_list_by_user_id
          );
        await category_listController.updateCategoryList(
          category_list_toUpdate
        );
        const categoryListAndCategoriesDataUpdatedResponse = {
          category_list_updated: category_list_toUpdate,
          categories_data_updated: categories_data_updated,
          operation_status: "expense_category_removed",
        };
        res.status(201).json(categoryListAndCategoriesDataUpdatedResponse);
      }

      // ******************************************
    } catch (error) {
      return res.status(500).send({
        status: "Failed",
        msg: error,
      });
    }
  })();
});

//******************** DELETES ****************************************
//** Delete Category list by category list Id
app.delete("/deleteCategoryList", (req, res) => {
  const category_list_id = req.query.category_list_id;

  (async () => {
    try {
      await category_listController
        .deleteCategoryList(category_list_id)
        .then(() => {
          res.status(200).send({
            status: "Success",
            msg: "Category list deleted successfully...",
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

//** Delete Category list by user Id
app.delete("/deleteCategoryListByUserID", (req, res) => {
  const user_id = req.query.user_id;

  (async () => {
    try {
      await category_listController
        .deleteCategoryListByUserId(user_id)
        .then(() => {
          res.status(200).send({
            status: "Success",
            msg: "Category list deleted successfully...",
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
module.exports = app;
