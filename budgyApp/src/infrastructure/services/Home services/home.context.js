import React, { useState, createContext, useContext, useEffect } from "react";
import { AuthenticationContext } from "../authentication/authentication.context";
import { getBillsList_By_UserID_Request } from "./home.services";
import {
  updateBillNodeObject,
  creationBillNodeObject,
} from "./home.initial_data";
import { DateOperationsContext } from "../date_operations/date_operations.context";

export const HomeContext = createContext();

export const HomeContextProvider = ({ children }) => {
  const { user } = useContext(AuthenticationContext);
  const { user_id } = user;
  const [number, setNumber] = useState("0");

  const { assemblingMonthAndDayForBillsDueDate } = useContext(
    DateOperationsContext
  );
  const clean = () => {
    setNumber("0");
  };

  useEffect(() => {
    (async () => {
      fetchingBillsByUser();
    })();
  }, []);

  const [bills_by_user, setBillsByUser] = useState([]);
  const [updateBillInfoForRequest, setUpdateBillInfoForRequest] = useState(
    updateBillNodeObject(user_id)
  );
  const [createBillInfoForRequest, setCreateBillInfoForRequest] = useState(
    creationBillNodeObject(user_id)
  );
  const [action_to_do, setActionToDo] = useState("");
  const [newBillName, setNewBillName] = useState("");
  const [updateBillName, setUpdateBillName] = useState("");

  const [billDayChosen, setBillDayChosen] = useState({
    day_selected: "1",
    isActive: false,
  });

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
    console.log("SHORT NAME AT SETTING:", short_name);
    console.log("NEW NAME AT SETTING:", newBillName);
    console.log("TYPE AT SETTING:", type);
    const words = newBillName.split(" ");
    console.log("WORDS:", words);

    if (words.length < 2) {
      if (action_to_do === "create_bill") {
        setNewBillName(newBillName);
        setCreateBillInfoForRequest((prevState) => ({
          ...prevState,
          bill_title: newBillName,
          bill_short_name: newBillName,
        }));
        navigation.navigate("Enter_amount_view", {
          comingFrom: "create_bill_name_view",
        });
      }

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
        navigation.navigate("Enter_amount_view", {
          comingFrom: "update_bill_name_view",
        });
      }
    }

    if (words.length >= 2 && type === "by_user") {
      const firstWord = words[0];
      const secondWordInitial = words[1][0].toUpperCase();
      const shortNameBillName = `${firstWord}. ${secondWordInitial}`;

      if (action_to_do === "create_bill") {
        setNewBillName(newBillName);
        setCreateBillInfoForRequest((prevState) => ({
          ...prevState,
          bill_title: newBillName,
          bill_short_name: shortNameBillName,
        }));
        navigation.navigate("Enter_amount_view", {
          comingFrom: "create_bill_name_view",
        });
      }

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
        navigation.navigate("Enter_amount_view", {
          comingFrom: "update_bill_name_view",
        });
      }
    }

    if (words.length >= 2 && type === "Default") {
      setUpdateBillInfoForRequest((prevState) => ({
        ...prevState,
        bill_title: newBillName,
      }));
      navigation.navigate("Enter_amount_view", {
        comingFrom: "update_bill_name_view",
      });
      console.log(
        "UPDATE BILL INFO FOR REQUEST:",
        JSON.stringify(updateBillInfoForRequest, null, 2)
      );
    }
  };

  const exitingToRoot = (navigation) => {
    setUpdateBillInfoForRequest(updateBillNodeObject(user_id));
    setCreateBillInfoForRequest(creationBillNodeObject(user_id));
    setBillDayChosen({
      day_selected: "1",
      isActive: false,
    });
    navigation.popToTop();
  };

  const settingPaymentDueDateForRequest = (digit) => {
    const payment_due_date = assemblingMonthAndDayForBillsDueDate(digit);
    setBillDayChosen({
      day_selected: digit,
      isActive: true,
    });
    console.log("PAYMENT DUE DATE:", payment_due_date);
    console.log("ACTION TO DO:", action_to_do);
    if (action_to_do === "create_bill") {
      setCreateBillInfoForRequest((prevState) => ({
        ...prevState,
        payment_date: payment_due_date,
      }));
      console.log(
        "CREATE BILL INFO FOR REQUEST:",
        JSON.stringify(createBillInfoForRequest, null, 2)
      );
    }
    if (action_to_do === "update_bill") {
      setUpdateBillInfoForRequest((prevState) => ({
        ...prevState,
        payment_date: payment_due_date,
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
        updateBillName,
        setUpdateBillName,
        setActionToDo,
        action_to_do,
        setUpdateBillInfoForRequest,
        updateBillInfoForRequest,
        settingNewBillName,
        createBillInfoForRequest,
        setCreateBillInfoForRequest,
        newBillName,
        setNewBillName,
        exitingToRoot,
        settingPaymentDueDateForRequest,
        billDayChosen,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};
