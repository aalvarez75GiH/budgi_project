import axios from "axios";
import { environment } from "../../../util/env";

export const registerTransactionRequest = async (transactionInfoForRequest) => {
  console.log("TRANSACTION INFO AT SERVICES:", transactionInfoForRequest);
  const { transactionEndPoint } = environment;
  return await axios
    .post(`${transactionEndPoint}`, transactionInfoForRequest)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};

export const getTransactionsRequest = async () => {
  // console.log("TRANSACTION INFO AT SERVICES:", transactionInfoForRequest);
  const { transactionEndPoint } = environment;
  console.log(transactionEndPoint);
  return await axios
    .get(`${transactionEndPoint}`)
    .then((response) => {
      console.log(response.data);
      return response;
    })
    .catch((error) => {
      return error;
    });
};

export const getTransactionsAndTotalAmountRequest = async (
  user_id,
  month_year
) => {
  // console.log("TRANSACTION INFO AT SERVICES:", transactionInfoForRequest);
  const { transactionEndPoint } = environment;
  console.log(transactionEndPoint);
  return await axios
    .get(
      `${transactionEndPoint}/transactionsByUserId_MonthYear?user_id=${user_id}&month_year=${month_year}`
    )
    .then((response) => {
      console.log(response.data.total_amount);
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};
export const getTransactionsAndTotalAmountRequestOrderedByTimeStamp = async (
  user_id,
  month_year
) => {
  console.log("GET TRANSACTIONS REQUEST...");
  console.log("USER_ID AT SERVICES:", user_id);
  console.log("MONTH YEAR:", month_year);
  const { transactionEndPoint } = environment;
  console.log(transactionEndPoint);
  return await axios
    .get(
      `${transactionEndPoint}/transactionsByUserId_MonthYearOrdered?user_id=${user_id}&month_year=${month_year}`
    )
    .then((response) => {
      // console.log("RESPONSE:", response);
      console.log(response.data.total_amount);
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const getTransactionsAndTotalAmountRequest_ByUser_ByCat_ByMonthyear_OrderedByTimeStamp =
  async (user_id, category_id, month_year) => {
    const { transactionEndPoint } = environment;
    // console.log(transactionEndPoint);
    return await axios
      .get(
        `${transactionEndPoint}/transactionsByUserId_CategoryID_MonthYear_Ordered?user_id=${user_id}&month_year=${month_year}&category_id=${category_id}`
      )
      .then((response) => {
        console.log("RESPONSE:", response);
        console.log(response.data.total_amount);
        return response.data;
      })
      .catch((error) => {
        return error;
      });
  };
