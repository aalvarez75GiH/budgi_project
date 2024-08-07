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
    .put(`${categoryListEndPoint}`, expense_category_toUpdate)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};

export const deleteExpenseCategoryRequest = async (category_id, user_id) => {
  console.log("CATEGORY LIST INFO AT SERVICES:", category_id, user_id);
  const { categoryListEndPoint } = environment;
  return await axios
    .delete(
      // `http://10.0.2.2:5001/budgy-bd9b1/us-central1/categoryListEndPoint/deleteExpenseCategory?category_id=270d66ac-7229-455e-b445-e3b302f62654&user_id=7125c49e-987d-4aa1-944c-0d5dce4bf303`
      `${categoryListEndPoint}/deleteExpenseCategory?category_id=${category_id}&user_id=${user_id}`
    )
    .then((response) => {
      // console.log(
      //   "RESPONSE AT DELETE TRANSACTION SERVICE:",
      //   JSON.stringify(response, null, 2)
      // );
      return response;
    })
    .catch((error) => {
      return error;
    });
};
export const deleteTransactionRequest = async (transaction_id) => {
  // console.log("TRANSACTION INFO AT SERVICES:", transactionInfoForUpdate);
  const { transactionEndPoint } = environment;
  return await axios
    .delete(`${transactionEndPoint}?transaction_id=${transaction_id}`)
    .then((response) => {
      // console.log(
      //   "RESPONSE AT DELETE TRANSACTION SERVICE:",
      //   JSON.stringify(response, null, 2)
      // );
      return response;
    })
    .catch((error) => {
      return error;
    });
};
