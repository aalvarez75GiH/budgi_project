import axios from "axios";
import { environment } from "../../../util/env";

export const getRealIncome_By_UserID_MonthYearRequest = async (
  user_id,
  month_year
) => {
  console.log("MONTH YEAR AT SERVICES:", month_year);
  console.log("USER ID AT SERVICES:", user_id);
  const { realIncomeEndPoint } = environment;
  return await axios
    .get(
      `${realIncomeEndPoint}/realIncomeByUserId_MonthYear?user_id=${user_id}&month_year=${month_year}`
    )
    .then((response) => {
      console.log("RESPONSE STATUS:", response.status);
      //   console.log("RESPONSE AT SERVICES:", JSON.stringify(response, null, 2));

      return response;
    })
    .catch((error) => {
      return error;
    });
};
