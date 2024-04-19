const { creatingMonthYear } = require("../calendars data/calendar.info");
const workingAppsController = require("../working_apps/working_apps.controllers");
const realIncomeController = require("./real_income.controllers");

// *** This is executed when users enter for 1st time and creates expected income
const createRealIncomesAfterExpectedIncomeCreation = async (
  expected_income_created
) => {
  const { creation_date, user_id } = expected_income_created;
  const month_year = creatingMonthYear(creation_date);
  console.log(month_year);

  const getting_working_apps = await workingAppsController.getAllWorkApps();

  console.log("WORKING APPS IN REAL INCOME HANDLER:", getting_working_apps);

  const real_income_ToCreate = {
    user_id: user_id,
    month_year,
    total_amount: 0,
    work_apps: getting_working_apps,
    creation_date,
  };
  const real_incomes_created =
    await realIncomeController.createRealIncomesAutomaticallyForNewUsers(
      real_income_ToCreate
    );

  return real_incomes_created;
};

const createRealIncomeIfItDoesNotExists = async (
  user_id,
  month_year,
  app_id,
  week_name,
  earned_amount
) => {
  const getting_working_apps = await workingAppsController.getAllWorkApps();

  console.log(
    "WORKING APPS IN CREATE JUST ONE REAL INCOME FCN:",
    getting_working_apps
  );

  const creation_date = new Date();

  const real_income_ToCreate = {
    user_id: user_id,
    month_year,
    total_amount: 0,
    work_apps: getting_working_apps,
    creation_date,
  };

  const real_income_created = await realIncomeController.createRealIncome(
    real_income_ToCreate
  );

  console.log("REAL INCOME CREATED AT HANDLER:", real_income_created);

  return real_income_created;
};

const addingAWeekRealIncomeAmountAndUpdatingRealIncomeTotalAmount = async (
  real_income_toUpdate,
  app_id,
  week_name,
  earned_amount
) => {
  const { work_apps } = real_income_toUpdate;

  // ******************** Updating week node: earned amount ***************
  const index = work_apps.findIndex((obj) => obj.app_id === app_id);
  const app_to_update = work_apps[index];
  const weeks = app_to_update.weeks;
  const week_index = weeks.findIndex((obj) => obj.week_name === week_name);
  const week_to_update = weeks[week_index];
  week_to_update.earned_amount = earned_amount;

  // ******************** Updating app:  collected money ***************

  const collected_money = weeks.reduce((acc, obj) => {
    return acc + obj.earned_amount;
  }, 0);

  app_to_update.collected_money = collected_money;

  // ******************** Updating Real income:  Total amount ***************

  const total_amount = work_apps.reduce((acc, obj) => {
    return acc + obj.collected_money;
  }, 0);
  console.log("TOTAL AMOUNT:", total_amount);
  real_income_toUpdate.total_amount = total_amount;

  // **********************************************************************

  const real_income_updated = await realIncomeController.updateRealIncome(
    real_income_toUpdate
  );
  console.log("REAL INCOME UPDATED:", real_income_updated);
  return real_income_updated;
};

const addingACashIncomeAmountAndUpdatingRealIncomeTotalAmount = async (
  real_income_toUpdate,
  app_id,
  earned_amount
) => {
  const { work_apps } = real_income_toUpdate;

  // ******************** Updating week node: earned amount ***************
  const index = work_apps.findIndex((obj) => obj.app_id === app_id);
  const app_to_update = work_apps[index];
  app_to_update.collected_money = app_to_update.collected_money + earned_amount;
  //   const weeks = app_to_update.weeks;
  //   const week_index = weeks.findIndex((obj) => obj.week_name === week_name);
  //   const week_to_update = weeks[week_index];
  //   week_to_update.earned_amount = earned_amount;

  // ******************** Updating app:  collected money ***************

  //   const collected_money = weeks.reduce((acc, obj) => {
  //     return acc + obj.earned_amount;
  //   }, 0);

  //   app_to_update.collected_money = collected_money;

  // ******************** Updating Real income:  Total amount ***************

  const total_amount = work_apps.reduce((acc, obj) => {
    return acc + obj.collected_money;
  }, 0);
  console.log("TOTAL AMOUNT:", total_amount);
  real_income_toUpdate.total_amount = total_amount;

  // **********************************************************************

  const real_income_updated = await realIncomeController.updateRealIncome(
    real_income_toUpdate
  );
  console.log("REAL INCOME UPDATED:", real_income_updated);
  return real_income_updated;
};

module.exports = {
  createRealIncomesAfterExpectedIncomeCreation,
  addingAWeekRealIncomeAmountAndUpdatingRealIncomeTotalAmount,
  createRealIncomeIfItDoesNotExists,
  addingACashIncomeAmountAndUpdatingRealIncomeTotalAmount,
};
