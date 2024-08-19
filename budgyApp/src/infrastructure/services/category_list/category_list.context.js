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
  const [modalActive, setModalActive] = useState(false);

  const { user } = useContext(AuthenticationContext);
  const { user_id } = user;

  const { month_year } = useContext(DateOperationsContext);

  const { categoryData } = useContext(CategoryDataContext);
  const { category_data_expenseCategories } = categoryData || {};
  let firstCategoryDataExpenseCategories;
  let firsCategoryDataExpenseCategoryName;
  let firsCategoryDataExpenseCategoryIconName;
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
  const [category_list_info_forRequest, setCategory_list_info_forRequest] =
    useState(newCategoryListExpenseCategoryObject(user_id));
  const [category_list_info_forUpdate, setCategory_list_info_forUpdate] =
    useState(updateCategoryListExpenseCategoryObject(user_id, month_year));

  const [newCategoryAdded, setNewCategoryAdded] = useState(false);
  const [categoryDeleted, setCategoryDeleted] = useState(false);
  const [categoryActivated, setCategoryActivated] = useState(false);
  const [categorySuspended, setCategorySuspended] = useState(false);
  const [action_to_do, setAction_to_do] = useState("");
  const [categorySelected, setCategorySelected] = useState(
    firstCategoryDataExpenseCategories
  );
  const [suspendedCategories, setSuspendedCategories] = useState([]);

  useEffect(() => {
    (async () => {
      fetchingCategoryListByUserID();
      sortingExpenseCategoriesForBudgetView();
    })();
  }, [newCategoryAdded, categoryDeleted, categorySuspended]);

  const fetchingCategoryListByUserID = async () => {
    setIsLoading(true);
    try {
      const category_list = await getCategoryList_By_UserID_Request(user_id);
      // **********************************************
      const { data } = category_list;
      const { expense_categories } = data;
      let expenses_categories_suspended = [];
      expense_categories.map((category) => {
        if (category.status === "suspended") {
          expenses_categories_suspended.push(category);
        }
      });
      if (expenses_categories_suspended.length > 0) {
        setSuspendedCategories(expenses_categories_suspended);
      }
      if (!expenses_categories_suspended.length) {
        setSuspendedCategories([]);
      }
      // **********************************************
      category_list
        ? setCategoryList(category_list.data)
        : console.log("THERE MUST BE AN ERROR FETCHING CATEGORY LIST...");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const sortingExpenseCategories = () => {
    const { expense_categories } = categoryList;
    expense_categories.sort((a, b) => {
      const category_nameA = a.category_name.toUpperCase(); // ignore upper and lowercase
      const category_nameB = b.category_name.toUpperCase(); // ignore upper and lowercase
      if (category_nameA < category_nameB) {
        return -1;
      }
      if (category_nameA > category_nameB) {
        return 1;
      }

      // names must be equal
      return 0;
    });
  };

  const sortingExpenseCategoriesForBudgetView = () => {
    // const { expense_categories } = categoryList;
    category_data_expenseCategories.sort((a, b) => {
      const category_nameA = a.category_name.toUpperCase(); // ignore upper and lowercase
      const category_nameB = b.category_name.toUpperCase(); // ignore upper and lowercase
      if (category_nameA < category_nameB) {
        return -1;
      }
      if (category_nameA > category_nameB) {
        return 1;
      }

      // names must be equal
      return 0;
    });
  };

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
    "CATEGORY_LIST ADDED AT CATEGORY LIST CONTEXT:",
    JSON.stringify(newCategoryAdded, null, 2)
  );
  // console.log(
  //   "CATEGORY_LIST AT CATEGORY LIST CONTEXT:",
  //   JSON.stringify(categoryList, null, 2)
  // );
  console.log(
    "SUSPENDED CATEGORIES AT CATEGORY LIST CONTEXT:",
    JSON.stringify(suspendedCategories, null, 2)
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
        console.log(
          "RESPONSE AT CONTEXT:",
          JSON.stringify(response.data.operation_status, null, 2)
        );
        if (response.data.operation_status === "expense_category_removed") {
          setIsLoading(false);
          setModalActive(true);
          setCategoryDeleted(true);
        } else {
          setIsLoading(false);
          setModalActive(true);
          setCategorySuspended(true);
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
    setModalActive(false);
    set_update_category_name("");
    setNewCategoryAdded(false);
    setCategoryDeleted(false);
    setCategorySuspended(false);
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
        clearingCategoryNameAndBack,
        settingNewCategoryName,
        setCategory_list_info_forRequest,
        category_list_info_forRequest,
        resettingInfoForRequestsAndMovingToBudgets,
        registeringNewExpenseCategory,
        category_list_info_forUpdate,
        setCategory_list_info_forUpdate,
        setAction_to_do,
        action_to_do,
        updatingExpenseCategory,
        deletingOrSuspendingExpenseCategory,
        setCategorySelected,
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
        setCategoryActivated,
        categoryListContextStateReset,
        movingBackToHome,
        suspendedCategories,
        sortingExpenseCategories,
        sortingExpenseCategoriesForBudgetView,
        modalActive,
        setModalActive,
        categorySuspended,
        categoryDeleted,
      }}
    >
      {children}
    </CategoryListContext.Provider>
  );
};
