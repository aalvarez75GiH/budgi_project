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
import { EmptyInfoAlert } from "../../global_components/empty_info_alert";
import { ExitHeaderComponent } from "../../global_components/organisms/headers/exit_header.component";

import { CategoryDataContext } from "../../infrastructure/services/category_data/category_data.context";
import { AuthenticationContext } from "../../infrastructure/services/authentication/authentication.context";
import { DateOperationsContext } from "../../infrastructure/services/date_operations/date_operations.context";
import { TransactionsContext } from "../../infrastructure/services/transactions/transactions.context";
import { CategoryListContext } from "../../infrastructure/services/category_list/category_list.context";

export const BudgetView = ({ navigation }) => {
  const {
    categoryDataRequestStatus,
    categoryData,
    gettingCategoryData_onDemand,
  } = useContext(CategoryDataContext);
  console.log(
    "CATEGORY DFATA AT BUDGETS VIEW:",
    JSON.stringify(categoryData, null, 2)
  );
  console.log(
    "CATEGORY DATA STATUS REQUEST:",
    JSON.stringify(categoryDataRequestStatus, null, 2)
  );
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
    resetMonth_year_toRender,
    set_month_year_toRender,
    month_year_toRender,
  } = useContext(DateOperationsContext);

  const { packagingAndFilteringTransactionsAndAmountByCategoryBudget } =
    useMyTransactionsLogic();

  const { transactionsByMonthYear } = useContext(TransactionsContext);

  const { category_list_info_forUpdate, setCategory_list_info_forUpdate } =
    useContext(CategoryListContext);

  // console.log(
  //   "TOTAL AMOUNT TO RENDER AT BUDGET VIEW:",
  //   JSON.stringify(totalAmountToRenderForBudgets, null, 2)
  // );
  // const { transactionsByMonthYear } = useContext(TransactionsContext);
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
  const [screenIsLoading, setScreenIsLoading] = useState(true);
  console.log(
    "CATEGORY SELECTED AT BUDGET VIEW:",
    JSON.stringify(categorySelected, null, 2)
  );
  // console.log(
  //   "CATEGORY DATA AT BUDGET VIEW:",
  //   JSON.stringify(categoryData, null, 2)
  // );

  useEffect(() => {
    // setMonthSelected(month_name);
    const initialAmountsMathLogicForFirstCategoryData = async () => {
      packagingAndFilteringTransactionsAndAmountByCategoryBudget(
        firstCategoryDataExpenseCategories.category_id,
        transactionsByMonthYear
      );
      // setScreenIsLoading(true);
      setTimeout(() => {
        setPercentageCompleted(
          firstCategoryDataExpenseCategories.percentageCompleted
        );
        setOverSpentAmountInNegative(
          firstCategoryDataExpenseCategories.overSpentAmountInNegative
        );
        setScreenIsLoading(false);
      }, 500);
    };
    initialAmountsMathLogicForFirstCategoryData();

    return async () => {
      setMonthSelected(month_name);
      resetMonth_year_toRender();
      await gettingCategoryData_onDemand(current_month_year);
    };
  }, []);

  useEffect(() => {
    const testMath = async () => {
      console.log("EXECUTING...");
      if (!categorySelected || categorySelected.category_id == null) {
        console.log(
          "categorySelected or categorySelected.category_id is null or undefined"
        );

        setPercentageCompleted(
          firsCategoryDataExpenseCategoryName.percentageCompleted
        );
        setOverSpentAmountInNegative(
          firsCategoryDataExpenseCategoryName.overSpentAmountInNegative
        );
        setOverSpentAmountInPositive(
          firsCategoryDataExpenseCategoryName.overSpentAmountInPositive
        );
        return; // Exit the useEffect if the check fails
      }

      packagingAndFilteringTransactionsAndAmountByCategoryBudget(
        selectedItem,
        transactionsByMonthYear
      );
      const index = categoryData.category_data_expenseCategories.findIndex(
        (category_data) =>
          category_data.category_id === categorySelected.category_id
      );
      console.log(
        "CATEGORY SELECTED AT TEST MATH:",
        JSON.stringify(
          categoryData.category_data_expenseCategories[index],
          null,
          2
        )
      );

      if (index === -1) {
        console.log("CATEGORY SELECTED NOT FOUND");
        return;
      }

      if (index !== -1) {
        setCategorySelected(
          categoryData.category_data_expenseCategories[index]
        );
        setPercentageCompleted(
          categoryData.category_data_expenseCategories[index]
            .percentageCompleted
        );
        setOverSpentAmountInNegative(
          categoryData.category_data_expenseCategories[index]
            .overSpentAmountInNegative
        );
        setOverSpentAmountInPositive(
          categoryData.category_data_expenseCategories[index]
            .overSpentAmountInPositive
        );
      }
    };
    testMath();
  }, [categorySelected, categoryData]);

  const refreshDonutChartMathOnDemand = (categorySelected) => {
    // console.log("CATEGORY SELECTED AT BUDGET VIEW:", categorySelected);
    setIsLoading(true);
    setPercentageCompleted(0);
    setOverSpentAmountInNegative(0);
    setTimeout(() => {
      setPercentageCompleted(categorySelected.percentageCompleted);
      setOverSpentAmountInNegative(categorySelected.overSpentAmountInNegative);
      setOverSpentAmountInPositive(categorySelected.overSpentAmountInPositive);

      // Use the local variable for calculation to ensure the updated value is used

      setIsLoading(false);
    }, 300);
  };

  const selectingCategory = (item) => {
    const { category_id } = item;
    selectedItem === category_id;
    setSelectedItem(item.category_id);
    setCategorySelected(item);
    refreshDonutChartMathOnDemand(item);
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
  const movingForwardToNewCategoryNameView = () => {
    navigation.navigate("New_category_name_View", {
      comingFrom: "BudgetsView",
    });
  };
  const movingForwardToNewCategoryNameViewForUpdatingCategory = () => {
    setCategory_list_info_forUpdate({
      ...category_list_info_forUpdate,
      new_category_name: categorySelected.category_name,
      new_limit_amount: categorySelected.limit_amount,
      new_short_name: categorySelected.short_name,
    });
    navigation.navigate("New_category_name_View", {
      comingFrom: "BudgetsView",
    });
  };

  return screenIsLoading ? (
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
  ) : categoryDataRequestStatus === 404 ? (
    <SafeArea background_color="#FFFFFF">
      <ExitHeaderComponent
        navigation={navigation}
        direction={"column"}
        color={theme.colors.bg.p_FFFFFF}
        // color={"#FAA"}
        // flexibility={0.14}
        flexibility={0.15}
        justify={"flex-end"}
        icon_left={"80%"}
        icon_top={"0%"}
      />
      <Spacer position="top" size="small" />
      <Spacer position="top" size="small" />
      <Spacer position="top" size="small" />
      <FlexibleContainer
        //   color={theme.colors.bg.e_F4F4F4}
        //   color={"lightblue"}
        direction="column"
        flexibility={1}
        justify={"flex-start"}
        isBordered={false}
      >
        <EmptyInfoAlert
          caption="Sorry, We could not find any transaction :("
          width={"90%"}
          height={"20%"}
          color="#F9F9FA"
          justify={"center"}
          alignment={"center"}
          comingFrom="MyTransactionsView"
        />
      </FlexibleContainer>
    </SafeArea>
  ) : (
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
          // action2={() => movingForwardToTransactions(navigation)}
          action2={() => navigation.navigate("Transactions_by_category_View")}
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
            onPress={() =>
              movingForwardToNewCategoryNameViewForUpdatingCategory()
            }
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
          direction={"row"}
          // color={theme.colors.bg.p_FFFFFF}
          // color={"lightblue"}
          flexibility={0.4}
          justify={"space-between"}
          alignment={"center"}
          isBordered={true}
        >
          <ControlledContainer
            width={"20%"}
            height={"60%"}
            // color={"blue"}
            justify="center"
            alignment="center"
            direction="row"
          ></ControlledContainer>
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
          <ControlledContainer
            width={"20%"}
            height={"60%"}
            // color={"blue"}
            justify="center"
            alignment="center"
            direction="column"
          >
            <Text text_variant="bold_text_14">Max:</Text>
            <Text text_variant="bold_text_12">
              {categorySelected
                ? new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(categorySelected.limit_amount)
                : new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(firstCategoryDataExpenseCategories.limit_amount)}
            </Text>
            {/* <Text text_variant="bold_text_12">{`Max: $420`}</Text> */}
          </ControlledContainer>
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
            action={() => movingForwardToNewCategoryNameView()}
            isSelected={false}
            icon_width={25}
            // isSelected={}
          />
        </FlexibleContainer>
      </GeneralFlexContainer>
    </SafeArea>
  );
};

// return screenIsLoading ? (
//   <FlexibleContainer
//     color={theme.colors.bg.p_FFFFFF}
//     // color={"#FAD"}
//     direction="row"
//     flexibility={1}
//     justify={"center"}
//     isBordered={false}
//     alignment={"center"}
//   >
//     <IsLoadingContainer
//       size="large"
//       color={theme.colors.brand.primary}
//       caption=""
//     />
//   </FlexibleContainer>
// ) : (
//   <SafeArea background_color="#FFFFFF">
//     <GeneralFlexContainer color={theme.colors.bg.p_FFFFFF}>
//       <BudgetsHeader
//         navigation={navigation}
//         color={theme.colors.bg.p_FFFFFF}
//         //   color={"#FAA"}
//         flexibility={0.15}
//         direction={"row"}
//         caption={month_year_toRender ? month_year_toRender : month_year}
//         action1={() =>
//           movingForwardToMonthsPadView(
//             navigation,
//             user_id,
//             set_month_year_toRender
//           )
//         }
//         // action2={() => movingForwardToTransactions(navigation)}
//         action2={() => navigation.navigate("Transactions_by_category_View")}
//         action3={() => null}
//       />

//       <FlexibleContainer
//         direction={"row"}
//         color={theme.colors.bg.p_FFFFFF}
//         //   color={"lightblue"}
//         flexibility={0.1}
//         justify={"space-evenly"}
//         alignment={"center"}
//         isBordered={false}
//       >
//         <ControlledContainer
//           width={"10%"}
//           height={"60%"}
//           // color={"blue"}
//           justify="center"
//           alignment="center"
//           direction="row"
//         >
//           <SVGComponent
//             onPress={() => null}
//             icon_width={30}
//             icon_height={30}
//             position={"static"}
//             left={"0%"}
//             top={"0%"}
//             justify={"center"}
//             icon_name={
//               categorySelected === null
//                 ? firsCategoryDataExpenseCategoryIconName
//                 : categorySelected.icon_name
//             }
//             icon_color={"#14223C"}
//           />
//         </ControlledContainer>
//         <Text text_variant="bold_text_20">
//           {categorySelected === null
//             ? firsCategoryDataExpenseCategoryName
//             : categorySelected.category_name}
//         </Text>
//         <ClickableControlledContainer
//           width={"10%"}
//           height={"60%"}
//           // color={"blue"}
//           justify="center"
//           alignment="center"
//           direction="row"
//           onPress={() =>
//             movingForwardToNewCategoryNameViewForUpdatingCategory()
//           }
//         >
//           <SVGComponent
//             onPress={() => null}
//             icon_width={25}
//             icon_height={25}
//             position={"static"}
//             left={"0%"}
//             top={"0%"}
//             justify={"center"}
//             icon_name={"EditIcon"}
//             icon_color={"#898989"}
//           />
//         </ClickableControlledContainer>
//       </FlexibleContainer>

//       <FlexibleContainer
//         direction={"row"}
//         // color={theme.colors.bg.p_FFFFFF}
//         // color={"lightblue"}
//         flexibility={0.4}
//         justify={"space-between"}
//         alignment={"center"}
//         isBordered={true}
//       >
//         <ControlledContainer
//           width={"20%"}
//           height={"60%"}
//           // color={"blue"}
//           justify="center"
//           alignment="center"
//           direction="row"
//         ></ControlledContainer>
//         <BudgetsCircularChartComponent
//           primaryAmount={
//             categorySelected ? categorySelected.amount_spent : amount_spent
//           }
//           secondaryAmount={
//             categorySelected ? categorySelected.amount_avail : amount_avail
//           }
//           percentageCompleted={percentageCompleted}
//           secondaryLabel={
//             overSpentAmountInNegative ? "Over Spent: " : "Avail: "
//           }
//           overSpentAmountInNegative={overSpentAmountInNegative}
//           isSpinnerLoading={isLoading}
//         />
//         <ControlledContainer
//           width={"20%"}
//           height={"60%"}
//           // color={"blue"}
//           justify="center"
//           alignment="center"
//           direction="column"
//         >
//           <Text text_variant="bold_text_14">Max:</Text>
//           <Text text_variant="bold_text_12">
//             {categorySelected
//               ? new Intl.NumberFormat("en-US", {
//                   style: "currency",
//                   currency: "USD",
//                 }).format(categorySelected.limit_amount)
//               : new Intl.NumberFormat("en-US", {
//                   style: "currency",
//                   currency: "USD",
//                 }).format(firstCategoryDataExpenseCategories.limit_amount)}
//           </Text>
//           {/* <Text text_variant="bold_text_12">{`Max: $420`}</Text> */}
//         </ControlledContainer>
//       </FlexibleContainer>

//       <FlexibleContainer
//         direction={"column"}
//         color={theme.colors.bg.p_FFFFFF}
//         //   color={"lightblue"}
//         flexibility={0.25}
//         justify={"flex-start"}
//         alignment={"flex-start"}
//       >
//         <Spacer size="large" position="top" />
//         <Spacer size="extraLarge" position="left">
//           <Text text_variant="bold_text_16">Categories</Text>
//         </Spacer>
//         <Spacer size="large" position="bottom" />
//         <ControlledContainer
//           width={"400px"}
//           height={"100px"}
//           justify="center"
//           alignment="center"
//           // color="red"
//           direction="column"
//         >
//           <FlatList
//             horizontal={true}
//             showsHorizontalScrollIndicator={false}
//             data={category_data_expenseCategories}
//             renderItem={(item) => renderCategoryItem(item)}
//             keyExtractor={(item, id) => {
//               return item.category_id;
//             }}
//           />
//         </ControlledContainer>
//       </FlexibleContainer>
//       <FlexibleContainer
//         direction={"column"}
//         //   color={theme.colors.bg.s_142223C}
//         color={theme.colors.bg.p_FFFFFF}
//         flexibility={0.15}
//         justify={"center"}
//         alignment={"center"}
//       >
//         <CircularButtonOptionComponent
//           caption={""}
//           icon_name={"PlusIcon"}
//           action={() => movingForwardToNewCategoryNameView()}
//           isSelected={false}
//           icon_width={25}
//           // isSelected={}
//         />
//       </FlexibleContainer>
//     </GeneralFlexContainer>
//   </SafeArea>
// );
