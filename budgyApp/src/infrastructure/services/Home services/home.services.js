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

export const removingBillFromBillsListRequest = async (user_id, bill_id) => {
  const { billsEndPoint } = environment;
  return await axios
    .put(
      `${billsEndPoint}/removingBillByUserIdAndBillId?bill_id=${bill_id}&user_id=${user_id}`
    )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};

export const pausingBillFromBillsListRequest = async (user_id, bill_id) => {
  const { billsEndPoint } = environment;
  return await axios
    .put(
      `${billsEndPoint}/pausingBillByUserIdAndBillId?bill_id=${bill_id}&user_id=${user_id}`
    )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};
export const activatingBillFromBillsListRequest = async (user_id, bill_id) => {
  const { billsEndPoint } = environment;
  return await axios
    .put(
      `${billsEndPoint}/activatingBillByUserIdAndBillId?bill_id=${bill_id}&user_id=${user_id}`
    )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};

export const selectingBillFromBillsListRequest = async (user_id, bill_id) => {
  const { billsEndPoint } = environment;
  return await axios
    .put(
      `${billsEndPoint}/selectingBillByUserIdAndBillId?bill_id=${bill_id}&user_id=${user_id}`
    )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};
