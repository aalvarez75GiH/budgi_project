import React, { useState, createContext, useEffect, useContext } from "react";

export const CategoryDataContext = createContext();
// import { getCategoryList_By_UserID_Request } from "./category_list.services";
import { getCategoryData_By_UserID_MonthYearRequest } from "./category_data.services";
import { AuthenticationContext } from "../authentication/authentication.context";
import { DateOperationsContext } from "../date_operations/date_operations.context";

export const CategoryDataContextProvider = ({ children }) => {
  const [categoryData, setCategoryData] = useState({});
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
        category_data
          ? setCategoryData(category_data.data)
          : console.log("THERE MUST BE AN ERROR FETCHING CATEGORY DATA...");
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  // console.log("CATEGORY DATA:", JSON.stringify(categoryData, null, 2));

  return (
    <CategoryDataContext.Provider
      value={{
        categoryData,
        isLoading,
      }}
    >
      {children}
    </CategoryDataContext.Provider>
  );
};
