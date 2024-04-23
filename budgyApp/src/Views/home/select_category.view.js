import React, { useContext, useEffect, useState } from "react";
import { FlatList } from "react-native";
//  ****** My Imports

import { BackHeaderWithLabelComponent } from "../../global_components/organisms/headers/back_header_withLabel.component";
import { RegularCategoryTile } from "../../global_components/organisms/tiles/category_list_tile";

import { FlexibleContainer } from "../../global_components/containers/flexible_container";
import { theme } from "../../infrastructure/theme";
import { SafeArea } from "../../global_components/safe-area.component";
import { IsLoadingContainer } from "../../global_components/containers/isLoading_container";
import { sortingExpenseCategories } from "./home.handlers";
import { GeneralFlexContainer } from "../../global_components/containers/general_flex_container";

// ****** Context's
import { TransactionsContext } from "../../infrastructure/services/transactions/transactions.context";
import { CategoryListContext } from "../../infrastructure/services/category_list/category_list.context";
import { DateOperationsContext } from "../../infrastructure/services/date_operations/date_operations.context";

export const SelectCategoryView = ({ navigation }) => {
  // ********** Transactions context consumption **********
  const {
    transactionInfoForRequest,
    setTransactionInfoForRequest,
    fixingANumberToTwoDecimals,
  } = useContext(TransactionsContext);
  const { amount } = transactionInfoForRequest;
  // console.log(
  //   "TRANSACTION INFO FOR REQUEST AT SELECT CATEGORY VIEW:",
  //   JSON.stringify(transactionInfoForRequest, null, 2)
  // );
  // ********** Date operations context consumption **********
  const { system_date, expenseDate } = useContext(DateOperationsContext);

  // ********** Category List context consumption **********
  const { categoryList, isLoading } = useContext(CategoryListContext);
  const { expense_categories } = categoryList;

  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    sortingExpenseCategories(expense_categories);
    setTransactionInfoForRequest({
      ...transactionInfoForRequest,
      creation_date: system_date,
      transaction_date: expenseDate,
    });
  }, []);

  //**** HERE WE SET THE CATEGORY SELECTED AND SET TRANSACTION INFO FOR REQUEST WITH INFO NEEDED ****
  const selectingCategory = (item) => {
    const { category_id, category_name, short_name, icon_name } = item;
    // console.log("ITEM NAME AT SELECTING CATEGORY :", item.category_name);
    selectedItem === category_id;
    setSelectedItem(item.category_id);
    // console.log("SELECTED ITEM:", selectedItem);
    setTransactionInfoForRequest({
      ...transactionInfoForRequest,
      category_name: category_name,
      category_id: category_id,
      icon_name: icon_name,
      short_name: short_name,
      amount: fixingANumberToTwoDecimals(amount),
    });
    navigation.navigate("Transaction_summary");
  };

  const renderItem = ({ item }) => {
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
        action={() => selectingCategory(item)}
      />
    );
  };
  const goingBack = () => {
    navigation.goBack();
  };

  return (
    <SafeArea background_color={"#FFFFFF"}>
      {isLoading ? (
        <FlexibleContainer
          color={theme.colors.bg.p_FFFFFF}
          // color={"#FAD"}
          direction="row"
          flexibility={1}
          justify={"center"}
          isBordered={false}
        >
          <IsLoadingContainer
            size="large"
            color={theme.colors.brand.primary}
            caption="Loading categories..."
          />
        </FlexibleContainer>
      ) : (
        <GeneralFlexContainer>
          <BackHeaderWithLabelComponent
            navigation={navigation}
            caption="Select category"
            direction={"row"}
            color={theme.colors.bg.p_FFFFFF}
            flexibility={0.5}
            action={goingBack}
            // color={"#FAD"}
          />
          <FlexibleContainer
            direction={"column"}
            color={theme.colors.bg.e_F4F4F4}
            flexibility={4}
            justify={"center"}
          >
            <FlatList
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              data={expense_categories}
              renderItem={renderItem}
              keyExtractor={(item, id) => {
                return item.category_id;
              }}
            />
          </FlexibleContainer>
        </GeneralFlexContainer>
      )}
    </SafeArea>
  );
};
