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
  newCategoryListExpenseCategoryObject,
  updateCategoryListExpenseCategoryObject,
} from "./category_list.data";
import { AuthenticationContext } from "../authentication/authentication.context";
import { DateOperationsContext } from "../date_operations/date_operations.context";
import { CategoryDataContext } from "../category_data/category_data.context";

export const CategoryListContext = createContext();

export const CategoryListContextProvider = ({ children }) => {
  const [categoryList, setCategoryList] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useContext(AuthenticationContext);
  const { user_id } = user;

  const { month_year } = useContext(DateOperationsContext);

  const { categoryData } = useContext(CategoryDataContext);
  // const { month_year } = categoryData;
  const { category_data_expenseCategories } = categoryData || {};
  let firstCategoryDataExpenseCategories;
  let firsCategoryDataExpenseCategoryName;
  let firsCategoryDataExpenseCategoryIconName;
  // let category_data_month_year = "AUG 2024";
  let category_data_month_year = month_year;

  if (
    Array.isArray(category_data_expenseCategories) &&
    category_data_expenseCategories.length > 0
  ) {
    firstCategoryDataExpenseCategories = category_data_expenseCategories[0];
    firsCategoryDataExpenseCategoryName =
      category_data_expenseCategories[0].category_name;
    firsCategoryDataExpenseCategoryIconName =
      category_data_expenseCategories[0].icon_name;
  }

  const [update_category_name, set_update_category_name] = useState("");
  const [new_category_name, set_new_category_name] = useState("");
  console.log("UPDATE CATEGORY NAME AT CONTEXT:", update_category_name);
  // const [text_input_value, set_text_input_value] = useState("");
  const [category_list_info_forRequest, setCategory_list_info_forRequest] =
    useState(newCategoryListExpenseCategoryObject(user_id));
  const [category_list_info_forUpdate, setCategory_list_info_forUpdate] =
    useState(updateCategoryListExpenseCategoryObject(user_id, month_year));

  console.log(
    "CATEGORY LIST INFO FOR UPDATE AT CONTEXT:",
    JSON.stringify(category_list_info_forUpdate, null, 2)
  );

  const [newCategoryAdded, setNewCategoryAdded] = useState(false);
  const [categoryDeleted, setCategoryDeleted] = useState(false);
  const [action_to_do, setAction_to_do] = useState("");
  const [categorySelected, setCategorySelected] = useState(
    firstCategoryDataExpenseCategories
  );
  console.log("CATEGORY ADDED AT CONTEXT:", newCategoryAdded);
  console.log("CATEGORY DELETED AT CONTEXT:", categoryDeleted);

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
  }, [newCategoryAdded, categoryDeleted]);

  const settingNewCategoryName = (newName, navigation) => {
    const words = newName.split(" ");
    if (words.length < 2) {
      if (action_to_do === "new_expense_category") {
        set_new_category_name(newName);
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

      if (action_to_do === "update_expense_category") {
        set_update_category_name(newName);
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

  console.log(
    "CATEGORY_LIST AT CONTEXT:",
    JSON.stringify(categoryList, null, 2)
  );

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
          setCategoryDeleted(true);
          movingBackToHome(navigation);
          // navigation.navigate("HomeView");
        }
      } catch (error) {
        console.log("THERE WAS AN ERROR:", error);
      }
    }, 3000);
  };

  const clearingCategoryNameAndBack = (navigation) => {
    setNewCategoryAdded(false);
    set_update_category_name("");
    set_new_category_name("");
    // set_text_input_value("");
    navigation.goBack();
  };

  const categoryListContextStateReset = () => {
    set_new_category_name("");
    set_update_category_name("");
    setNewCategoryAdded(false);
    setCategoryDeleted(false);
    setCategory_list_info_forRequest(
      newCategoryListExpenseCategoryObject(user_id)
    );
    setCategory_list_info_forUpdate(
      updateCategoryListExpenseCategoryObject(user_id, month_year)
    );
  };

  const resettingInfoForRequestsAndMovingToBudgets = (navigation) => {
    if (action_to_do === "new_expense_category") {
      set_new_category_name("");
      setCategory_list_info_forRequest(
        newCategoryListExpenseCategoryObject(user_id)
      );
      navigation.navigate("BudgetView");
    }
    if (action_to_do === "update_expense_category") {
      set_update_category_name("");
      setCategory_list_info_forUpdate(
        updateCategoryListExpenseCategoryObject(user_id, month_year)
      );
      navigation.navigate("BudgetView");
    }
  };

  // const goingHome = (navigation) => {
  //   setNewCategoryAdded(false);
  //   // set_text_input_value("");
  //   setCategory_list_info_forRequest(
  //     newCategoryListExpenseCategoryObject(user_id)
  //   );
  //   navigation.navigate("HomeView");
  // };

  const movingBackToHome = (navigation) => {
    categoryListContextStateReset();
    navigation.reset({
      index: 0,
      routes: [{ name: "Home" }],
    });
  };

  return (
    <CategoryListContext.Provider
      value={{
        categoryList,
        isLoading,
        // text_input_value,
        // set_text_input_value,
        clearingCategoryNameAndBack,
        settingNewCategoryName,
        setCategory_list_info_forRequest,
        category_list_info_forRequest,
        resettingInfoForRequestsAndMovingToBudgets,
        registeringNewExpenseCategory,
        // goingHome,
        category_list_info_forUpdate,
        setCategory_list_info_forUpdate,
        setAction_to_do,
        action_to_do,
        updatingExpenseCategory,
        deletingOrSuspendingExpenseCategory,
        setCategorySelected,
        // ********************************************
        categorySelected,
        firstCategoryDataExpenseCategories,
        firsCategoryDataExpenseCategoryName,
        firsCategoryDataExpenseCategoryIconName,
        category_data_month_year,
        category_data_expenseCategories,
        new_category_name,
        set_new_category_name,
        update_category_name,
        set_update_category_name,
        setCategoryDeleted,
        setNewCategoryAdded,
        categoryListContextStateReset,
        movingBackToHome,
        // firstCategoryDataExpenseCategoryInfo,

        // ********************************************
      }}
    >
      {children}
    </CategoryListContext.Provider>
  );
};
