const app = require("../../express")();
const realIncomeController = require("./real_income.controllers");
const expected_incomeController = require("../expected income/expected_income.controllers");
const {
  addingAWeekRealIncomeAmountAndUpdatingRealIncomeTotalAmount,
  createRealIncomeIfItDoesNotExists,
  addingACashIncomeAmountAndUpdatingRealIncomeTotalAmount,
  verifyingIfRealIncomeExistsByUserIdAndMonthYear,
} = require("./real_income.handlers");
const workingAppsController = require("../working_apps/working_apps.controllers");

app.get("/real_income_byUserId", (req, res) => {
  const user_id = req.query.user_id;
  (async () => {
    try {
      const realIncomes = await realIncomeController.getRealIncomeByUserId(
        user_id
      );
      realIncomes
        ? res.status(200).json(realIncomes)
        : res
            .status(404)
            .send({ status: "404", msg: "REAL INCOMES NOT FOUND" });
    } catch (error) {
      return res.status(404).send({
        status: "500",
        msg: error,
      });
    }
  })();
});

app.get("/realIncomeByUserId_MonthYear", (req, res) => {
  const user_id = req.query.user_id;
  const month_year = req.query.month_year;
  console.log("USER ID:", user_id);
  console.log("MONTH YEAR:", month_year);
  (async () => {
    try {
      await realIncomeController
        .getRealIncome_ByUser_ID_And_MonthYear(user_id, month_year)
        .then((real_income) => {
          real_income
            ? res.status(200).json(real_income)
            : res.status(404).send({
                status: "404",
                msg: `REAL INCOME WITH USER_ID: ${user_id} AND MONTH YEAR: ${month_year} WAS NOT FOUND`,
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

app.get("/income_comparison_by_monthYear", (req, res) => {
  const user_id = req.query.user_id;
  const month_year = req.query.month_year;
  console.log("USER ID:", user_id);
  console.log("MONTH YEAR:", month_year);
  (async () => {
    try {
      const gettingRealIncome =
        await realIncomeController.getRealIncome_ByUser_ID_And_MonthYear(
          user_id,
          month_year
        );

      if (gettingRealIncome) {
        const { total_amount } = gettingRealIncome;
        console.log("TOTAL AMOUNT:", total_amount);
        const expected_income =
          await expected_incomeController.getExpectedIncomeByID(user_id);
        const { expected_incomes } = expected_income;

        const index = expected_incomes.findIndex(
          (obj) => obj.month_year === month_year
        );

        const expected_income_amount = expected_incomes[index].amount;
        console.log("EXPECTED INCOME AMOUNT:", expected_income_amount);

        const comparison_response = {
          total_amount: total_amount,
          expected_income_amount: expected_income_amount,
        };
        expected_income_amount
          ? res.status(200).json(comparison_response)
          : res.status(404).send({
              status: "404",
              msg: "REAL INCOME WITH USER_ID: ${user_id} AND MONTH YEAR: ${month_year} WAS NOT FOUND",
            });
      }

      if (!gettingRealIncome) {
        res.status(404).send({
          status: "404",
          msg: `REAL INCOME WITH USER_ID: ${user_id} AND MONTH YEAR: ${month_year} WAS NOT FOUND. TRY ANOTHER MONTH YEAR`,
        });
      }
    } catch (error) {
      return res.status(404).send({
        status: "500",
        msg: error,
      });
    }
  })();
});

app.post("/createRealIncome", (req, res) => {
  const user_id = req.body.user_id;
  const creation_date = req.body.creation_date;
  const month_year = req.body.month_year;

  (async () => {
    try {
      const isVerified = await verifyingIfRealIncomeExistsByUserIdAndMonthYear(
        user_id,
        month_year
      );
      console.log("IS REAL INCOME VERIFIED:", isVerified);
      if (isVerified) {
        return res.status(200).send({
          status: "200",
          msg: "REAL INCOME ALREADY EXISTS",
        });
      }
      if (!isVerified) {
        console.log("REAL INCOME DOES NOT EXIST SO WE CONTINUE WITH CREATION");
        const getting_working_apps =
          await workingAppsController.getAllWorkApps();
        console.log("THESE ARE THE WORK APPS:", getting_working_apps);

        const real_income_ToCreate = {
          user_id: user_id,
          month_year,
          total_amount: 0,
          work_apps: getting_working_apps,
          creation_date,
        };
        console.log("THIS IS REAL INCOME TIO CREATE:", real_income_ToCreate);

        const real_income_created = await realIncomeController.createRealIncome(
          real_income_ToCreate
        );
        console.log("REAL INCOME CREATED AT ROUTE:", real_income_created);
        res.status(201).json(real_income_created);
      }
    } catch (error) {
      return res.status(500).send({
        status: "Failed",
        msg: error,
      });
    }
  })();
});

//** Updating a real income by adding a new week income
app.put("/addingWeekIncome", (req, res) => {
  const { user_id, month_year, app_id, week_name, earned_amount } = req.body;

  (async () => {
    try {
      // **********************************************************************
      const real_income_toUpdate =
        await realIncomeController.getRealIncome_ByUser_ID_And_MonthYear(
          user_id,
          month_year
        );

      if (real_income_toUpdate) {
        const real_income_updated =
          await addingAWeekRealIncomeAmountAndUpdatingRealIncomeTotalAmount(
            real_income_toUpdate,
            app_id,
            week_name,
            earned_amount
          );
        real_income_updated
          ? res.status(200).json(real_income_updated)
          : res.status(503).send({
              status: "503",
              msg: "REAL INCOME NOT UPDATED - SERVER UNAVAILABLE",
            });
      }

      if (!real_income_toUpdate) {
        const real_income_created = await createRealIncomeIfItDoesNotExists(
          user_id,
          month_year
        );

        const real_income_updated =
          await addingAWeekRealIncomeAmountAndUpdatingRealIncomeTotalAmount(
            real_income_created,
            app_id,
            week_name,
            earned_amount
          );

        real_income_updated
          ? res.status(201).json(real_income_updated)
          : res.status(503).send({
              status: "503",
              msg: "REAL INCOME NOT NOT FOUND - IT DOES NEED TO BE CREATED",
            });
      }
    } catch (error) {
      return res.status(500).send({
        status: "Failed",
        msg: error,
      });
    }
  })();
});

//** Updating a real income by adding cash
app.put("/addingCashIncome", (req, res) => {
  const { user_id, month_year, app_id, earned_amount } = req.body;

  (async () => {
    try {
      // **********************************************************************
      const real_income_toUpdate =
        await realIncomeController.getRealIncome_ByUser_ID_And_MonthYear(
          user_id,
          month_year
        );

      if (real_income_toUpdate) {
        const real_income_updated =
          await addingACashIncomeAmountAndUpdatingRealIncomeTotalAmount(
            real_income_toUpdate,
            app_id,
            earned_amount
          );
        real_income_updated
          ? res.status(200).json(real_income_updated)
          : res.status(503).send({
              status: "503",
              msg: "REAL INCOME NOT UPDATED - SERVER UNAVAILABLE",
            });
      }

      if (!real_income_toUpdate) {
        const real_income_created = await createRealIncomeIfItDoesNotExists(
          user_id,
          month_year
        );

        const real_income_updated =
          await addingACashIncomeAmountAndUpdatingRealIncomeTotalAmount(
            real_income_created,
            app_id,
            earned_amount
          );

        real_income_updated
          ? res.status(201).json(real_income_updated)
          : res.status(503).send({
              status: "503",
              msg: "REAL INCOME NOT NOT FOUND - IT DOES NEED TO BE CREATED",
            });
      }
    } catch (error) {
      return res.status(500).send({
        status: "Failed",
        msg: error,
      });
    }
  })();
});

module.exports = app;
