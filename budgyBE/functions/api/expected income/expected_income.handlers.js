const expected_incomeController = require("../expected income/expected_income.controllers");
const { creatingMonthYear } = require("../calendars data/calendar.info");

const addingNode = async (
  user_id,
  expected_incomes,
  month_year,
  expected_income_id,
  expected_income_creation_date
) => {
  const creation_date = expected_income_creation_date;
  const last_expected_income = expected_incomes[expected_incomes.length - 1];
  console.log(last_expected_income);

  // prepare and update expected income
  const expected_income_toPush = {
    amount: last_expected_income.amount,
    month_year,
    updated: true,
  };
  console.log("EXPECTED INCOME TO PUSH:", expected_income_toPush);
  expected_incomes.push(expected_income_toPush);
  const expected_income_toUpdate = {
    user_id,
    creation_date,
    expected_incomes,
    expected_income_id,
  };
  console.log("EXPECTED INCOME TO UPDATE:", expected_income_toUpdate);
  await expected_incomeController.updateExpectedIncome(
    expected_income_toUpdate
  );

  return;
};

module.exports.addingExpectedIncomeNodeIfDoesNotExists = async (
  user_id,
  creation_date,
  expected_incomes,
  expected_income_id,
  expected_income_creation_date
) => {
  const month_year = creatingMonthYear(creation_date);
  console.log("MONTH YEAR:", month_year);

  index = expected_incomes.findIndex((obj) => obj.month_year === month_year);
  console.log("INDEX:", index);

  if (index === -1) {
    await addingNode(
      user_id,
      expected_incomes,
      month_year,
      expected_income_id,
      expected_income_creation_date
    );
    return;
  }
  return;
};

module.exports.validation_andOr_update_process_of_a_new_expected_income_node =
  async (
    user_id,
    expected_incomes,
    new_expected_income,
    expected_income_id,
    index,
    creation_date
  ) => {
    if (index === -1) {
      expected_incomes.push(new_expected_income);

      const expected_income_toUpdate = {
        user_id,
        creation_date,
        expected_income_id,
        expected_incomes,
      };
      const expected_income_updated =
        await expected_incomeController.updateExpectedIncome(
          expected_income_toUpdate
        );

      return expected_income_updated;
    }
    if (index !== -1) {
      expected_incomes[index].amount = new_expected_income.amount;
      const expected_income_toUpdate = {
        user_id,
        creation_date,
        expected_income_id,
        expected_incomes,
      };
      const expected_income_updated =
        await expected_incomeController.updateExpectedIncome(
          expected_income_toUpdate
        );

      return expected_income_updated;
    }
  };
