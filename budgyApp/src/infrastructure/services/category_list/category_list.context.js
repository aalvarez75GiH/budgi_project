import React, { useState, createContext, useEffect, useContext } from "react";
import { getCategoryList_By_UserID_Request } from "./category_list.services";
import { AuthenticationContext } from "../authentication/authentication.context";
import { registerNewExpenseCategoryRequest } from "./category_list.services";
import { getCategoryListInitialInfo } from "./category_list.data";

export const CategoryListContext = createContext();

export const CategoryListContextProvider = ({ children }) => {
  const [categoryList, setCategoryList] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useContext(AuthenticationContext);
  const { user_id } = user;

  // const user_id = user ? user.user_id : null;
  const [new_categoryName, setNew_CategoryName] = useState("");
  const [category_list_info_forRequest, setCategory_list_info_forRequest] =
    useState(getCategoryListInitialInfo(user_id));
  console.log(
    "CATEGORY_LIST_INFO_FOR REQUEST AT CONTEXT:",
    JSON.stringify(category_list_info_forRequest, null, 2)
  );
  // const [new_category_confirmed, setNew_Category_Confirmed] = useState(false);
  console.log("USER ID:", JSON.stringify(user_id, null, 2));
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      // setCategory_list_info_forRequest({
      //   ...category_list_info_forRequest,
      //   user_id: user_id,
      // });
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
  }, []);

  const settingNewCategoryName = (newName, navigation) => {
    const words = newName.split(" ");
    console.log("WORDS:", words);
    if (words.length < 2) {
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
    if (words.length >= 2) {
      const firstInitial = words[0][0].toUpperCase();
      const secondWordInitialLetter = words[1].charAt(0).toUpperCase();
      const secondWord = secondWordInitialLetter + words[1].slice(1);

      // const secondWord = words[1].camelCase();
      const shortName = `${firstInitial}. ${secondWord}`;
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
  };

  const registeringNewExpenseCategory = async (navigation) => {
    console.log("PASA POR AQUI....");
    setIsLoading(true);
    setTimeout(async () => {
      try {
        const response = await registerNewExpenseCategoryRequest(
          category_list_info_forRequest
        );
        console.log("RESPONSE:", JSON.stringify(response, null, 2));
        if (response) {
          setIsLoading(false);
          navigation.navigate("New_category_confirmation_view");
        }
        // setCategory_list_info_forRequest(CATEGORY_LIST_INITIAL_INFO);
        // setNew_Category_Confirmed(true);
        // (await response) ? listenForNewChangesAtDB() : null;
        // console.log("REAL INCOME RESPONSE:", response.data);
        // navigation.navigate("income_confirmation_view", {
        //   comingFrom: "Select_week_view",
        // });
      } catch (error) {
        console.log("THERE WAS AN ERROR:", error);
      }
    }, 3000);
  };

  const clearingCategoryNameAndBack = (navigation) => {
    setNew_CategoryName("");
    navigation.goBack();
  };
  const resettingCategoryListInfoForRequestAndMovingToBudgets = (
    navigation
  ) => {
    setNew_CategoryName("");
    setCategory_list_info_forRequest(getCategoryListInitialInfo(user_id));
    navigation.navigate("BudgetView");
  };
  const resettingCategoryListInfoForRequest = (navigation) => {
    setNew_CategoryName("");
    setCategory_list_info_forRequest(getCategoryListInitialInfo(user_id));
  };

  const goingHome = (navigation) => {
    // setNew_Category_Confirmed(false);
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
        resettingCategoryListInfoForRequestAndMovingToBudgets,
        // resettingCategoryListInfoForRequest,
        registeringNewExpenseCategory,
        // new_category_confirmed,
        goingHome,
      }}
    >
      {children}
    </CategoryListContext.Provider>
  );
};
