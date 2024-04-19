const { v4: uuidv4 } = require("uuid");

const { db } = require("../../fb");

const getAllExpectedIncomes = async () => {
  return await db
    .collection("expected_income")
    .get()
    .then((data) => {
      let expected_incomes = [];
      let docs = data.docs;
      if (docs.length) {
        docs.map((doc) => {
          const selectedExpectedIncome = {
            user_id: doc.data().user_id,
            creation_date: doc.data().creation_date,
            expected_income_id: doc.data().expected_income_id,
            expected_incomes: doc.data().expected_incomes,
          };

          expected_incomes.push(selectedExpectedIncome);
        });
        return expected_incomes;
      }
      if (!docs.length) {
        return expected_incomes;
      }
    });
};

const getExpectedIncomeByID = async (user_id) => {
  console.log("USER_ID AT CONTROLLER:", user_id);
  let found_expectedIncome;
  await db
    .collection("expected_income")
    .where(`user_id`, "==", user_id)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log("THIS IS DOC:", doc.data());
        found_expectedIncome = doc.data();
      });
    });
  return found_expectedIncome;
};

const createExpectedIncome = async (expected_income) => {
  const expected_income_id = uuidv4();
  const expected_income_toCreate = {
    ...expected_income,
    expected_income_id,
  };

  await db
    .collection("expected_income")
    .doc(`/${expected_income_id}/`)
    .create(expected_income_toCreate);
  return expected_income_toCreate;
};

const updateExpectedIncome = async (expected_income_toUpdate) => {
  await db
    .collection("expected_income")
    .doc(expected_income_toUpdate.expected_income_id)
    .update(expected_income_toUpdate);
  return expected_income_toUpdate;
};

const deleteExpectedIncome = async (expected_income_id) => {
  await db
    .collection("expected_income")
    .doc(`/${expected_income_id}/`)
    .delete();
};

const deleteExpectedIncomeByUserID = async (user_id) => {
  await db
    .collection("expected_income")
    .where(`user_id`, "==", user_id)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log("THIS IS DOC:", doc.data());
        deleteExpectedIncome(doc.data().expected_income_id);
      });
    });
};

module.exports = {
  getAllExpectedIncomes,
  getExpectedIncomeByID,
  createExpectedIncome,
  updateExpectedIncome,
  deleteExpectedIncome,
  deleteExpectedIncomeByUserID,
};
