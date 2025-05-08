import React, { useContext } from "react";
import { FlatList, View, StyleSheet } from "react-native";

import { BackHeaderWithLabelComponent } from "../../global_components/organisms/headers/back_header_withLabel.component";

import { FlexibleContainer } from "../../global_components/containers/flexible_container";
import { theme } from "../../infrastructure/theme";
import { SafeArea } from "../../global_components/safe-area.component";
import { IsLoadingContainer } from "../../global_components/containers/isLoading_container";
import { GeneralFlexContainer } from "../../global_components/containers/general_flex_container";
import { useSelectCategoryLogic } from "../../hooks/useSelectCategoryLogic";
import { CategoryAmountAvailTile } from "../../global_components/organisms/tiles/category_amount_avail_tile";
import { ControlledContainer } from "../../global_components/containers/controlled_container";
import { Text } from "../../infrastructure/typography/text.component";
import { Spacer } from "../../global_components/optimized.spacer.component";

import { CategoryDataContext } from "../../infrastructure/services/category_data/category_data.context";

export const PositiveAvailAmountCategoriesView = ({ navigation, route }) => {
  // ******* LOGIC FROM HOOK ********
  const { goingBack, isLoading } = useSelectCategoryLogic();
  const {
    categoriesDataWithPositiveSpentAmount,
    setCategoryDataInfoForMoneyTransfer,
    categoryDataInfoForMoneyTransfer,
  } = useContext(CategoryDataContext);

  const settingInfoForTransferAndMovingForwardToEnterAmountView = (item) => {
    setCategoryDataInfoForMoneyTransfer({
      ...categoryDataInfoForMoneyTransfer,
      transmitter_category_id: item.category_id,
      transmitter_category_name: item.category_name,
      transmitter_available_amount: item.amount_avail,
    });
    navigation.navigate("Enter_amount_view", {
      comingFrom: "positive_avail_amount_categories_view",
    });
  };

  console.log(
    "CATEGORY DATA INFO FOR MONEY REQUEST:",
    JSON.stringify(categoryDataInfoForMoneyTransfer, null, 2)
  );

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
            caption=""
            direction={"row"}
            color={theme.colors.bg.p_FFFFFF}
            flexibility={0.3}
            action={() => goingBack(navigation)}
            align="flex-end"
            // color={"#FAD"}
          />
          <Spacer position="left" size="large">
            <Text text_variant="bold_text_20">
              Choose a category with an amount
            </Text>
          </Spacer>
          <Spacer position="left" size="small">
            <Spacer position="left" size="large">
              <Text text_variant="bold_text_20">available:</Text>
            </Spacer>
          </Spacer>
          <Spacer position="bottom" size="large"></Spacer>
          <FlexibleContainer
            color={theme.colors.bg.p_FFFFFF}
            // color={"#FAD"}
            direction="row"
            flexibility={2}
            justify={"center"}
            isBordered={false}
            alignment={"center"}
          >
            <ControlledContainer
              width={"400px"}
              height={"100%"}
              justify="center"
              alignment="flex-start"
              direction="row"
              // color={"lightblue"}
            >
              <FlatList
                horizontal={false}
                showsHorizontalScrollIndicator={false}
                data={categoriesDataWithPositiveSpentAmount}
                renderItem={({ item }) => (
                  <CategoryAmountAvailTile
                    category_name={item.short_name}
                    icon_name={item.icon_name}
                    amount_avail={item.amount_avail}
                    isSelected={false}
                    action={() =>
                      settingInfoForTransferAndMovingForwardToEnterAmountView(
                        item
                      )
                    }
                    item={item}
                  />
                )}
                keyExtractor={(item, id) => {
                  return item.category_name;
                }}
                key={3}
                numColumns={3}
                ItemSeparatorComponent={() => (
                  <View style={styles.itemSeparator} />
                )}
                contentContainerStyle={styles.flatListContent}
                columnWrapperStyle={styles.columnWrapper}
              />
            </ControlledContainer>
          </FlexibleContainer>
        </GeneralFlexContainer>
      )}
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  flatListContent: {
    paddingHorizontal: 3,
    height: "100%",
  },
  itemSeparator: {
    height: 0.5,
  },
  columnWrapper: {
    justifyContent: "space-evenly",
    paddingVertical: 5,
  },
});
