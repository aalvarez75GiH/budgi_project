import React, { useContext, useEffect } from "react";
import { FlatList } from "react-native";

import { BackHeaderWithLabelComponent } from "../../global_components/organisms/headers/back_header_withLabel.component";

import { FlexibleContainer } from "../../global_components/containers/flexible_container";
import { theme } from "../../infrastructure/theme";
import { SafeArea } from "../../global_components/safe-area.component";
import { IsLoadingContainer } from "../../global_components/containers/isLoading_container";
import { GeneralFlexContainer } from "../../global_components/containers/general_flex_container";
import { useSelectCategoryLogic } from "../../hooks/useSelectCategoryLogic";

import { TransactionsContext } from "../../infrastructure/services/transactions/transactions.context";
import { DateOperationsContext } from "../../infrastructure/services/date_operations/date_operations.context";

export const GeneralSelectCategoryView = ({ navigation, route }) => {
  // ******* LOGIC FROM HOOK ********
  const {
    sortingExpenseCategories,
    goingBack,
    renderItem,
    expense_categories,
    isLoading,
    settingSystemDateAndExpenseDateOnTransactionInfoForRequest,
  } = useSelectCategoryLogic();

  const { comingFrom } = route.params;

  useEffect(() => {
    sortingExpenseCategories();
    {
      comingFrom === "Home_View"
        ? settingSystemDateAndExpenseDateOnTransactionInfoForRequest()
        : null;
    }
  }, []);

  return (
    <SafeArea background_color={theme.colors.bg.p_FFFFFF}>
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
            action={() => goingBack(navigation)}
            align="flex-end"
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
              renderItem={renderItem(navigation, comingFrom)}
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
