import { useState, useContext } from "react";
import { TransactionsContext } from "../infrastructure/services/transactions/transactions.context";
import { RegularCategoryTile } from "../global_components/organisms/tiles/category_list_tile";

export const useSelectCategoryLogic = () => {
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
  const sortingExpenseCategories = (expenseCategories) => {
    expenseCategories.sort((a, b) => {
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

  //**** HERE WE SET THE CATEGORY SELECTED AND SET TRANSACTION INFO FOR REQUEST WITH INFO NEEDED ****
  const selectingCategory = (navigation, item, comingFrom) => {
    const { category_id, category_name, short_name, icon_name } = item;

    //   ****** DATA FROM TRANSACTIONS CONTEXT ************

    // console.log("ITEM NAME AT SELECTING CATEGORY :", item.category_name);
    selectedItem === category_id;
    setSelectedItem(item.category_id);
    // console.log("SELECTED ITEM:", selectedItem);
    comingFrom === "AnyTransactionDetailsView"
      ? setTransactionInfoForUpdate({
          ...transactionInfoForUpdate,
          category_name: category_name,
          category_id: category_id,
          icon_name: icon_name,
          short_name: short_name,
        })
      : setTransactionInfoForRequest({
          ...transactionInfoForRequest,
          category_name: category_name,
          category_id: category_id,
          icon_name: icon_name,
          short_name: short_name,
          amount: fixingANumberToTwoDecimals(amount),
        });

    comingFrom === "AnyTransactionDetailsView"
      ? navigation.navigate("Transaction_details_view")
      : navigation.navigate("Transaction_summary");
  };

  const goingBack = (navigation) => {
    navigation.goBack();
  };

  const renderItem =
    (navigation, comingFrom) =>
    ({ item }) => {
      const { category_id } = item;
      const isSelected = selectedItem === category_id;
      // console.log("ITEM AT RENDER ITEM:", item);
      return (
        <RegularCategoryTile
          category_name={item.category_name}
          navigation={navigation}
          category_id={item.category_id}
          icon_path={item.icon_path}
          short_name={item.short_name}
          icon_name={item.icon_name}
          item={item}
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
  };
};
