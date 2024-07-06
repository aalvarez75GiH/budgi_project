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

export const registerExpectedIncomeRequest = async (
  expectedIncomeForRequest
) => {
  //   console.log(
  //     "EXPECTED INCOME FOR REQUEST AT SERVICES:",
  //     expectedIncomeForRequest
  //   );
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
