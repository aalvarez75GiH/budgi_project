import React, { useState, createContext, useEffect, useContext } from "react";

export const CategoryDataContext = createContext();
// import { getCategoryList_By_UserID_Request } from "./category_list.services";
import {
  getCategoryData_By_UserID_MonthYearRequest,
  getAllCategoriesData_By_UserID_Request,
} from "./category_data.services";
import { AuthenticationContext } from "../authentication/authentication.context";
import { DateOperationsContext } from "../date_operations/date_operations.context";

export const CategoryDataContextProvider = ({ children }) => {
  const [categoryData, setCategoryData] = useState({});
  const [categoriesData, setCategoriesData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useContext(AuthenticationContext);
  const { user_id } = user;

  const { month_year } = useContext(DateOperationsContext);

  useEffect(() => {
    (async () => {
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
        setCategoriesData(categories_data.data);
      }
    })();
  }, []);

  console.log("CATEGORIES DATA CONTEXT:", categoriesData);

  return (
    <CategoryDataContext.Provider
      value={{
        categoryData,
        categoriesData,
        isLoading,
      }}
    >
      {children}
    </CategoryDataContext.Provider>
  );
};
