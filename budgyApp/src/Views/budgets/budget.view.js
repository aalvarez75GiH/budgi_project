import React, { useContext, useEffect, useState } from "react";
import { FlatList } from "react-native";

import { theme } from "../../infrastructure/theme";

import { FlexibleContainer } from "../../global_components/containers/flexible_container";
import { GeneralFlexContainer } from "../../global_components/containers/general_flex_container";
import { SafeArea } from "../../global_components/safe-area.component";
import { ControlledContainer } from "../../global_components/containers/controlled_container";
import { ClickableControlledContainer } from "../../global_components/containers/clickable_controlled_container";
import { BudgetsCircularChartComponent } from "../../global_components/organisms/bar charts diagrams/budgets_circular_chart.component";
import { CircularButtonOptionComponent } from "../../global_components/organisms/clickables options/circularButton_option.component";
import { Text } from "../../infrastructure/typography/text.component";
import { Spacer } from "../../global_components/optimized.spacer.component";
import { BudgetsHeader } from "../../global_components/organisms/headers/budgets_view.header";
import { IsLoadingContainer } from "../../global_components/containers/isLoading_container";
import { SVGComponent } from "../../global_components/image_components/svg.component";
import { useMyTransactionsLogic } from "../../hooks/useMyTransactionsLogic";

import { CategoryDataContext } from "../../infrastructure/services/category_data/category_data.context";
import { AuthenticationContext } from "../../infrastructure/services/authentication/authentication.context";
import { DateOperationsContext } from "../../infrastructure/services/date_operations/date_operations.context";
import { TransactionsContext } from "../../infrastructure/services/transactions/transactions.context";

export const BudgetView = ({ navigation }) => {
  const { categoryData, gettingCategoryData_onDemand } =
    useContext(CategoryDataContext);
  const { category_data_expenseCategories, month_year } = categoryData;
  const firstCategoryDataExpenseCategories = category_data_expenseCategories[0];
  const firsCategoryDataExpenseCategoryName =
    category_data_expenseCategories[0].category_name;
  const firsCategoryDataExpenseCategoryIconName =
    category_data_expenseCategories[0].icon_name;

  const { user } = useContext(AuthenticationContext);
  const { user_id } = user;

  const {
    setMonthSelected,
    month_name,
    month_year: current_month_year,
  } = useContext(DateOperationsContext);

  const { settingUpTransactions_byCategory_by_MonthYear_onDemand } =
    useMyTransactionsLogic();

  const { transactionsByMonthYear } = useContext(TransactionsContext);

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
  const [internalIsLoading, setInternalIsLoading] = useState(false);

  useEffect(() => {
    const test2 = async () => {
      setInternalIsLoading(true);
      setTimeout(() => {
        amountsMathLogic(firstCategoryDataExpenseCategories);
        setInternalIsLoading(false);
      }, 2000);
    };
    test2();

    return async () => {
      setMonthSelected(month_name);
      await gettingCategoryData_onDemand(current_month_year);
    };
  }, []);

  useEffect(() => {
    const test = async () => {
      //   console.log("CATEGORY DATA CHANGED");

      // Check if categorySelected or categorySelected.category_id is null or undefined
      if (!categorySelected || categorySelected.category_id == null) {
        console.log(
          "categorySelected or categorySelected.category_id is null or undefined"
        );
        amountsMathLogic(firstCategoryDataExpenseCategories);
        return; // Exit the useEffect if the check fails
      }

      const index = categoryData.category_data_expenseCategories.findIndex(
        (category_data) =>
          category_data.category_id === categorySelected.category_id
      );

      if (index !== -1) {
        setCategorySelected(
          categoryData.category_data_expenseCategories[index]
        );
        amountsMathLogic(categoryData.category_data_expenseCategories[index]);
      } else {
        console.log("Category not found");
        // Handle the case where the category is not found
      }
    };
    test();
  }, [categoryData, categorySelected]); // Also, add categorySelected to the dependency array

  const amountsMathLogic = (categorySelected) => {
    // console.log("CATEGORY SELECTED AT BUDGET VIEW:", categorySelected);
    setIsLoading(true);
    setPercentageCompleted(0);
    setOverSpentAmountInNegative(0);
    setTimeout(() => {
      const { limit_amount, amount_spent } = categorySelected;
      if (limit_amount > amount_spent) {
        setPercentageCompleted((amount_spent * 100) / limit_amount / 100);
        setIsLoading(false);
        // console.log("PERCENTAGE COMPLETED INSIDE:", percentageCompleted);
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
    }, 300);
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
        icon_width={25}
        // isSelected={}
      />
    );
  };

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
  //   const gettingTransactionsByCategory = (
  //     selectedItem,
  //     transactionsByMonthYear
  //   ) => {
  //     // const { category_id } = item;
  //     // selectedItem === category_id;
  //     // setSelectedItem(item.category_id);
  //     settingUpTransactions_byCategory_by_MonthYear_onDemand(
  //       user_id,
  //       selectedItem,
  //       month_year_toRender,
  //       transactionsByMonthYear
  //     );
  //   };

  const movingForwardToTransactions = async (navigation) => {
    const transactions_and_amount_wanted =
      await settingUpTransactions_byCategory_by_MonthYear_onDemand(
        user_id,
        selectedItem,
        month_year_toRender,
        transactionsByMonthYear
      );
    console.log(
      "TRANSACTIONS WANTED:",
      JSON.stringify(transactions_and_amount_wanted, null, 2)
    );
    navigation.navigate("Transactions_View", {
      transactions_and_amount_wanted: transactions_and_amount_wanted,
    });
  };

  return !internalIsLoading ? (
    <SafeArea background_color="#FFFFFF">
      <GeneralFlexContainer color={theme.colors.bg.p_FFFFFF}>
        <BudgetsHeader
          navigation={navigation}
          color={theme.colors.bg.p_FFFFFF}
          //   color={"#FAA"}
          flexibility={0.15}
          direction={"row"}
          caption={month_year_toRender ? month_year_toRender : month_year}
          action1={() =>
            movingForwardToMonthsPadView(
              navigation,
              user_id,
              set_month_year_toRender
            )
          }
          action2={() => movingForwardToTransactions(navigation)}
          action3={() => null}
        />

        <FlexibleContainer
          direction={"row"}
          color={theme.colors.bg.p_FFFFFF}
          //   color={"lightblue"}
          flexibility={0.1}
          justify={"space-evenly"}
          alignment={"center"}
          isBordered={false}
        >
          <ControlledContainer
            width={"10%"}
            height={"60%"}
            // color={"blue"}
            justify="center"
            alignment="center"
            direction="row"
          >
            <SVGComponent
              onPress={() => null}
              icon_width={30}
              icon_height={30}
              position={"static"}
              left={"0%"}
              top={"0%"}
              justify={"center"}
              icon_name={
                categorySelected === null
                  ? firsCategoryDataExpenseCategoryIconName
                  : categorySelected.icon_name
              }
              icon_color={"#14223C"}
            />
          </ControlledContainer>
          <Text text_variant="bold_text_20">
            {categorySelected === null
              ? firsCategoryDataExpenseCategoryName
              : categorySelected.category_name}
          </Text>
          <ClickableControlledContainer
            width={"10%"}
            height={"60%"}
            // color={"blue"}
            justify="center"
            alignment="center"
            direction="row"
            onPress={() => null}
          >
            <SVGComponent
              onPress={() => null}
              icon_width={25}
              icon_height={25}
              position={"static"}
              left={"0%"}
              top={"0%"}
              justify={"center"}
              icon_name={"EditIcon"}
              icon_color={"#898989"}
            />
          </ClickableControlledContainer>
        </FlexibleContainer>

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
        >
          <CircularButtonOptionComponent
            caption={""}
            icon_name={"PlusIcon"}
            action={() => null}
            isSelected={false}
            icon_width={25}
            // isSelected={}
          />
        </FlexibleContainer>
      </GeneralFlexContainer>
    </SafeArea>
  ) : (
    <FlexibleContainer
      color={theme.colors.bg.p_FFFFFF}
      // color={"#FAD"}
      direction="row"
      flexibility={1}
      justify={"center"}
      isBordered={false}
      alignment={"center"}
    >
      <IsLoadingContainer
        size="large"
        color={theme.colors.brand.primary}
        caption=""
      />
    </FlexibleContainer>
  );
};
