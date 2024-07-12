import React, { useContext, useEffect, useState } from "react";
import { FlatList } from "react-native";

import { theme } from "../../infrastructure/theme";

import { FlexibleContainer } from "../../global_components/containers/flexible_container";
import { GeneralFlexContainer } from "../../global_components/containers/general_flex_container";
import { SafeArea } from "../../global_components/safe-area.component";
import { ControlledContainer } from "../../global_components/containers/controlled_container";
import { BudgetsCircularChartComponent } from "../../global_components/organisms/bar charts diagrams/budgets_circular_chart.component";
import { CircularButtonOptionComponent } from "../../global_components/organisms/clickables options/circularButton_option.component";
import { Text } from "../../infrastructure/typography/text.component";
import { Spacer } from "../../global_components/optimized.spacer.component";
import { BudgetsHeader } from "../../global_components/organisms/headers/budgets_view.header";

import { CategoryDataContext } from "../../infrastructure/services/category_data/category_data.context";
import { AuthenticationContext } from "../../infrastructure/services/authentication/authentication.context";

export const BudgetView = ({ navigation }) => {
  const { category_data_onDemand } = useContext(CategoryDataContext);
  console.log(
    "CATEGORY DATA ON DEMAND AT BUDGET VIEW:",
    category_data_onDemand
  );
  //   const firstCategoryData = categoriesData[0];
  const { category_data_expenseCategories, month_year } =
    category_data_onDemand;
  const firstCategoryDataExpenseCategories = category_data_expenseCategories[0];

  const { user } = useContext(AuthenticationContext);
  const { user_id } = user;

  const [categorySelected, setCategorySelected] = useState(null);
  const [percentageCompleted, setPercentageCompleted] = useState(0);
  const [overSpentAmountInNegative, setOverSpentAmountInNegative] = useState(0);
  const [overSpentAmountInPositive, setOverSpentAmountInPositive] = useState(0);
  const [selectedItem, setSelectedItem] = useState(
    firstCategoryDataExpenseCategories.category_id
  );
  const [isLoading, setIsLoading] = useState(false);
  const [month_year_toRender, set_month_year_toRender] = useState(month_year);
  const { amount_avail, amount_spent, limit_amount } =
    firstCategoryDataExpenseCategories;

  useEffect(() => {
    amountsMathLogic(firstCategoryDataExpenseCategories);
  }, []);

  //   console.log("CATEGORY SELECTED AT BUDGET VIEW:", categorySelected);

  const amountsMathLogic = (categorySelected) => {
    console.log("CATEGORY SELECTED AT BUDGET VIEW:", categorySelected);
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

  const movingForwardToMonthsPadView = (
    navigation,
    user_id,
    set_month_year_toRender
  ) => {
    navigation.navigate("Months_Pad_View", {
      user_id: user_id,
      set_month_year_toRender: set_month_year_toRender,
      comingFrom: "BudgetsView",
    });
  };

  return (
    <SafeArea background_color="#FFFFFF">
      <GeneralFlexContainer color={theme.colors.bg.p_FFFFFF}>
        <BudgetsHeader
          navigation={navigation}
          color={theme.colors.bg.p_FFFFFF}
          //   color={"#FAA"}
          flexibility={0.15}
          direction={"row"}
          month_year_toRender={month_year}
          month_year={month_year}
          action1={() =>
            movingForwardToMonthsPadView(
              navigation,
              user_id,
              set_month_year_toRender
            )
          }
          action2={() => null}
          action3={() => null}
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
          //   color={theme.colors.bg.s_142223C}
          color={theme.colors.bg.p_FFFFFF}
          flexibility={0.15}
          justify={"center"}
          alignment={"center"}
        ></FlexibleContainer>
      </GeneralFlexContainer>
    </SafeArea>
  );
};
