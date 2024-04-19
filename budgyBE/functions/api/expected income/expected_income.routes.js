const app = require("../../express")();
const expected_incomeController = require("./expected_income.controllers");
const {
  validation_andOr_update_process_of_a_new_expected_income_node,
} = require("./expected_income.handlers");

const {
  createRealIncomesAfterExpectedIncomeCreation,
} = require("../real_income/real_income.handlers");

app.get("/", (req, res) => {
  (async () => {
    try {
      const allExpectedIncomes =
        await expected_incomeController.getAllExpectedIncomes();
      allExpectedIncomes
        ? res.status(200).json(allExpectedIncomes)
        : res
            .status(404)
            .send({ status: "404", msg: "EXPECTED INCOMES NOT FOUND" });
    } catch (error) {
      return res.status(404).send({
        status: "500",
        msg: error,
      });
    }
  })();
});

//** Getting Category List by user ID
app.get("/expectedIncomeByUserId", (req, res) => {
  const user_id = req.query.user_id;
  (async () => {
    try {
      await expected_incomeController
        .getExpectedIncomeByID(user_id)
        .then((expected_income) => {
          console.log("EXPECTED INCOME AT ROUTE:", expected_income);
          expected_income
            ? res.status(200).json(expected_income)
            : res
                .status(404)
                .send({ status: "404", msg: "EXCPECTED INCOME NOT FOUND" });
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
  const expected_income = {
    user_id: req.body.user_id,
    creation_date: req.body.creation_date,
    expected_incomes: req.body.expected_incomes,
  };

  (async () => {
    try {
      const expected_income_created =
        await expected_incomeController.createExpectedIncome(expected_income);

      // ****************************************************

      const real_incomes_created =
        await createRealIncomesAfterExpectedIncomeCreation(
          expected_income_created
        );

      // ****************************************************

      const expected_income_creation_response = {
        expected_income_created: expected_income_created,
        real_incomes_created: real_incomes_created,
      };

      expected_income_created
        ? res.status(201).json(expected_income_creation_response)
        : res.status(503).send({
            status: "503",
            msg: "EXPECTED INCOME NOT CREATED - SERVER UNAVAILABLE",
          });
    } catch (error) {
      return res.status(500).send({
        status: "Failed",
        msg: error,
      });
    }
  })();
});

app.put("/addExpectedIncomeNode", (req, res) => {
  const { user_id, new_expected_income, month_year } = req.body;

  console.log("NEW EXPECTED INCOME:", new_expected_income);
  //   console.log("CATEGORY DATA AT ROUTES:", expected_income);
  (async () => {
    try {
      const expected_income =
        await expected_incomeController.getExpectedIncomeByID(user_id);

      const { expected_incomes, creation_date, expected_income_id } =
        expected_income;

      index = expected_incomes.findIndex(
        (obj) => obj.month_year === month_year
      );

      const expected_income_updated =
        await validation_andOr_update_process_of_a_new_expected_income_node(
          user_id,
          expected_incomes,
          new_expected_income,
          expected_income_id,
          index,
          creation_date
        );

      console.log("EXPECTED INCOME UPDATED EP", expected_income_updated);

      res.status(200).json(expected_income_updated);
    } catch (error) {
      return res.status(500).send({
        status: "Failed",
        msg: error,
      });
    }
  })();
});

//** Delete Category Data's by user ID
app.delete("/", (req, res) => {
  const expected_income_id = req.query.id;

  (async () => {
    try {
      await expected_incomeController
        .deleteExpectedIncome(expected_income_id)
        .then(() => {
          res.status(200).send({
            status: "Success",
            msg: "Expected income deleted successfully...",
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
