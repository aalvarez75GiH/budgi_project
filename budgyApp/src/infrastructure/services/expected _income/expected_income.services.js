import axios from "axios";
import { environment } from "../../../util/env";

export const getExpectedIncome_By_UserID = async (user_id) => {
  const { expectedIncomeEndPoint } = environment;
  return await axios
    .get(`${expectedIncomeEndPoint}/expectedIncomeByUserId?user_id=${user_id}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};
// export const getRealIncomes_By_UserIDRequest = async (user_id) => {
//   const { realIncomeEndPoint } = environment;
//   return await axios
//     .get(`${realIncomeEndPoint}/real_income_byUserId?user_id=${user_id}`)
//     .then((response) => {
//       return response;
//     })
//     .catch((error) => {
//       return error;
//     });
// };

export const registerExpectedIncomeRequest = async (
  expectedIncomeForRequest
) => {
  console.log(
    "EXPECTED INCOME FOR REQUEST AT SERVICES:",
    expectedIncomeForRequest
  );
  const { expectedIncomeEndPoint } = environment;
  return await axios
    .put(
      `${expectedIncomeEndPoint}/addExpectedIncomeNode`,
      expectedIncomeForRequest
    )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};
// export const registerCashIncomeRequest = async (realIncomeForRequest) => {
//   console.log("REAL INCOME FOR REQUEST AT SERVICES:", realIncomeForRequest);
//   const { realIncomeEndPoint } = environment;
//   return await axios
//     .put(`${realIncomeEndPoint}/addingCashIncome`, realIncomeForRequest)
//     .then((response) => {
//       return response;
//     })
//     .catch((error) => {
//       return error;
//     });
// };
