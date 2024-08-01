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
