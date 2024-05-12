const { v4: uuidv4 } = require("uuid");

const { db } = require("../../fb");
const { monthsArray } = require("../calendars data/calendar.info");

const { creatingMonthYear } = require("../../api/calendars data/calendar.info");

// ** get All category data controller
const getAllCategoryData = async () => {
  return await db
    .collection("category_data")
    .get()
    .then((data) => {
      let categoryData = [];
      let docs = data.docs;
      if (docs.length) {
        docs.map((doc) => {
          const selectedCategoryData = {
            user_id: doc.data().user_id,
            creation_date: doc.data().creation_date,
            month_year: doc.data().month_year,
            category_data_id: doc.data().category_data_id,
            expense_categories: doc.data().expense_categories,
          };
          categoryData.push(selectedCategoryData);
        });
        return categoryData;
      }
      if (!docs.length) {
        return categoryData;
      }
    });
};

// ** get Category data by user ID controller
const getCategoryDataByUserID = async (user_id) => {
  let found_categoryData = [];
  await db
    .collection("category_data")
    .where(`user_id`, "==", user_id)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        found_categoryData.push(doc.data());
      });
    });
  return found_categoryData;
};

// ** get Category data by user ID controller
const getCategoryDataByMonthYear = async (month_year) => {
  // console.log("MONTH YEAR AT CONTROLLER:", month_year);
  let found_categoryData = [];
  await db
    .collection("category_data")
    .where(`month_year`, "==", month_year)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log("THIS IS DOC:", doc.data());
        found_categoryData.push(doc.data());
      });
    });
  return found_categoryData;
};

// ** get Category data by user ID, Category ID and Month_year controller

const getCategoryData_ByUser_ID_And_MonthYear = async (user_id, month_year) => {
  console.log("USER_ID AT CONTROLLER:", user_id);
  console.log("MONTH_YEAR AT CONTROLLER:", month_year);
  let found_categoryData;
  await db
    .collection("category_data")
    .where(`user_id`, "==", user_id)
    .where(`month_year`, "==", month_year)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        found_categoryData = doc.data();
      });
    });
  return found_categoryData;
};

// ** Create Category data for new users - depending of month year we filter months from months array to create all category data's needed.
const createCategoryDataAutomaticallyForNewUsers = async (category_data) => {
  const { creation_date } = category_data;
  const month_year = creatingMonthYear(creation_date);

  //Find index of specific object using findIndex method.
  objIndex = monthsArray.findIndex((obj) => obj === month_year);

  let categories_data_created = [];
  monthsArray
    .filter((item, index) => index <= objIndex)
    .map(async (filteredItem) => {
      const category_data_id = uuidv4();
      const category_data_toCreate = {
        ...category_data,
        category_data_id,
        month_year: filteredItem,
      };
      categories_data_created.push(category_data_toCreate);
      await db
        .collection("category_data")
        .doc(`/${category_data_id}/`)
        .create(category_data_toCreate);
      // return category_data;
    });

  return categories_data_created;
};

// ** Create Category data
const createCategoryData = async (category_data) => {
  const { creation_date } = category_data;
  const month_year = creatingMonthYear(creation_date);
  const category_data_id = uuidv4();
  const category_data_toCreate = {
    ...category_data,
    category_data_id,
    month_year: month_year,
  };

  await db
    .collection("category_data")
    .doc(`/${category_data_id}/`)
    .create(category_data_toCreate);
  return category_data;
};

// ** Update Money Amounts of 'user expense category' at user category Data
const updateCategoryData = async (category_data_toUpdate) => {
  await db
    .collection("category_data")
    .doc(category_data_toUpdate.category_data_id)
    .update(category_data_toUpdate);
  return category_data_toUpdate;
};

const deleteCategoryData = async (category_data_id) => {
  await db.collection("category_data").doc(`/${category_data_id}/`).delete();
};

const deleteMultipleCategoryDataByUserID = async (user_id) => {
  await db
    .collection("category_data")
    .where("user_id", "==", user_id)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.data().category_data_id);
      });
      querySnapshot.forEach((doc) => {
        deleteCategoryData(doc.data().category_data_id);
      });
    });
};

module.exports = {
  getAllCategoryData,
  getCategoryDataByUserID,
  getCategoryDataByMonthYear,
  getCategoryData_ByUser_ID_And_MonthYear,
  createCategoryDataAutomaticallyForNewUsers,
  createCategoryData,
  updateCategoryData,
  deleteMultipleCategoryDataByUserID,
  deleteCategoryData,
};
