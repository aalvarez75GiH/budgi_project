import { useState, useContext } from "react";
import { RegularCategoryTile } from "../global_components/organisms/tiles/category_list_tile";

import { DateOperationsContext } from "../infrastructure/services/date_operations/date_operations.context";
import { CategoryListContext } from "../infrastructure/services/category_list/category_list.context";
import { TransactionsContext } from "../infrastructure/services/transactions/transactions.context";

export const useSelectCategoryLogic = () => {
  //   ****** DATA FROM DATES OPERATIONS CONTEXT ************
  const { system_date, expenseDate } = useContext(DateOperationsContext);

  //   ****** DATA FROM CATEGORY LIST CONTEXT ************
  const { categoryList, isLoading, sortingExpenseCategories } =
    useContext(CategoryListContext);
  const { expense_categories } = categoryList;

  //   ****** DATA FROM TRANSACTIONS CONTEXT ************
  const { setReadyToUpdate } = useContext(TransactionsContext);

  const [selectedItem, setSelectedItem] = useState(null);

  const {
    transactionInfoForRequest,
    transactionInfoForUpdate,
    setTransactionInfoForRequest,
    setTransactionInfoForUpdate,
    fixingANumberToTwoDecimals,
  } = useContext(TransactionsContext);
  const { amount } = transactionInfoForRequest;

  //   ******** THIS LOGIC SORTS EXPENSE CATEGORIES ALPHABETICALLY ********

  const settingSystemDateAndExpenseDateOnTransactionInfoForRequest = () => {
    setTransactionInfoForRequest({
      ...transactionInfoForRequest,
      creation_date: system_date,
      transaction_date: expenseDate,
    });
  };

  //**** HERE WE SET THE CATEGORY SELECTED AND SET TRANSACTION INFO FOR REQUEST WITH INFO NEEDED ****
  const selectingCategory = (navigation, item, comingFrom) => {
    console.log(" COMING FROM AT SELECTING CATEGORY:", comingFrom);
    const { category_id, category_name, short_name, icon_name } = item;

    selectedItem === category_id;
    setSelectedItem(item.category_id);
    // console.log("SELECTED ITEM:", selectedItem);
    if (comingFrom === "AnyTransactionDetailsView") {
      setTransactionInfoForUpdate({
        ...transactionInfoForUpdate,
        category_name: category_name,
        category_id: category_id,
        icon_name: icon_name,
        short_name: short_name,
      });
      setReadyToUpdate(true);
      // navigation.navigate("Transaction_details_view");
      navigation.navigate("Transaction_details_view", {
        comingFrom: comingFrom,
      });
    }
    if (comingFrom === "Home_View") {
      setTransactionInfoForRequest({
        ...transactionInfoForRequest,
        category_name: category_name,
        category_id: category_id,
        icon_name: icon_name,
        short_name: short_name,
        amount: fixingANumberToTwoDecimals(amount),
      });
      setReadyToUpdate(true);
      navigation.navigate("Transaction_summary");
    }
  };

  const goingBack = (navigation) => {
    navigation.goBack();
  };

  const renderItem =
    (navigation, comingFrom) =>
    ({ item }) => {
      const { category_id, status } = item;
      const isSelected = selectedItem === category_id;
      // console.log("ITEM AT RENDER ITEM:", item);
      if (status === "suspended") {
        return null;
      }
      return (
        <RegularCategoryTile
          category_name={item.category_name}
          icon_name={item.icon_name}
          isSelected={isSelected}
          action={() => selectingCategory(navigation, item, comingFrom)}
        />
      );
    };

  return {
    sortingExpenseCategories,
    selectingCategory,
    goingBack,
    renderItem,
    expense_categories,
    isLoading,
    settingSystemDateAndExpenseDateOnTransactionInfoForRequest,
    expenseDate,
  };
};
