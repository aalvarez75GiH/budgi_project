import React, { useState, createContext, useEffect, useContext } from "react";

export const CategoryDataContext = createContext();
// import { getCategoryList_By_UserID_Request } from "./category_list.services";
import {
  getCategoryData_By_UserID_MonthYearRequest,
  getAllCategoriesData_By_UserID_Request,
  post_category_data_Request,
} from "./category_data.services";
import { AuthenticationContext } from "../authentication/authentication.context";
import { DateOperationsContext } from "../date_operations/date_operations.context";
import { categoryDataCleanObject } from "./category_data.data";

export const CategoryDataContextProvider = ({ children }) => {
  const [categoriesData, setCategoriesData] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  const [isLoadingCategoryDataContext, setIsLoadingCategoryDataContext] =
    useState(false);
  const [category_data_onDemand, setCategory_data_onDemand] = useState(null);
  const [categoryData, setCategoryData] = useState({});
  const [categoryDataRequestStatus, setCategoryDataRequestStatus] =
    useState(null);

  const { user } = useContext(AuthenticationContext);
  const { user_id } = user;

  const { month_year, system_date } = useContext(DateOperationsContext);
  const categoryDataExpenseCategoryNodeTest = [
    {
      amount_avail: 0,
      amount_spent: 0,
      category_id: "",
      category_name: "",
      icon_name: "",
      limit_amount: 0,
      short_name: "",
      status: "",
      updated: false,
      updated_on: "",
    },
  ];
  useEffect(() => {
    (async () => {
      setIsLoadingCategoryDataContext(true);
      try {
        const category_data = await getCategoryData_By_UserID_MonthYearRequest(
          user_id,
          month_year
        );
        console.log(
          "CATEGORY DATA AT CONTEXT:",
          JSON.stringify(category_data, null, 2)
        );

        if (category_data === 404) {
          const category_data_created = await post_category_data_Request(
            user_id,
            system_date,
            month_year
          );
          console.log(
            " CATEGORY DATA CREATED:",
            JSON.stringify(category_data_created.data, null, 2)
          );
          setCategoryData(category_data_created.data);
          // setCategoryData(categoryDataCleanObject(user_id, month_year));
          return;
        }

        if (category_data.status === 200) {
          setCategoryData(category_data.data);
        }
        // **********************************************************************
        const categories_data = await getAllCategoriesData_By_UserID_Request(
          user_id
        );
        if (!categories_data || categories_data.length === 0) {
          // console.log("CATEGORIES DATA STATUS 404");
          setCategoriesData([]);
        } else {
          setCategoriesData(categories_data);
        }
        // **********************************************************************
      } catch (error) {
        console.log(" CATEGORY DATA ERROR:", error.data);
      } finally {
        setIsLoadingCategoryDataContext(false);
      }

      // gettingCurrentCategoryDataAndAllCategoriesData(user_id, month_year);
    })();
  }, []);

  console.log(
    "CATEGORY DATA AT CONTEXT OUTSIDE:",
    JSON.stringify(categoryData, null, 2)
  );
  console.log(
    "STATUS OUTSIDE:",
    JSON.stringify(categoryDataRequestStatus, null, 2)
  );

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
      // return index;
      // setCategoryData(categoriesData.data[index]);
    } catch (error) {
      console.log("ERROR:", error);
    } finally {
      setIsLoadingCategoryDataContext(false);
    }
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
      }}
    >
      {children}
    </CategoryDataContext.Provider>
  );
};
