import React, { useState, createContext, useContext, useEffect } from "react";
import {
  getBillsList_By_UserID_Request,
  updatingBillRequest,
  creatingBillRequest,
  removingBillFromBillsListRequest,
  pausingBillFromBillsListRequest,
  activatingBillFromBillsListRequest,
  selectingBillFromBillsListRequest,
  updatingBillListRequest,
} from "./home.services";
import {
  updateBillNodeObject,
  creationBillNodeObject,
} from "./home.initial_data";

import { AuthenticationContext } from "../authentication/authentication.context";
import { DateOperationsContext } from "../date_operations/date_operations.context";

export const HomeContext = createContext();

export const HomeContextProvider = ({ children }) => {
  const { user } = useContext(AuthenticationContext);
  const { user_id } = user;

  const { assemblingMonthAndDayForBillsDueDate, creatingTimeStampForBill } =
    useContext(DateOperationsContext);

  const [number, setNumber] = useState("0");

  const clean = () => {
    setNumber("0");
  };

  useEffect(() => {
    const initializations = async () => {
      try {
        // await changingBillsPaymentDateToCurrentMonth();
        await initialBillsByUserFetchAndRelatedOperations();
      } catch (error) {
        console.log("ERROR AT INITIAL BILLS BY USER FETCH:", error);
      }
    };
    initializations();
  }, []);

  // ********* STATES *********
  const [bills_by_user, setBillsByUser] = useState([]);
  const [billsPaused, setBillsPaused] = useState([]);
  const [updateBillInfoForRequest, setUpdateBillInfoForRequest] = useState(
    updateBillNodeObject(user_id)
  );
  const [createBillInfoForRequest, setCreateBillInfoForRequest] = useState(
    creationBillNodeObject(user_id)
  );
  const deleteBillInitialState = {
    bill_id: "",
    bill_title: "",
    bill_short_name: "",
    bill_amount: 0,
    payment_date: "",
  };
  const [deleteBillInfo, setDeleteBillInfo] = useState(deleteBillInitialState);
  const [action_to_do, setActionToDo] = useState("");
  const [newBillName, setNewBillName] = useState("");
  const [updateBillName, setUpdateBillName] = useState("");

  const [billDayChosen, setBillDayChosen] = useState({
    day_selected: "1",
    isActive: false,
  });
  const [isLoadingBillRequest, setIsLoadingBillRequest] = useState(false);
  const [bills_list_by_user, setBillsListByUser] = useState({});

  const [activatedBill, setActivatedBill] = useState(false);
  const [modalActive, setModalActive] = useState(false);
  const [billsSelectedTotalAmount, setBillsSelectedTotalAmount] = useState(0);
  const [billToActivate, setBillToActivate] = useState("");
  // const [fetchingExecuted, setFetchingExecuted] = useState(false);

  const initialBillsByUserFetchAndRelatedOperations = async () => {
    setIsLoadingBillRequest(true);
    let bills_paused_by_user = [];
    let isSelectedArray = [];
    try {
      const bills_list_by_user = await getBillsList_By_UserID_Request(user_id);
      const { bills_by_user } = bills_list_by_user.data;
      // console.log(
      //   "BILLS BY USER AT CONTEXT:",
      //   JSON.stringify(bills_by_user, null, 2)
      // );
      bills_by_user.map((bill) => {
        if (bill.status === "Paused") {
          bills_paused_by_user.push(bill);
        }
      });
      bills_by_user.map((bill) => {
        if (bill.isSelected) {
          isSelectedArray.push(bill);
        }
      });
      const isSelectedBillsTotalAmount = isSelectedArray.reduce((acc, obj) => {
        return acc + obj.bill_amount;
      }, 0);
      // console.log("isSelectedArray:", JSON.stringify(isSelectedArray, null, 2)); // Log the isSelectedArray
      // console.log(
      //   "IS SELECTED BILLS TOTAL AMOUNT AT CONTEXT:",
      //   isSelectedBillsTotalAmount
      // );
      setBillsSelectedTotalAmount(isSelectedBillsTotalAmount);
      setBillsByUser(bills_by_user);

      setBillsListByUser(bills_list_by_user.data);
      setBillsPaused(bills_paused_by_user);
      // await changingBillsPaymentDateToCurrentMonth();
      // console.log("BILLS PAUSED BY USER:", bills_paused_by_user);
    } catch (error) {
      console.log("ERROR FETCHING BILLS BY DEFAULT:", error);
    } finally {
      setIsLoadingBillRequest(false);
    }
  };

  console.log(" SET MONDAL ACTIVE AT CONTEXT:", modalActive);
  // ********************************************************************

  const changingBillsPaymentDateToCurrentMonth = async () => {
    const bills_list_by_user = await getBillsList_By_UserID_Request(user_id);
    const { bills_by_user } = bills_list_by_user.data;

    bills_by_user.map((bill) => {
      const { payment_date } = bill;
      const payment_date_splitted = payment_date.split(" ");
      const payment_date_digit = payment_date_splitted[1];
      // console.log("PAYMENT DUE DATE SPLITTED:", payment_date_splitted);
      const month_day_for_bills_due_date =
        assemblingMonthAndDayForBillsDueDate(payment_date_digit);
      // console.log(
      //   "PAYMENT DUE DATE:",
      //   JSON.stringify(month_day_for_bills_due_date, null, 2)
      // );
      bill.payment_date =
        month_day_for_bills_due_date.month_day_for_bills_due_date;
      bill.payment_date_timeStamp = month_day_for_bills_due_date.billTimeStamp;
      bill.isSelected = false;
    });
    // console.log(
    //   "BILLS BY USER AFTER CHANGING PAYMENT DATE:",
    //   JSON.stringify(bills_by_user, null, 2)
    // );
    // console.log(
    //   "BILL LIST BY USER AFTER CHANGING PAYMENT DATE:",
    //   JSON.stringify(bills_list_by_user.data, null, 2)
    // );
    try {
      await updatingBillListRequest(bills_list_by_user.data);
    } catch (error) {
      console.log("THERE WAS AN ERROR:", error);
    }
  };

  // ********************************************************************

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
  const fetchingBillsByUser = async () => {
    setIsLoadingBillRequest(true);
    let bills_paused_by_user = [];
    try {
      const bills_list_by_user = await getBillsList_By_UserID_Request(user_id);
      const { bills_by_user } = bills_list_by_user.data;
      setBillsByUser(bills_by_user);
      setBillsListByUser(bills_list_by_user.data);
      bills_by_user.map((bill) => {
        if (bill.status === "Paused") {
          bills_paused_by_user.push(bill);
        }
      });
      console.log("BILLS PAUSED BY USER:", bills_paused_by_user);
      setBillsPaused(bills_paused_by_user);
    } catch (error) {
      console.log("ERROR FETCHING BILLS BY DEFAULT:", error);
    } finally {
      setIsLoadingBillRequest(false);
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
        // console.log(
        //   "UPDATE BILL INFO FOR REQUEST:",
        //   JSON.stringify(updateBillInfoForRequest, null, 2)
        // );
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
    const { month_day_for_bills_due_date, billTimeStamp } =
      assemblingMonthAndDayForBillsDueDate(digit);
    setBillDayChosen({
      day_selected: digit,
      isActive: true,
    });
    // *******************************************************
    // const billTimeStamp = creatingTimeStampForBill(day);

    // *******************************************************
    // console.log("PAYMENT DUE DATE:", month_day_for_bills_due_date);
    // console.log("ACTION TO DO:", action_to_do);
    if (action_to_do === "create_bill") {
      setCreateBillInfoForRequest((prevState) => ({
        ...prevState,
        payment_date: month_day_for_bills_due_date,
        payment_date_timeStamp: billTimeStamp,
      }));
      console.log(
        "CREATE BILL INFO FOR REQUEST:",
        JSON.stringify(createBillInfoForRequest, null, 2)
      );
    }
    if (action_to_do === "update_bill") {
      setUpdateBillInfoForRequest((prevState) => ({
        ...prevState,
        payment_date: month_day_for_bills_due_date,
        payment_date_timeStamp: billTimeStamp,
      }));
      console.log(
        "UPDATE BILL INFO FOR REQUEST:",
        JSON.stringify(updateBillInfoForRequest, null, 2)
      );
    }
  };

  // ************** BILLS OPERATIONS ****************
  const creatingBillAtListByUserId = async (navigation) => {
    setIsLoadingBillRequest(true);

    try {
      const response = await creatingBillRequest(createBillInfoForRequest);
      if (response) {
        setIsLoadingBillRequest(false);
        navigation.navigate("bill_confirmation_view");
      }
    } catch (error) {
      console.log("THERE WAS AN ERROR:", error);
    }
  };

  const updatingBillListByUserId = async (navigation) => {
    setIsLoadingBillRequest(true);

    try {
      const response = await updatingBillRequest(updateBillInfoForRequest);
      if (response) {
        setIsLoadingBillRequest(false);
        // console.log(
        //   "BILL LIST UPDATED RESPONSE AT CONTEXT:",
        //   JSON.stringify(response.data, null, 2)
        // );
        // setNewCategoryAdded(true);
        navigation.navigate("bill_confirmation_view");
      }
    } catch (error) {
      console.log("THERE WAS AN ERROR:", error);
    }
  };

  const removingBillFromBillsListByUserIdAndBillID = async (
    navigation,
    user_id,
    bill_id
  ) => {
    setIsLoadingBillRequest(true);

    try {
      const response = await removingBillFromBillsListRequest(user_id, bill_id);
      if (response) {
        setIsLoadingBillRequest(false);
        // console.log(
        //   "BILL LIST UPDATED RESPONSE AT CONTEXT:",
        //   JSON.stringify(response.data, null, 2)
        // );
        navigation.navigate("bill_confirmation_view");
      }
    } catch (error) {
      console.log("THERE WAS AN ERROR:", error);
    }
  };

  const pausingBillFromBillsListByUserIdAndBillID = async (
    navigation,
    user_id,
    bill_id
  ) => {
    setIsLoadingBillRequest(true);

    try {
      const response = await pausingBillFromBillsListRequest(user_id, bill_id);
      if (response) {
        setIsLoadingBillRequest(false);
        navigation.navigate("bill_confirmation_view");
      }
    } catch (error) {
      console.log("THERE WAS AN ERROR:", error);
    }
  };

  const activatingBillFromBillsListByUserIdAndBillID = async (
    navigation,
    user_id,
    bill_id
  ) => {
    setIsLoadingBillRequest(true);

    try {
      const response = await activatingBillFromBillsListRequest(
        user_id,
        bill_id
      );
      if (response) {
        setIsLoadingBillRequest(false);
        navigation.navigate("HomeView");
      }
    } catch (error) {
      console.log("THERE WAS AN ERROR:", error);
    }
  };

  const billsSelectedAmountLogicOnDemand = async (user_id, bill_id) => {
    let isSelectedArray = [];
    try {
      const response = await selectingBillFromBillsListRequest(
        user_id,
        bill_id
      );
      if (response.status === 200) {
        // console.log(
        //   "RESPONSE AT ACTION AT HOME CONTEXT:",
        //   JSON.stringify(response.data, null, 2)
        // );
        const { bills_by_user } = response.data;
        // *****************************************
        bills_by_user.map((bill) => {
          if (bill.isSelected) {
            isSelectedArray.push(bill);
          }
        });
        // console.log(
        //   "IS SELECTED ARRAY:",
        //   JSON.stringify(isSelectedArray, null, 2)
        // );

        const isSelectedBillsTotalAmount = isSelectedArray.reduce(
          (acc, obj) => {
            return acc + obj.bill_amount;
          },
          0
        );
        // console.log(
        //   "IS SELECTED ARRAY TOTAL AMOUNT AT CONTEXT:",
        //   isSelectedBillsTotalAmount
        // );
        setBillsSelectedTotalAmount(isSelectedBillsTotalAmount);

        // *****************************************
        setBillsByUser(bills_by_user);
      }
    } catch (error) {
      console.log("THERE WAS AN ERROR:", error);
    }
  };

  const selectingBillFromBillsListByUserIdAndBillID = async (
    user_id,
    bill_id
  ) => {
    // setIsSpinnerLoading(true);
    setIsLoadingBillRequest(true);
    try {
      await billsSelectedAmountLogicOnDemand(user_id, bill_id);
    } catch (error) {
      console.log("THERE WAS AN ERROR:", error);
    } finally {
      // setIsSpinnerLoading(false);
      setIsLoadingBillRequest(false);
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
        updatingBillListByUserId,
        isLoadingBillRequest,
        setIsLoadingBillRequest,
        bills_list_by_user,
        creatingBillAtListByUserId,
        removingBillFromBillsListByUserIdAndBillID,
        setDeleteBillInfo,
        deleteBillInfo,
        pausingBillFromBillsListByUserIdAndBillID,
        billsPaused,
        setActivatedBill,
        activatedBill,
        setModalActive,
        modalActive,
        activatingBillFromBillsListByUserIdAndBillID,
        selectingBillFromBillsListByUserIdAndBillID,
        billsSelectedTotalAmount,
        fetchingBillsByUser,
        setBillToActivate,
        billToActivate,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};
