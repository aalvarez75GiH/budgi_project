import React, { useState, createContext, useContext, useEffect } from "react";
import { AuthenticationContext } from "../authentication/authentication.context";
import { getBillsList_By_UserID_Request } from "./home.services";
import { updateBillNodeObject } from "./home.initial_data";

export const HomeContext = createContext();

export const HomeContextProvider = ({ children }) => {
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
  const [updateBillInfoForRequest, setUpdateBillInfoForRequest] = useState(
    updateBillNodeObject(user_id)
  );
  const [action_to_do, setActionToDo] = useState("");
  const [newBillName, setNewBillName] = useState("");
  const [updateBillName, setUpdateBillName] = useState("");
  // console.log("NEW BILL OBJECT:", JSON.stringify(newBill, null, 2));

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

  const settingNewBillName = (navigation, newBillName, type, short_name) => {
    console.log("SHORT NAME AT SETIING:", short_name);
    console.log("NEW NAME AT SETTING:", newBillName);
    console.log("TYPE AT SETTING:", type);
    const words = newBillName.split(" ");
    console.log("WORDS:", words);
    if (words.length < 2) {
      // if (action_to_do === "new_bill") {
      //   setNewBillName(newName);
      //   setUpdateBillInfoForRequest((prevState) => ({
      //     ...prevState,
      //     new_expense_category_node: {
      //       ...prevState.new_expense_category_node,
      //       category_name: newName,
      //       short_name: newName,
      //     },
      //   }));
      //   navigation.navigate("Enter_amount_with_options_view", {
      //     comingFrom: "GeneralNewNameView",
      //   });
      // }

      if (action_to_do === "update_bill") {
        setUpdateBillName(newBillName);
        setUpdateBillInfoForRequest((prevState) => ({
          ...prevState,
          bill_title: newBillName,
          bill_short_name: newBillName,
        }));
        console.log(
          "UPDATE BILL INFO FOR REQUEST:",
          JSON.stringify(updateBillInfoForRequest, null, 2)
        );
        // navigation.navigate("Enter_amount_with_options_view", {
        //   comingFrom: "GeneralNewNameView",
        // });
      }
    }

    if (words.length >= 2 && type === "by_user") {
      const firstWord = words[0];
      const secondWordInitial = words[1][0].toUpperCase();

      const shortNameBillName = `${firstWord}. ${secondWordInitial}`;
      // const shortNameBillName = `${firstInitial}. ${secondWord}`;
      // if (action_to_do === "new_expense_category") {
      //   setCategory_list_info_forRequest((prevState) => ({
      //     ...prevState,
      //     new_expense_category_node: {
      //       ...prevState.new_expense_category_node,
      //       category_name: newName,
      //       short_name: shortName,
      //     },
      //   }));
      //   navigation.navigate("Enter_amount_with_options_view", {
      //     comingFrom: "GeneralNewNameView",
      //   });
      // }
      if (action_to_do === "update_bill") {
        setUpdateBillInfoForRequest((prevState) => ({
          ...prevState,
          bill_title: newBillName,
          bill_short_name: shortNameBillName,
        }));

        console.log(
          "UPDATE BILL INFO FOR REQUEST:",
          JSON.stringify(updateBillInfoForRequest, null, 2)
        );
        // navigation.navigate("Enter_amount_with_options_view", {
        //   comingFrom: "GeneralNewNameView",
        // });
      }
    }
    if (words.length >= 2 && type === "Default") {
      setUpdateBillInfoForRequest((prevState) => ({
        ...prevState,
        bill_title: newBillName,
      }));
      console.log(
        "UPDATE BILL INFO FOR REQUEST:",
        JSON.stringify(updateBillInfoForRequest, null, 2)
      );
    }
  };

  return (
    <HomeContext.Provider
      value={{
        number,
        setNumber,
        assemblingNumber,
        clean,
        btnDelete,
        bills_by_user,
        // newBill,
        // setNewBill,
        updateBillName,
        setUpdateBillName,
        setActionToDo,
        action_to_do,
        setUpdateBillInfoForRequest,
        updateBillInfoForRequest,
        settingNewBillName,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};
