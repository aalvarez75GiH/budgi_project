import React, { useState, createContext, useEffect, useContext } from "react";
import {
  getCategoryList_By_UserID_Request,
  deleteExpenseCategoryRequest,
} from "./category_list.services";
import {
  registerNewExpenseCategoryRequest,
  updatingExpenseCategoryRequest,
} from "./category_list.services";
import {
  getCategoryListInitialInfo,
  updateCategoryListExpenseCategoryObject,
} from "./category_list.data";
import { AuthenticationContext } from "../authentication/authentication.context";
import { DateOperationsContext } from "../date_operations/date_operations.context";

export const CategoryListContext = createContext();

export const CategoryListContextProvider = ({ children }) => {
  const [categoryList, setCategoryList] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [categorySelected, setCategorySelected] = useState(null);

  const { user } = useContext(AuthenticationContext);
  const { user_id } = user;

  const { month_year } = useContext(DateOperationsContext);

  const [new_categoryName, setNew_CategoryName] = useState("");
  const [category_list_info_forRequest, setCategory_list_info_forRequest] =
    useState(getCategoryListInitialInfo(user_id));
  const [category_list_info_forUpdate, setCategory_list_info_forUpdate] =
    useState(updateCategoryListExpenseCategoryObject(user_id, month_year));
  const [newCategoryAdded, setNewCategoryAdded] = useState(false);
  const [action_to_do, setAction_to_do] = useState("");

  useEffect(() => {
    (async () => {
      setIsLoading(true);

      try {
        const category_list = await getCategoryList_By_UserID_Request(user_id);
        category_list
          ? setCategoryList(category_list.data)
          : console.log("THERE MUST BE AN ERROR FETCHING CATEGORY LIST...");
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [newCategoryAdded]);

  const settingNewCategoryName = (newName, navigation) => {
    const words = newName.split(" ");
    if (words.length < 2) {
      if (action_to_do === "new_expense_category") {
        setNew_CategoryName(newName);
        setCategory_list_info_forRequest((prevState) => ({
          ...prevState,
          new_expense_category_node: {
            ...prevState.new_expense_category_node,
            category_name: newName,
            short_name: newName,
          },
        }));
        navigation.navigate("Enter_amount_with_options_view", {
          comingFrom: "GeneralNewNameView",
        });
      }
      // user_id: user_id,
      // new_category_name: "",
      // new_limit_amount: 0,
      // new_short_name: "",
      // month_year: month_year,
      // updated_on: "",
      // category_id: "",

      if (action_to_do === "update_expense_category") {
        setNew_CategoryName(newName);
        setCategory_list_info_forUpdate((prevState) => ({
          ...prevState,
          new_category_name: newName,
          new_short_name: newName,
        }));
        navigation.navigate("Enter_amount_with_options_view", {
          comingFrom: "GeneralNewNameView",
        });
      }
    }

    if (words.length >= 2) {
      const firstInitial = words[0][0].toUpperCase();
      const secondWordInitialLetter = words[1].charAt(0).toUpperCase();
      const secondWord = secondWordInitialLetter + words[1].slice(1);

      const shortName = `${firstInitial}. ${secondWord}`;
      if (action_to_do === "new_expense_category") {
        setCategory_list_info_forRequest((prevState) => ({
          ...prevState,
          new_expense_category_node: {
            ...prevState.new_expense_category_node,
            category_name: newName,
            short_name: shortName,
          },
        }));
        navigation.navigate("Enter_amount_with_options_view", {
          comingFrom: "GeneralNewNameView",
        });
      }
      if (action_to_do === "update_expense_category") {
        setCategory_list_info_forUpdate((prevState) => ({
          ...prevState,
          new_category_name: newName,
          new_short_name: shortName,
        }));
        navigation.navigate("Enter_amount_with_options_view", {
          comingFrom: "GeneralNewNameView",
        });
      }
    }
  }; // <-- Missing closing brace added here

  console.log("ACTION TO DO AT CONTEXT:", action_to_do);

  const registeringNewExpenseCategory = async (navigation) => {
    setIsLoading(true);
    setTimeout(async () => {
      try {
        const response = await registerNewExpenseCategoryRequest(
          category_list_info_forRequest
        );
        if (response) {
          setIsLoading(false);
          setNewCategoryAdded(true);
          navigation.navigate("New_category_confirmation_view");
        }
      } catch (error) {
        console.log("THERE WAS AN ERROR:", error);
      }
    }, 3000);
  };

  const updatingExpenseCategory = async (navigation) => {
    setIsLoading(true);
    setTimeout(async () => {
      try {
        const response = await updatingExpenseCategoryRequest(
          category_list_info_forUpdate
        );
        if (response) {
          setIsLoading(false);
          setNewCategoryAdded(true);
          navigation.navigate("New_category_confirmation_view");
        }
      } catch (error) {
        console.log("THERE WAS AN ERROR:", error);
      }
    }, 3000);
  };
  const deletingOrSuspendingExpenseCategory = async (
    navigation,
    category_id,
    user_id,
    comingFrom
  ) => {
    console.log("CATEGORY ID AT CONTEXT:", category_id);
    setIsLoading(true);
    setTimeout(async () => {
      try {
        const response = await deleteExpenseCategoryRequest(
          category_id,
          user_id
        );
        if (response) {
          setIsLoading(false);
          navigation.navigate("HomeView");
        }
      } catch (error) {
        console.log("THERE WAS AN ERROR:", error);
      }
    }, 3000);
  };

  const clearingCategoryNameAndBack = (navigation) => {
    setNew_CategoryName("");
    navigation.goBack();
  };
  const resettingInfoForRequestsAndMovingToBudgets = (navigation) => {
    if (action_to_do === "new_expense_category") {
      setNew_CategoryName("");
      setCategory_list_info_forRequest(getCategoryListInitialInfo(user_id));
      navigation.navigate("BudgetView");
    }
    if (action_to_do === "update_expense_category") {
      setNew_CategoryName("");
      setCategory_list_info_forUpdate(
        updateCategoryListExpenseCategoryObject(user_id, month_year)
      );
      navigation.navigate("BudgetView");
    }
    // setCategory_list_info_forRequest(getCategoryListInitialInfo(user_id));
  };
  // const resettingCategoryListInfoForRequest = (navigation) => {
  //   setNew_CategoryName("");
  //   setCategory_list_info_forRequest(getCategoryListInitialInfo(user_id));
  // };

  const goingHome = (navigation) => {
    setNewCategoryAdded(false);
    setNew_CategoryName("");
    setCategory_list_info_forRequest(getCategoryListInitialInfo(user_id));
    navigation.navigate("Home");
  };

  return (
    <CategoryListContext.Provider
      value={{
        categoryList,
        isLoading,
        new_categoryName,
        setNew_CategoryName,
        clearingCategoryNameAndBack,
        category_list_info_forRequest,
        settingNewCategoryName,
        setCategory_list_info_forRequest,
        category_list_info_forRequest,
        resettingInfoForRequestsAndMovingToBudgets,
        registeringNewExpenseCategory,
        goingHome,
        category_list_info_forUpdate,
        setCategory_list_info_forUpdate,
        setAction_to_do,
        action_to_do,
        updatingExpenseCategory,
        deletingOrSuspendingExpenseCategory,
        setCategorySelected,
        categorySelected,
      }}
    >
      {children}
    </CategoryListContext.Provider>
  );
};
