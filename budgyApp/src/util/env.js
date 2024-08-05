// ************* Development Environment
// export const environment = {
//   userEndPoint: `http://10.0.2.2:5001/budgy-bd9b1/us-central1/usersEndPoint`,
//   transactionEndPoint: `http://10.0.2.2:5001/budgy-bd9b1/us-central1/transactionsEndPoint`,
//   categoryListEndPoint: `http://10.0.2.2:5001/budgy-bd9b1/us-central1/categoryListEndPoint`,
//   categoryDataEndPoint: `http://10.0.2.2:5001/budgy-bd9b1/us-central1/categoryDataEndPoint`,
//   realIncomeEndPoint: `http://10.0.2.2:5001/budgy-bd9b1/us-central1/realIncomeEndPoint`,
//   expectedIncomeEndPoint: `http://10.0.2.2:5001/budgy-bd9b1/us-central1/expectedIncomeEndPoint`,
// };

// ************* Production Environment
export const environment = {
  userEndPoint:
    "https://us-central1-budgy-bd9b1.cloudfunctions.net/usersEndPoint",
  transactionEndPoint: `https://us-central1-budgy-bd9b1.cloudfunctions.net/transactionsEndPoint`,
  categoryListEndPoint: `https://us-central1-budgy-bd9b1.cloudfunctions.net/categoryListEndPoint`,
  categoryDataEndPoint: `https://us-central1-budgy-bd9b1.cloudfunctions.net/categoryDataEndPoint`,
  realIncomeEndPoint: `https://us-central1-budgy-bd9b1.cloudfunctions.net/realIncomeEndPoint`,
  expectedIncomeEndPoint: `https://us-central1-budgy-bd9b1.cloudfunctions.net/expectedIncomeEndPoint`,
};
