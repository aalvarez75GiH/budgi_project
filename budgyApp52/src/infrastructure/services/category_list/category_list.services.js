import axios from "axios";
import { environment } from "../../../util/env";

export const getCategoryList_By_UserID_Request = async (user_id) => {
  const { categoryListEndPoint } = environment;
  return await axios
    .get(`${categoryListEndPoint}/categoryListByUserId?user_id=${user_id}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};

export const registerNewExpenseCategoryRequest = async (
  new_expense_category_node
) => {
  const { categoryListEndPoint } = environment;
  return await axios
    .put(
      `${categoryListEndPoint}/newUserExpenseCategory`,
      new_expense_category_node
    )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};

export const updatingExpenseCategoryRequest = async (
  expense_category_toUpdate
) => {
  const { categoryListEndPoint } = environment;
  return await axios
    .put(
      `${categoryListEndPoint}/updateUserExpenseCategory`,
      expense_category_toUpdate
    )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};

export const deleteExpenseCategoryRequest = async (category_id, user_id) => {
  const { categoryListEndPoint } = environment;
  return await axios
    .delete(
      `${categoryListEndPoint}/deleteExpenseCategory?category_id=${category_id}&user_id=${user_id}`
    )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};
// export const deleteTransactionRequest = async (transaction_id) => {
//   const { transactionEndPoint } = environment;
//   return await axios
//     .delete(`${transactionEndPoint}?transaction_id=${transaction_id}`)
//     .then((response) => {
//       return response;
//     })
//     .catch((error) => {
//       return error;
//     });
// };
