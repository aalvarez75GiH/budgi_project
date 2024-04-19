import { environment } from "../../../util/env";

import axios from "axios";

export const registerUserRequest = async (userToDB) => {
  const { userEndPoint } = environment;
  // console.log("USER TO DB AT SERVICES:", userToDB);
  return await axios
    .post(`${userEndPoint}`, userToDB)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};
