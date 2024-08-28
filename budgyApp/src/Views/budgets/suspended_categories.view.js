import React, { useContext, useEffect } from "react";
import { FlatList } from "react-native";

import { BackHeaderWithLabelComponent } from "../../global_components/organisms/headers/back_header_withLabel.component";

import { FlexibleContainer } from "../../global_components/containers/flexible_container";
import { theme } from "../../infrastructure/theme";
import { SafeArea } from "../../global_components/safe-area.component";
import { IsLoadingContainer } from "../../global_components/containers/isLoading_container";
import { GeneralFlexContainer } from "../../global_components/containers/general_flex_container";
import { SuspendedCategoryTile } from "../../global_components/organisms/tiles/suspended_category_tile";
import { useSelectCategoryLogic } from "../../hooks/useSelectCategoryLogic";

import { CategoryListContext } from "../../infrastructure/services/category_list/category_list.context";

export const SuspendedCategoriesView = ({ navigation, route }) => {
  const {
    suspendedCategories,
    setAction_to_do,
    set_update_category_name,
    setCategory_list_info_forUpdate,
    category_list_info_forUpdate,
  } = useContext(CategoryListContext);
  let isLoading = false;
  const { comingFrom } = route.params;
  console.log(" COMING FROM AT SELECT CATEGORY VIEW:", comingFrom);

  const movingToEnterAmountView = (item) => {
    setAction_to_do("update_expense_category");
    // set_update_category_name(categorySelected.category_name);
    setCategory_list_info_forUpdate({
      ...category_list_info_forUpdate,
      new_category_name: item.category_name,
      new_limit_amount: item.limit_amount,
      new_short_name: item.short_name,
      category_id: item.category_id,
      status: "active",
    });
    console.log("CATEGORY ID AT SELECT CATEGORY VIEW:", item.category_id);
    navigation.navigate("Enter_amount_with_options_view", {
      comingFrom: "suspendedCategoryButton",
    });
  };

  const renderItem = ({ item }) => {
    return (
      <SuspendedCategoryTile
        category_name={item.category_name}
        icon_name={item.icon_name}
        isSelected={false}
        action={() => movingToEnterAmountView(item)}
      />
    );
  };

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
            caption=" Activation"
            direction={"row"}
            color={theme.colors.bg.p_FFFFFF}
            flexibility={0.5}
            action={() => navigation.goBack()}
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
              data={suspendedCategories}
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
