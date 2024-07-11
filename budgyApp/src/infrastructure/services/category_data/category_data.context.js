import React, { useState, createContext, useEffect, useContext } from "react";

export const CategoryDataContext = createContext();
// import { getCategoryList_By_UserID_Request } from "./category_list.services";
import {
  getCategoryData_By_UserID_MonthYearRequest,
  getAllCategoriesData_By_UserID_Request,
} from "./category_data.services";
import { AuthenticationContext } from "../authentication/authentication.context";
import { DateOperationsContext } from "../date_operations/date_operations.context";
import { set } from "date-fns";

export const CategoryDataContextProvider = ({ children }) => {
  const [categoryData, setCategoryData] = useState({});
  const [categoriesData, setCategoriesData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [category_data_onDemand, setCategory_data_onDemand] = useState(null);

  const { user } = useContext(AuthenticationContext);
  const { user_id } = user;

  const { month_year } = useContext(DateOperationsContext);

  useEffect(() => {
    (async () => {
      gettingCurrentCategoryDataAndAllCategoriesData(user_id, month_year);
    })();
  }, []);

  const gettingCurrentCategoryDataAndAllCategoriesData = async (
    user_id,
    month_year
  ) => {
    setIsLoading(true);
    try {
      const category_data = await getCategoryData_By_UserID_MonthYearRequest(
        user_id,
        month_year
      );

      if (category_data === 404) {
        setCategoryData({
          total_amount_budgeted: 0,
          total_amount_spent: 0,
        });
        return;
      } else {
        setCategoryData(category_data.data);
      }
    } catch (error) {
      console.log(" CATEGORY DATA ERROR:", error.data);
    } finally {
      setIsLoading(false);
    }

    const categories_data = await getAllCategoriesData_By_UserID_Request(
      user_id
    );
    if (!categories_data || categories_data.length === 0) {
      console.log("REAL INCOMES STATUS 404");
      setCategoriesData([]);
      return;
    } else {
      // setCategoriesData(categories_data.data);
      selectingCurrentMonthCategoryData(categories_data.data);
      // setCategory_data_onDemand(categories_data.data[0]);
    }
  };

  const selectingCurrentMonthCategoryData = (categories_data) => {
    const index = categories_data.findIndex(
      (category_data) => category_data.month_year === month_year
    );
    setCategoriesData(categories_data);
    setCategory_data_onDemand(categories_data[index]);
  };

  const gettingCategoryData_onDemand = (month_year_onDemand) => {
    setIsLoading(true);
    const index = categoriesData.findIndex(
      (category_data) => category_data.month_year === month_year_onDemand
    );
    // return index;
    setCategory_data_onDemand(categoriesData[index]);
    setIsLoading(false);
  };

  // const { categoriesData } = useContext(CategoryDataContext);
  console.log("CATEGORIES DATA AT CONTEXT:", categoriesData);
  console.log("CATEGORIES DATA ON DEMAND AT CONTEXT:", category_data_onDemand);

  return (
    <CategoryDataContext.Provider
      value={{
        categoryData,
        categoriesData,
        isLoading,
        category_data_onDemand,
        gettingCategoryData_onDemand,
        setCategory_data_onDemand,
        getAllCategoriesData_By_UserID_Request,
        setCategoriesData,
        selectingCurrentMonthCategoryData,
        gettingCurrentCategoryDataAndAllCategoriesData,
      }}
    >
      {children}
    </CategoryDataContext.Provider>
  );
};
