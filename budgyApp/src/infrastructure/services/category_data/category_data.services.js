import axios from "axios";
import { environment } from "../../../util/env";

export const getCategoryData_By_UserID_MonthYearRequest = async (
  user_id,
  month_year
) => {
  const { categoryDataEndPoint } = environment;
  return await axios
    .get(
      `${categoryDataEndPoint}/categoryDataByUserId_MonthYear?user_id=${user_id}&month_year=${month_year}`
    )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(
        "CATEGORY DATA ERROR STATUS AT SERVICES:",
        error.response.status
      );
      return error.response;
    });
};
export const getAllCategoriesData_By_UserID_Request = async (user_id) => {
  const { categoryDataEndPoint } = environment;
  return await axios
    .get(`${categoryDataEndPoint}/categoryDataByUserId?user_id=${user_id}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(
        "CATEGORY DATA ERROR STATUS AT SERVICES:",
        error.response.status
      );
      return error.response.status;
    });
};
export const post_category_data_Request = async (
  user_id,
  creation_date,
  month_year
) => {
  const { categoryDataEndPoint } = environment;
  const categoryDataInfoNeededForRequest = {
    user_id,
    creation_date,
    month_year,
  };

  return await axios
    .post(`${categoryDataEndPoint}`, categoryDataInfoNeededForRequest)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(
        "CATEGORY DATA ERROR STATUS AT SERVICES:",
        error.response.status
      );
      return error.response.status;
    });
};

export const put_categories_money_transfer_Request = async (
  categoryDataInfoForMoneyTransfer
) => {
  const { categoryDataEndPoint } = environment;

  return await axios
    .put(
      `${categoryDataEndPoint}/categories_money_transfer`,
      categoryDataInfoForMoneyTransfer
    )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(
        "CATEGORY DATA ERROR STATUS AT SERVICES:",
        error.response.status
      );
      return error.response.status;
    });
};
