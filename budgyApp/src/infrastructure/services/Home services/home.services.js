import axios from "axios";
import { environment } from "../../../util/env";

export const getAllBills_Request = async (user_id) => {
  const { billsEndPoint } = environment;
  return await axios
    .get(`${billsEndPoint}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};

export const getBillsList_By_UserID_Request = async (user_id) => {
  const { billsEndPoint } = environment;
  return await axios
    .get(`${billsEndPoint}/billsListByUserId?user_id=${user_id}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};

export const creatingBillRequest = async (createBillInfoForRequest) => {
  const { billsEndPoint } = environment;
  return await axios
    .put(`${billsEndPoint}/createBillByUserId`, createBillInfoForRequest)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};
export const updatingBillRequest = async (updateBillInfoForRequest) => {
  const { billsEndPoint } = environment;
  return await axios
    .put(`${billsEndPoint}/updateBillListByUserId`, updateBillInfoForRequest)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};
