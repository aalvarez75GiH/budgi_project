import React, { useState, createContext, useContext, useEffect } from "react";
import { AuthenticationContext } from "../authentication/authentication.context";
import { getBillsList_By_UserID_Request } from "./numPad.services";

export const NumPadContext = createContext();

export const NumPadContextProvider = ({ children }) => {
  const { user } = useContext(AuthenticationContext);
  const { user_id } = user;
  const [number, setNumber] = useState("0");

  const clean = () => {
    setNumber("0");
  };

  useEffect(() => {
    (async () => {
      fetchingBillsByUser();
    })();
  }, []);

  const [bills_by_default, setBillsByDefault] = useState([]);
  const [bills_by_user, setBillsByUser] = useState([]);

  const fetchingBillsByUser = async () => {
    try {
      const bills_list_by_user = await getBillsList_By_UserID_Request(user_id);
      const { bills_by_user } = bills_list_by_user.data;
      setBillsByUser(bills_by_user);
    } catch (error) {
      console.log("ERROR FETCHING BILLS BY DEFAULT:", error);
    }
  };

  const btnDelete = () => {
    let negative = "";
    let tempNumber = number;

    if (number.includes("-")) {
      negative = "-";
      tempNumber = number.substring(1);
    }
    if (tempNumber.length > 1) {
      setNumber(negative + tempNumber.slice(0, -1));
    } else {
      setNumber("0");
    }
  };

  const assemblingNumber = (digit) => {
    // do not accept double point
    if (number.includes(".") && digit === ".") {
      return;
    }
    if (number.startsWith("0") || number.startsWith("-0")) {
      if (digit === ".") {
        // concat a decimal point
        setNumber(number + digit);
      } else if (digit === "0" && number.includes(".")) {
        // allowing other zeros after a ' . '
        setNumber(number + digit);
      } else if (digit !== "0" && !number.includes(".")) {
        console.log(digit);
        // evaluate if it is different than zero and does not have point
        setNumber(digit);
      } else if (digit === "0" && !number.includes(".")) {
        // avoid 000.0
        // setNUmber(number)
        return;
      } else {
        setNumber(number + digit);
      }
    } else {
      setNumber(number + digit);
    }
  };

  return (
    <NumPadContext.Provider
      value={{
        number,
        setNumber,
        assemblingNumber,
        clean,
        btnDelete,
        bills_by_user,
      }}
    >
      {children}
    </NumPadContext.Provider>
  );
};
