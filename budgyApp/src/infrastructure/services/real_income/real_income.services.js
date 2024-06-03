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
      return error;
    });
};
