import React, { useContext, useEffect, useState } from "react";
import { FlatList } from "react-native";

import { theme } from "../../infrastructure/theme";

import { FlexibleContainer } from "../../global_components/containers/flexible_container";
// import { FooterMenuContainer } from "../../global_components/organisms/menu-footers/menu_footer.container";
import { GeneralFlexContainer } from "../../global_components/containers/general_flex_container";
// import { useHomeLogic } from "../../hooks/useHomeLogic";
import { ExitHeaderComponent } from "../../global_components/organisms/headers/exit_header.component";
import { SafeArea } from "../../global_components/safe-area.component";
import { ControlledContainer } from "../../global_components/containers/controlled_container";
import { BudgetsCircularChartComponent } from "../../global_components/organisms/bar charts diagrams/budgets_circular_chart.component";
import { CircularButtonOptionComponent } from "../../global_components/organisms/clickables options/circularButton_option.component";

import { CategoryDataContext } from "../../infrastructure/services/category_data/category_data.context";
import { set } from "date-fns";
import { Text } from "../../infrastructure/typography/text.component";
import { Spacer } from "../../global_components/optimized.spacer.component";

export const BudgetView = ({ navigation }) => {
  const { categoriesData } = useContext(CategoryDataContext);
  console.log("CATEGORIES DATA AT BUDGET VIEW:", categoriesData);
  const firstCategoryData = categoriesData[0];
  const { category_data_expenseCategories } = firstCategoryData;
  const firstCategoryDataExpenseCategories = category_data_expenseCategories[0];
  //   console.log(
  //     "FIRST CATEGORY DATA EXPENSE CATEGORIES AT BUDGET VIEW:",
  //     category_data_expenseCategories
  //   );

  const [categorySelected, setCategorySelected] = useState(null);
  const [percentageCompleted, setPercentageCompleted] = useState(0);
  const [overSpentAmountInNegative, setOverSpentAmountInNegative] = useState(0);
  const [overSpentAmountInPositive, setOverSpentAmountInPositive] = useState(0);
  const [selectedItem, setSelectedItem] = useState(
    firstCategoryDataExpenseCategories.category_id
  );
  const [isLoading, setIsLoading] = useState(false);
  const { amount_avail, amount_spent, limit_amount } =
    firstCategoryDataExpenseCategories;

  useEffect(() => {
    amountsMathLogic(firstCategoryDataExpenseCategories);
  }, []);

  const amountsMathLogic = (categorySelected) => {
    setIsLoading(true);
    setPercentageCompleted(0);
    setOverSpentAmountInNegative(0);
    setTimeout(() => {
      const { limit_amount, amount_spent } = categorySelected;
      if (limit_amount > amount_spent) {
        setPercentageCompleted((amount_spent * 100) / limit_amount / 100);
        setIsLoading(false);
      }
      if (limit_amount < amount_spent) {
        const overSpentAmountInNegative = limit_amount - amount_spent;
        const overSpentAmountInPositive = amount_spent - limit_amount;

        setOverSpentAmountInNegative(overSpentAmountInNegative);
        setOverSpentAmountInPositive(overSpentAmountInPositive);

        // Use the local variable for calculation to ensure the updated value is used
        const percentageCompleted = overSpentAmountInPositive / limit_amount;
        setPercentageCompleted(percentageCompleted);
        setIsLoading(false);
      }
    }, 1000);
  };

  const selectingCategory = (item) => {
    const { category_id } = item;
    selectedItem === category_id;
    setSelectedItem(item.category_id);
    setCategorySelected(item);
    amountsMathLogic(item);
  };

  const renderCategoryItem = ({ item }) => {
    // console.log("ITEM:", item);
    const { category_id, icon_name, short_name } = item;
    const isSelected = selectedItem === category_id;
    return (
      <CircularButtonOptionComponent
        caption={short_name}
        icon_name={icon_name}
        action={() => selectingCategory(item)}
        isSelected={isSelected}
        // isSelected={}
      />
    );
  };

  console.log("SELECTED CATEGORY:", selectedItem);
  const switchingOptions = (option) => {
    setIsSpinnerLoading(true);
    setTimeout(() => {
      setIsSpinnerLoading(false);
    }, 800);
    set_tile_selected(option);
  };

  return (
    <SafeArea background_color="#FFFFFF">
      <GeneralFlexContainer color={theme.colors.bg.p_FFFFFF}>
        <FlexibleContainer
          direction={"column"}
          color={theme.colors.bg.p_FFFFFF}
          //   color={"brown"}
          flexibility={0.04}
          justify={"center"}
          alignment={"center"}
        ></FlexibleContainer>
        <ExitHeaderComponent
          navigation={navigation}
          direction={"column"}
          color={theme.colors.bg.p_FFFFFF}
          //   color={"#FAA"}
          flexibility={0.15}
        />

        <FlexibleContainer
          direction={"column"}
          color={theme.colors.bg.p_FFFFFF}
          //   color={"lightblue"}
          flexibility={0.4}
          justify={"center"}
          alignment={"center"}
          isBordered={true}
        >
          <BudgetsCircularChartComponent
            primaryAmount={
              categorySelected ? categorySelected.amount_spent : amount_spent
            }
            secondaryAmount={
              categorySelected ? categorySelected.amount_avail : amount_avail
            }
            percentageCompleted={percentageCompleted}
            secondaryLabel={
              overSpentAmountInNegative ? "Over Spent: " : "Avail: "
            }
            overSpentAmountInNegative={overSpentAmountInNegative}
            isSpinnerLoading={isLoading}
          />
        </FlexibleContainer>

        <FlexibleContainer
          direction={"column"}
          color={theme.colors.bg.p_FFFFFF}
          //   color={"lightblue"}
          flexibility={0.25}
          justify={"flex-start"}
          alignment={"flex-start"}
        >
          <Spacer size="large" position="top" />
          <Spacer size="extraLarge" position="left">
            <Text text_variant="bold_text_16">Categories</Text>
          </Spacer>
          <Spacer size="large" position="bottom" />
          <ControlledContainer
            width={"400px"}
            height={"100px"}
            justify="center"
            alignment="center"
            // color="red"
            direction="column"
          >
            <FlatList
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={category_data_expenseCategories}
              renderItem={(item) => renderCategoryItem(item)}
              keyExtractor={(item, id) => {
                return item.category_id;
              }}
            />
          </ControlledContainer>
        </FlexibleContainer>
        <FlexibleContainer
          direction={"column"}
          color={theme.colors.bg.s_142223C}
          // color={"brown"}
          flexibility={0.19}
          justify={"center"}
          alignment={"center"}
        ></FlexibleContainer>
      </GeneralFlexContainer>
    </SafeArea>
  );
};
