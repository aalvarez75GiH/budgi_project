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

export const updateTransactionRequest = async (transactionInfoForUpdate) => {
  // console.log("TRANSACTION INFO AT SERVICES:", transactionInfoForUpdate);
  const { transactionEndPoint } = environment;
  return await axios
    .put(`${transactionEndPoint}`, transactionInfoForUpdate)
    .then((response) => {
      // console.log("RESPONSE AT SERVICES:", JSON.stringify(response, null, 2));
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
      console.log(
        "RESPONSE AT DELETE TRANSACTION SERVICE:",
        JSON.stringify(response, null, 2)
      );
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
  return await axios
    // .get(
    //   `https://us-central1-budgy-bd9b1.cloudfunctions.net/transactionsEndPoint/transactionsByUserId_MonthYearOrdered?user_id=34c110af-5d1e-41ee-948f-ca366ae3c53b&month_year=APR 2024`
    // )
    // .get(
    //   `http://127.0.0.1:5001/budgy-bd9b1/us-central1/transactionsEndPoint/transactionsByUserId_MonthYearOrdered?user_id=49c33d4c-421f-41ff-90fb-6261ecd4c891&month_year=APR 2024`
    // )

    .get(
      `${transactionEndPoint}/transactionsByUserId_MonthYearOrdered?user_id=${user_id}&month_year=${month_year}`
    )
    .then((response) => {
      console.log("RESPONSE STATUS:", response.status);
      console.log(response.data.total_amount);
      return response.data;
    })
    .catch((error) => {
      if (error.response) {
        console.error("Error:", error.response.data.msg);
        console.error("Error Status:", error.response.data.status);
        return error.response.data;
      } else {
        console.error("Error:", error.message);
      }
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
