import React, { useContext, useEffect, useState } from "react";
import { FlatList } from "react-native";
//  ****** My Imports

import { BackHeaderWithLabelComponent } from "../../global_components/organisms/headers/back_header_withLabel.component";
import { RegularCategoryTile } from "../../global_components/organisms/tiles/category_list_tile";

import { FlexibleContainer } from "../../global_components/containers/flexible_container";
import { theme } from "../../infrastructure/theme";
import { SafeArea } from "../../global_components/safe-area.component";
import { IsLoadingContainer } from "../../global_components/containers/isLoading_container";
import { sortingExpenseCategories } from "../home/home.handlers";
import { GeneralFlexContainer } from "../../global_components/containers/general_flex_container";
import { ExitHeaderComponent } from "../../global_components/organisms/headers/exit_header.component";
import { ControlledContainer } from "../../global_components/containers/controlled_container";
import { RegularCTAButton } from "../../global_components/buttons/cta_btn";
import { Text } from "../../infrastructure/typography/text.component";
import { Spacer } from "../../global_components/optimized.spacer.component";

// ****** Context's imported **********************
import { TransactionsContext } from "../../infrastructure/services/transactions/transactions.context";
import { CategoryListContext } from "../../infrastructure/services/category_list/category_list.context";
import { DateOperationsContext } from "../../infrastructure/services/date_operations/date_operations.context";

export const CancelDeleteConfirmationView = ({ navigation, route }) => {
  const { transaction_id } = route.params;

  // ********** Transactions context consumption **********
  const { deletingTransaction, isLoading } = useContext(TransactionsContext);
  //   const { amount } = transactionInfoForRequest;

  // ********** Date operations context consumption **********
  //   const { system_date, expenseDate } = useContext(DateOperationsContext);

  // ********** Category List context consumption **********
  //   const { categoryList, isLoading } = useContext(CategoryListContext);
  //   const { expense_categories } = categoryList;

  //**** HERE WE SET THE CATEGORY SELECTED AND SET TRANSACTION INFO FOR REQUEST WITH INFO NEEDED ****

  //   const goingBack = () => {
  //     navigation.goBack();
  //   };

  const deletingTransactionProcess = async () => {
    const response = await deletingTransaction(transaction_id);
    response ? navigation.navigate("My transactions") : null;
  };

  return (
    <SafeArea background_color={"#FFFFFF"}>
      <GeneralFlexContainer color={theme.colors.bg.s_142223C}>
        <ExitHeaderComponent
          navigation={navigation}
          direction={"column"}
          color={theme.colors.bg.p_FFFFFF}
          // color={"#FAA"}
          flexibility={0.1}
        />
        <FlexibleContainer
          color={theme.colors.bg.p_FFFFFF}
          //   color={"red"}
          direction="row"
          flexibility={1.4}
          justify={"flex-start"}
          isBordered={false}
          alignment={"center"}
        >
          <ControlledContainer
            color={theme.colors.bg.p_FFFFFF}
            // color={"orange"}
            width={"100%"}
            height={"300px"}
            justify="center"
            alignment="center"
          >
            <Text text_variant="bold_text_16">
              Do you really want to delete this transaction?
            </Text>
            <Spacer position="top" size="large" />
            <RegularCTAButton
              caption="Yes, delete"
              width={310}
              height={50}
              color={theme.colors.ui.error_cancels}
              borderRadius={50}
              action={deletingTransactionProcess}
              text_variant="white_bold_text_20"
              isLoading={isLoading}
            />
          </ControlledContainer>
        </FlexibleContainer>
      </GeneralFlexContainer>
    </SafeArea>
  );
};
