import React, { useState, createContext, useEffect, useContext } from "react";

export const CategoryListContext = createContext();
import { getCategoryList_By_UserID_Request } from "./category_list.services";
import { AuthenticationContext } from "../authentication/authentication.context";

export const CategoryListContextProvider = ({ children }) => {
  const [categoryList, setCategoryList] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useContext(AuthenticationContext);
  const { user_id } = user;
  console.log("USER_ID AT CATEGORY LIST CONTEXT:", user_id);
  // console.log("CATEGORY LIST CONTEXT:", categoryList);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        // setTimeout(async () => {
        const category_list = await getCategoryList_By_UserID_Request(user_id);
        // console.log(
        //   "CATEGORY LIST AT CONTEXT:",
        //   JSON.stringify(category_list.data, null, 2)
        // );
        category_list
          ? setCategoryList(category_list.data)
          : console.log("THERE MUST BE AN ERROR FETCHING CATEGORY LIST...");
        // }, 5000);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <CategoryListContext.Provider
      value={{
        categoryList,
        isLoading,
      }}
    >
      {children}
    </CategoryListContext.Provider>
  );
};
