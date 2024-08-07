import axios from "axios";
import { environment } from "../../../util/env";

export const getRealIncome_By_UserID_MonthYearRequest = async (
  user_id,
  month_year
) => {
  const { realIncomeEndPoint } = environment;
  return await axios
    .get(
      `${realIncomeEndPoint}/realIncomeByUserId_MonthYear?user_id=${user_id}&month_year=${month_year}`
    )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response;
    });
};

export const getRealIncomes_By_UserIDRequest = async (user_id) => {
  const { realIncomeEndPoint } = environment;
  return await axios
    .get(`${realIncomeEndPoint}/real_income_byUserId?user_id=${user_id}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};

export const registerRealIncomeRequest = async (realIncomeForRequest) => {
  const { realIncomeEndPoint } = environment;
  return await axios
    .put(`${realIncomeEndPoint}/addingWeekIncome`, realIncomeForRequest)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};
export const registerCashIncomeRequest = async (realIncomeForRequest) => {
  const { realIncomeEndPoint } = environment;
  return await axios
    .put(`${realIncomeEndPoint}/addingCashIncome`, realIncomeForRequest)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};

export const post_real_income_Request = async (
  // categoryDataInfoNeededForRequest,
  user_id,
  creation_date,
  month_year
) => {
  console.log("USER ID:", user_id);
  console.log("CREATION DATE:", creation_date);
  console.log("MONTH YEAR:", month_year);
  const { realIncomeEndPoint } = environment;
  const realIncomeInfoNeededForRequest = {
    user_id,
    creation_date,
    month_year,
  };

  return await axios
    .post(
      `${realIncomeEndPoint}/createRealIncome`,
      realIncomeInfoNeededForRequest
    )
    .then((response) => {
      console.log("REAL INCOME RESPONSE AT SERVICES:", response.status);
      return response;
    })
    .catch((error) => {
      console.log(
        "REAL INCOME ERROR STATUS AT SERVICES:",
        error.response.status
      );
      return error.response.status;
    });
};
