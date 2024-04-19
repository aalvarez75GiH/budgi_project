const { db } = require("../../fb");

const getAllCategoryList = async () => {
  return await db
    .collection("category_list")
    .get()
    .then((data) => {
      let categoryLists = [];
      let docs = data.docs;
      if (docs.length) {
        docs.map((doc) => {
          const selectedCategoryList = {
            user_id: doc.data().user_id,
            category_list_id: doc.data().category_list_id,
            creation_date: doc.data().creation_date,
            category_list_expenseCategories:
              doc.data().category_list_expenseCategories,
          };
          categoryLists.push(selectedCategoryList);
        });
        return categoryLists;
      }
      if (!docs.length) {
        return categoryLists;
      }
    });
};

const getCategoryListByUserID = async (user_id) => {
  let found_categoryList;
  await db
    .collection("category_list")
    .where("user_id", "==", user_id)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        found_categoryList = doc.data();
      });
    });
  // console.log("CATEGORY LIST AT CONTROLLER:", found_categoryList);
  return found_categoryList;
};

// ** Create Category List - by http request
const createCategoryList = async (category_list) => {
  const { category_list_id } = category_list;
  await db
    .collection("category_list")
    .doc(`/${category_list_id}/`)
    .create(category_list);
  return category_list;
};

const updateCategoryList = async (category_list_toUpdate) => {
  const { category_list_id } = category_list_toUpdate;
  await db
    .collection("category_list")
    .doc(category_list_id)
    .update(category_list_toUpdate);
  return category_list_toUpdate;
};

const deleteCategoryList = async (category_list_id) => {
  await db.collection("category_list").doc(`/${category_list_id}/`).delete();
};

const deleteCategoryListByUserId = async (user_id) => {
  await db
    .collection("category_list")
    .where("user_id", "==", user_id)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.data().category_list_id);
      });
      querySnapshot.forEach((doc) => {
        deleteCategoryList(doc.data().category_list_id);
      });
    });
};

module.exports = {
  getAllCategoryList,
  getCategoryListByUserID,
  createCategoryList,
  updateCategoryList,
  deleteCategoryList,
  deleteCategoryListByUserId,
};
