const app = require("../../express")();
const category_dataController = require("./category_data.controllers");

//******************** GETS ****************************************
//** Getting all Category Data
app.get("/", (req, res) => {
  (async () => {
    try {
      await category_dataController
        .getAllCategoryData()
        .then((category_data) => {
          category_data.length
            ? res.status(200).json(category_data)
            : res.status(404).send({
                status: "404",
                msg: "CATEGORY DATA NOT FOUND",
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

//** Getting Category Data by user ID
app.get("/categoryDataByUserId", (req, res) => {
  const user_id = req.query.user_id;
  (async () => {
    try {
      await category_dataController
        .getCategoryDataByUserID(user_id)
        .then((category_data) => {
          console.log("CATEGORY DATA AT ROUTE:", category_data);
          category_data
            ? res.status(200).json(category_data)
            : res
                .status(404)
                .send({ status: "404", msg: "CATEGORY DATA NOT FOUND" });
        });
    } catch (error) {
      return res.status(404).send({
        status: "500",
        msg: error,
      });
    }
  })();
});

//** Getting Category Data by Month Year
app.get("/categoryDataByMonthYear", (req, res) => {
  const month_year = req.query.month_year;
  (async () => {
    try {
      await category_dataController
        .getCategoryDataByMonthYear(month_year)
        .then((category_data) => {
          console.log("CATEGORY DATA AT ROUTE:", category_data);
          category_data
            ? res.status(200).json(category_data)
            : res
                .status(404)
                .send({ status: "404", msg: "CATEGORY DATA NOT FOUND" });
        });
    } catch (error) {
      return res.status(404).send({
        status: "500",
        msg: error,
      });
    }
  })();
});

app.get("/categoryDataByUserId_MonthYear", (req, res) => {
  const user_id = req.query.user_id;
  const month_year = req.query.month_year;
  console.log("USER ID:", user_id);
  console.log("MONTH YEAR:", month_year);
  (async () => {
    try {
      await category_dataController
        .getCategoryData_ByUser_ID_And_MonthYear(user_id, month_year)
        .then((category_data) => {
          category_data
            ? res.status(200).json(category_data)
            : res.status(404).send({
                status: "404",
                msg: `CATEGORY DATA WITH USER_ID: ${user_id} AND MONTH YEAR: ${month_year} WAS NOT FOUND`,
              });
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

//** Post a category data V2
app.post("/", (req, res) => {
  const category_data = {
    user_id: req.body.user_id,
    creation_date: req.body.creation_date,
    expense_categories: req.body.expense_categories,
  };
  console.log("CATEGORY DATA AT ROUTES:", category_data);
  (async () => {
    try {
      await category_dataController
        .createCategoryData(category_data)
        .then((data) => {
          res.json(category_data);
          console.log("DATA", data);
        });
    } catch (error) {
      return res.status(500).send({
        status: "Failed",
        msg: error,
      });
    }
  })();
});

//******************** DELETES ****************************************
//** Delete Category Data by id
app.delete("/", (req, res) => {
  const category_data_id = req.query.category_data_id;

  (async () => {
    try {
      await category_dataController
        .deleteCategoryData(category_data_id)
        .then(() => {
          res.status(200).send({
            status: "Success",
            msg: `Category Data with ID: ${category_data_id} deleted successfully...`,
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

//** Delete Category Data's by user ID
app.delete("/deleteMultipleCategoryData", (req, res) => {
  const user_id = req.query.user_id;

  (async () => {
    try {
      await category_dataController
        .deleteMultipleCategoryDataByUserID(user_id)
        .then(() => {
          res.status(200).send({
            status: "Success",
            msg: "Category Data's deleted successfully...",
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
