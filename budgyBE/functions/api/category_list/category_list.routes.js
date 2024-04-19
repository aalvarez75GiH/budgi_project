const { v4: uuidv4 } = require("uuid");

const app = require("../../express")();

const {
  updateCategoryDataWithNewExpenseCategoryNameAndAmount,
  adding_a_single_new_expense_category_node_at_user_category_data,
  createCategoryDataAfterCategoryListCreation,
} = require("../category_data/category_data.handlers");

const {
  adding_a_single_new_expense_category_node_at_user_category_list,
  switchingExpenseCategoryNodeToSuspendedAtCategoryList,
} = require("./category_list.handlers");

const { updateUserFirstTimeField } = require("../users/triggers.operations");

const category_listController = require("./category_list.controllers");
const categoryDataController = require("../category_data/category_data.controllers");
const { updateCategoryListNode } = require("./category_list.handlers");

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
//** Update a Category List Expense Category node and Category Data's expense category node
app.put("/", (req, res) => {
  const {
    user_id,
    new_category_name,
    new_limit_amount,
    category_id,
    month_year,
    updated_on,
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
          updated_on
        );

      // *********************************************************************
      const category_list_by_user_id =
        await category_listController.getCategoryListByUserID(user_id);
      const category_list_toUpdate = await updateCategoryListNode(
        category_list_by_user_id,
        new_category_name,
        category_id,
        new_limit_amount
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

//** Updating Category List with new Expense Category node
app.put("/newUserExpenseCategory", (req, res) => {
  const { user_id, new_expense_category_node, mandatory } = req.body;

  (async () => {
    try {
      // ************* Adding a new expense category node at user Category list *****************************
      const category_list_by_user_id =
        await category_listController.getCategoryListByUserID(user_id);

      const newNodeAtCategoryList =
        await adding_a_single_new_expense_category_node_at_user_category_list(
          new_expense_category_node,
          mandatory,
          category_list_by_user_id
        );

      console.log("NEW NODE:", newNodeAtCategoryList);

      const { category_list_updated } = newNodeAtCategoryList;

      // ************* Adding a new expense category node at user Categories data *****************************
      await adding_a_single_new_expense_category_node_at_user_category_data(
        user_id,
        new_expense_category_node,
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

const suspendingExpenseCategoryNodeAtUserCategoriesData = async (
  user_id,
  category_id
) => {
  try {
    const categories_data_toUpdate =
      await categoryDataController.getCategoryDataByUserID(user_id);

    categories_data_toUpdate.map((category_data) => {
      const { category_data_expenseCategories } = category_data;
      const index = category_data_expenseCategories.findIndex(
        (obj) => obj.category_id === category_id
      );
      const node = category_data_expenseCategories[index];
      if (node.category_id === category_id) {
        node.status = "suspended";
      }
      categoryDataController.updateCategoryData(category_data);
    });
    return categories_data_toUpdate;
  } catch (error) {
    console.log(error);
  }
};

app.put("/suspendExpenseCategory", (req, res) => {
  const { user_id, category_id } = req.body;

  (async () => {
    try {
      // ** Suspending expense category node at Categories Data
      const categories_data_updated =
        await suspendingExpenseCategoryNodeAtUserCategoriesData(
          user_id,
          category_id
        );

      // ** Suspending expense category node at Category List
      const category_list_by_user_id =
        await category_listController.getCategoryListByUserID(user_id);
      const category_list_toUpdate =
        switchingExpenseCategoryNodeToSuspendedAtCategoryList(
          category_id,
          category_list_by_user_id
        );

      await category_listController.updateCategoryList(category_list_toUpdate);

      // ** Responding with categories Data and Category List
      const categoryListAndCategoriesDataUpdatedResponse = {
        category_list_updated: category_list_toUpdate,
        categories_data_updated: categories_data_updated,
      };
      res.status(200).json(categoryListAndCategoriesDataUpdatedResponse);
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

// ******* Working in progress ************************
// const { limit_amount } = new_category;
// console.log((Math.round(limit_amount * 100) / 100).toFixed(2));
// let USDollar = new Intl.NumberFormat("en-US", {
//   style: "currency",
//   currency: "USD",
// });
// console.log(
//   `The formated version of ${limit_amount} is ${USDollar.format(
//     limit_amount
//   )}`
// );
// ******************************************************
