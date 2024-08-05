const { v4: uuidv4 } = require("uuid");
const { db } = require("../../fb");

// const { creatingMonthYear } = require("../calendars data/calendar.info");
const { monthsArray } = require("../calendars data/calendar.info");

const getRealIncomeByUserId = async (user_id) => {
  let found_realIncomeList = [];
  await db
    .collection("real_income")
    .where("user_id", "==", user_id)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        found_realIncomeList.push(doc.data());
      });
    });
  // console.log("CATEGORY LIST AT CONTROLLER:", found_categoryList);
  return found_realIncomeList;
};

// ** get Real Income by user ID, Category ID and Month_year controller
const getRealIncome_ByUser_ID_And_MonthYear = async (user_id, month_year) => {
  // console.log("USER ID:", user_id);
  // console.log("MONTH YEAR:", month_year);
  let found_realIncome;
  await db
    .collection("real_income")
    .where(`user_id`, "==", user_id)
    .where(`month_year`, "==", month_year)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // console.log("THIS IS DOC:", doc.data());
        found_realIncome = doc.data();
      });
    });
  return found_realIncome;
};

const createRealIncome = async (real_income_ToCreate) => {
  const { creation_date, month_year } = real_income_ToCreate;
  console.log("REAL INCOME TO CREATE AT CONTROLLER:", real_income_ToCreate);

  const real_income_id = uuidv4();
  const real_income = {
    ...real_income_ToCreate,
    real_income_id,
    month_year: month_year,
    creation_date,
  };
  console.log("REAL INCOME JUST BEFORE DB AT CONTROLLER:", real_income);
  await db
    .collection("real_income")
    .doc(`/${real_income_id}/`)
    .create(real_income);
  return real_income_ToCreate;
};

const createRealIncomesAutomaticallyForNewUsers = async (real_income) => {
  const { month_year } = real_income;

  //Find index of specific object using findIndex method.
  objIndex = monthsArray.findIndex((obj) => obj === month_year);

  let real_incomes_created = [];
  monthsArray
    .filter((item, index) => index <= objIndex)
    .map(async (filteredItem) => {
      const real_income_id = uuidv4();
      const real_income_toCreate = {
        ...real_income,
        real_income_id,
        month_year: filteredItem,
      };
      real_incomes_created.push(real_income_toCreate);
      await db
        .collection("real_income")
        .doc(`/${real_income_id}/`)
        .create(real_income_toCreate);
      // return category_data;
    });

  return real_incomes_created;
};

// ** Update Money Amounts of 'user expense category' at user category Data
const updateRealIncome = async (real_income_toUpdate) => {
  await db
    .collection("real_income")
    .doc(real_income_toUpdate.real_income_id)
    .update(real_income_toUpdate);
  return real_income_toUpdate;
};

// ** delete a Real Income
const deleteRealIncome = async (real_income_id) => {
  await db.collection("real_income").doc(real_income_id).delete();
  return real_income_id;
};

const deleteRealIncomesByUserID = async (user_id) => {
  console.log("USER ID AT REAL INCOME CONTROLLER:", user_id);
  db.collection("real_income")
    .where(`user_id`, "==", user_id)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        deleteRealIncome(doc.data().real_income_id);
      });
    });
};

module.exports = {
  getRealIncomeByUserId,
  getRealIncome_ByUser_ID_And_MonthYear,
  createRealIncome,
  createRealIncomesAutomaticallyForNewUsers,
  updateRealIncome,
  deleteRealIncomesByUserID,
};
