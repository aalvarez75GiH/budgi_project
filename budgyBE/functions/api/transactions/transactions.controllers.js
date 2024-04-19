const { Timestamp } = require("firebase-admin/firestore");
const { db, admin } = require("../../fb");

// ** get All Transactions
const getAllTransactions = async () => {
  return await db
    .collection("transactions")
    .get()
    .then((data) => {
      let transactions = [];
      let docs = data.docs;
      if (docs.length) {
        docs.map((doc) => {
          const selectedTransaction = {
            amount: doc.data().amount,
            category_name: doc.data().category_name,
            category_id: doc.data().category_id,
            creation_date: doc.data().creation_date,
            month_year: doc.data().month_year,
            transaction_id: doc.data().transaction_id,
            user_id: doc.data().user_id,
            most_recent: doc.data().most_recent,
            transaction_date: doc.data().transaction_date,
            icon_name: doc.data().icon_name,
            short_name: doc.data().short_name,
            timeStamp: doc.data().timeStamp,
          };
          transactions.push(selectedTransaction);
        });
        return transactions;
        // res.status(200).json(transactions);
      }
      if (!docs.length) {
        return transactions;
      }
    });
};

// ** get a Transaction by ID
const getTransactionById = async (transaction_id) => {
  console.log("TRANSACTION_ID AT CONTROLLER:", transaction_id);
  return await db
    .collection("transactions")
    .doc(transaction_id)
    .get()
    .then((transaction) => transaction.data());
};

// ** get a Transaction by Category ID
const getTransactionsByCategoryId = async (category_id) => {
  console.log("CATEGORY_ID AT CONTROLLER:", category_id);
  let found_transactions = [];
  return await db
    .collection("transactions")
    .where(`category_id`, "==", category_id)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        found_transactions.push(doc.data());
      });
      return found_transactions;
    });
};

// ** get All Transactions by userID, Category ID and Month Year
const getTransactions_ByUser_IDCategory_IDMonthYear = async (
  user_id,
  category_id,
  month_year
) => {
  console.log("USER ID:", user_id);
  console.log("CATEGORY ID:", category_id);
  console.log("TRANSACTION DATE:", month_year);
  let found_transactions = [];
  //   console.log("TRANSACTION_ID AT CONTROLLER:", transaction_id);
  return await db
    .collection("transactions")
    .where(`category_id`, "==", category_id)
    .where(`month_year`, "==", month_year)
    .where(`user_id`, "==", user_id)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        found_transactions.push(doc.data());
      });
      return found_transactions;
    });
};
// ** get All Transactions by userID, Category ID and Month Year
const getTransactions_ByUser_IDCategory_IDMonthYear_Ordered = async (
  user_id,
  category_id,
  month_year
) => {
  console.log("USER ID:", user_id);
  console.log("CATEGORY ID:", category_id);
  console.log("TRANSACTION DATE:", month_year);
  let found_transactions = [];
  //   console.log("TRANSACTION_ID AT CONTROLLER:", transaction_id);
  return await db
    .collection("transactions")
    .where(`category_id`, "==", category_id)
    .where(`month_year`, "==", month_year)
    .where(`user_id`, "==", user_id)
    .orderBy("timeStamp", "desc")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        found_transactions.push(doc.data());
      });
      return found_transactions;
    });
};

// ** get All Transactions by userID and Month Year
const getTransactions_ByUser_ID_MonthYear = async (user_id, month_year) => {
  console.log("USER ID:", user_id);
  console.log("TRANSACTION DATE:", month_year);
  let found_transactions = [];
  //   console.log("TRANSACTION_ID AT CONTROLLER:", transaction_id);
  return await db
    .collection("transactions")
    .where(`month_year`, "==", month_year)
    .where(`user_id`, "==", user_id)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        found_transactions.push(doc.data());
      });
      return found_transactions;
    });
};
// ** get All Transactions by userID and Month Year Ordering in descendant
const getTransactions_ByUser_ID_MonthYearOrdered = async (
  user_id,
  month_year
) => {
  console.log("USER ID:", user_id);
  console.log("TRANSACTION DATE:", month_year);
  let found_transactions = [];
  //   console.log("TRANSACTION_ID AT CONTROLLER:", transaction_id);
  return await db
    .collection("transactions")
    .where(`month_year`, "==", month_year)
    .where(`user_id`, "==", user_id)
    .orderBy("timeStamp", "desc")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        found_transactions.push(doc.data());
      });
      return found_transactions;
    });
};

// ** get All Transactions by userID and Category ID
const getTransactions_ByUser_ID_Cat_ID = async (user_id, category_id) => {
  console.log("USER ID:", user_id);
  console.log("CATEGORY ID:", category_id);
  let found_transactions = [];
  //   console.log("TRANSACTION_ID AT CONTROLLER:", transaction_id);
  return await db
    .collection("transactions")
    .where(`category_id`, "==", category_id)
    .where(`user_id`, "==", user_id)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        found_transactions.push(doc.data());
      });
      return found_transactions;
    });
};

// ** create a Transaction
const createTransaction = async (transaction) => {
  console.log("TRANSACTION AT CONTROLLER:", transaction);
  const { transaction_id } = transaction;
  await db
    .collection("transactions")
    .doc(`/${transaction_id}/`)
    .create(transaction);
  return transaction;
};

// ** update a Transaction
const updateTransaction = async (transaction) => {
  await db
    .collection("transactions")
    .doc(transaction.transaction_id)
    .update(transaction);
  return transaction;
};

// ** delete a Transaction
const deleteTransaction = async (transaction_id) => {
  await db.collection("transactions").doc(transaction_id).delete();
  return transaction_id;
};

const deleteTransactionsByUserID = async (user_id) => {
  db.collection("transactions")
    .where(`user_id`, "==", user_id)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        deleteTransaction(doc.data().transaction_id);
      });
    });
};
const deleteTransactionsByUserIDAndCategoryID = async (
  user_id,
  category_id
) => {
  console.log("CATEGORY ID AT CONTROLLER:", category_id);
  console.log("USER ID AT CONTROLLER:", user_id);
  db.collection("transactions")
    .where(`user_id`, "==", user_id)
    .where(`category_id`, "==", category_id)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        deleteTransaction(doc.data().transaction_id);
      });
    });
};

module.exports = {
  getAllTransactions,
  getTransactionById,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  getTransactions_ByUser_IDCategory_IDMonthYear,
  getTransactionsByCategoryId,
  deleteTransactionsByUserID,
  getTransactions_ByUser_ID_MonthYear,
  deleteTransactionsByUserIDAndCategoryID,
  getTransactions_ByUser_ID_Cat_ID,
  getTransactions_ByUser_ID_MonthYearOrdered,
  getTransactions_ByUser_IDCategory_IDMonthYear_Ordered,
};
