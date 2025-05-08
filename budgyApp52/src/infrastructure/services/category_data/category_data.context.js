import React, { useState, createContext, useEffect, useContext } from "react";

export const CategoryDataContext = createContext();
import {
  getCategoryData_By_UserID_MonthYearRequest,
  getAllCategoriesData_By_UserID_Request,
  post_category_data_Request,
  put_categories_money_transfer_Request,
} from "./category_data.services";
import { categoryDataInfoForMoneyTransferRequest } from "./category_data.data";

import { AuthenticationContext } from "../authentication/authentication.context";
import { DateOperationsContext } from "../date_operations/date_operations.context";

export const CategoryDataContextProvider = ({ children }) => {
  const [categoriesData, setCategoriesData] = useState([]);
  const [
    categoriesDataWithPositiveSpentAmount,
    setCategoriesDataWithPositiveSpentAmount,
  ] = useState([]);
  const [modalActive, setModalActive] = useState(false);
  const [isLoadingCategoryDataContext, setIsLoadingCategoryDataContext] =
    useState(false);
  const [category_data_onDemand, setCategory_data_onDemand] = useState(null);
  const [categoryData, setCategoryData] = useState({});
  const [categoryDataRequestStatus, setCategoryDataRequestStatus] =
    useState(null);

  const { user } = useContext(AuthenticationContext);
  const { user_id } = user;

  const { month_year, system_date } = useContext(DateOperationsContext);

  const [
    categoryDataInfoForMoneyTransfer,
    setCategoryDataInfoForMoneyTransfer,
  ] = useState(categoryDataInfoForMoneyTransferRequest(user_id, month_year));

  useEffect(() => {
    (async () => {
      setIsLoadingCategoryDataContext(true);
      try {
        const category_data = await getCategoryData_By_UserID_MonthYearRequest(
          user_id,
          month_year
        );

        if (category_data.status === 404) {
          const category_data_created = await post_category_data_Request(
            user_id,
            system_date,
            month_year
          );

          setCategoryData(category_data_created.data);
          return;
        }

        if (category_data.status === 200) {
          setCategoryData(category_data.data);
        }
        const categories_data = await getAllCategoriesData_By_UserID_Request(
          user_id
        );

        if (!categories_data.data || categories_data.data.length === 0) {
          setCategoriesData([]);
        } else {
          setCategoriesData(categories_data.data);
        }
      } catch (error) {
        console.log(" CATEGORY DATA ERROR:", error.data);
      } finally {
        setIsLoadingCategoryDataContext(false);
      }
    })();
  }, []);

  const gettingCategoryData_onDemand = async (month_year_onDemand) => {
    setIsLoadingCategoryDataContext(true);
    try {
      const category_data = await getCategoryData_By_UserID_MonthYearRequest(
        user_id,
        month_year_onDemand
      );
      if (category_data.status === 404) {
        setCategoryData({
          total_amount_budgeted: 0,
          total_amount_spent: 0,
        });
      }
      if (category_data.status === 200) {
        setCategoryData(category_data.data);
      }
    } catch (error) {
      console.log("ERROR:", error);
    } finally {
      setIsLoadingCategoryDataContext(false);
    }
  };

  const arrayingCategoriesDataWithAmountsDifferentToZeroOrOverSpent = () => {
    const array = categoryData.category_data_expenseCategories.filter(
      (category) => category.amount_avail > 0
    );

    setCategoriesDataWithPositiveSpentAmount(array);
  };

  // export const put_categories_money_transfer_Request = async (
  //   categoryDataInfoForMoneyTransfer
  // ) => {
  //   const { categoryDataEndPoint } = environment;

  //   return await axios
  //     .post(
  //       `${categoryDataEndPoint}/categories_money_transfer`,
  //       categoryDataInfoForMoneyTransfer
  //     )
  //     .then((response) => {
  //       return response;
  //     })
  //     .catch((error) => {
  //       console.log(
  //         "CATEGORY DATA ERROR STATUS AT SERVICES:",
  //         error.response.status
  //       );
  //       return error.response.status;
  //     });
  // };

  const doingCategoriesMoneyTransfer = async (navigation) => {
    setIsLoadingCategoryDataContext(true);
    console.log(
      "CATEGORY DATA INFO FOR MONEY TRANSFER AT CONTEXT BEFORE REQUEST:",
      categoryDataInfoForMoneyTransfer
    );
    try {
      const money_transfer_response =
        await put_categories_money_transfer_Request(
          categoryDataInfoForMoneyTransfer
        );

      console.log("MONEY TRANSFER RESPONSE:", money_transfer_response);

      if (money_transfer_response.status === 200) {
        console.log("MONEY TRANSFER SUCCESSFUL");
        navigation.navigate("money_transfer_confirmation_view");
      }
    } catch (error) {
      console.log("ERROR:", error);
    } finally {
      setIsLoadingCategoryDataContext(false);
    }
  };

  const movingBackToHome = (navigation) => {
    // categoryListContextStateReset();
    navigation.reset({
      index: 0,
      routes: [{ name: "Home" }],
    });
  };

  return (
    <CategoryDataContext.Provider
      value={{
        categoryData,
        category_data_onDemand,
        isLoadingCategoryDataContext,
        gettingCategoryData_onDemand,
        setCategoryData,
        setCategoriesData,
        categoryDataRequestStatus,
        modalActive,
        setModalActive,
        arrayingCategoriesDataWithAmountsDifferentToZeroOrOverSpent,
        categoriesDataWithPositiveSpentAmount,
        setCategoryDataInfoForMoneyTransfer,
        categoryDataInfoForMoneyTransfer,
        doingCategoriesMoneyTransfer,
        movingBackToHome,
      }}
    >
      {children}
    </CategoryDataContext.Provider>
  );
};
