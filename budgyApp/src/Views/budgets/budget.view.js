import React, { useContext, useEffect, useState } from "react";
import { FlatList } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

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
import { CategoriesScrollComponent } from "../../global_components/organisms/scroll components/categories_scroll.component";
import { RoundedOptionButton } from "../../global_components/buttons/rounded_option_button";
import { TransferMoneyExplanationBottomSheet } from "../../global_components/bottom_sheets/transfer_money_explanation_bottom_sheet";

import { CategoryDataContext } from "../../infrastructure/services/category_data/category_data.context";
import { AuthenticationContext } from "../../infrastructure/services/authentication/authentication.context";
import { DateOperationsContext } from "../../infrastructure/services/date_operations/date_operations.context";
import { TransactionsContext } from "../../infrastructure/services/transactions/transactions.context";
import { CategoryListContext } from "../../infrastructure/services/category_list/category_list.context";
import { HomeContext } from "../../infrastructure/services/Home services/home.context";

export const BudgetView = ({ navigation }) => {
  const {
    categoryDataRequestStatus,
    categoryData,
    gettingCategoryData_onDemand,
    setModalActive,
    arrayingCategoriesDataWithAmountsDifferentToZeroOrOverSpent,
    setCategoryDataInfoForMoneyTransfer,
    categoryDataInfoForMoneyTransfer,
  } = useContext(CategoryDataContext);

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

  const {
    category_list_info_forUpdate,
    setCategory_list_info_forUpdate,
    setCategorySelected,
    categorySelected,
    firstCategoryDataExpenseCategories,
    firsCategoryDataExpenseCategoryName,
    firsCategoryDataExpenseCategoryIconName,
    category_data_month_year,
    category_data_expenseCategories,
    set_update_category_name,
    setCategoryDeleted,
    setNewCategoryAdded,
    suspendedCategories,
  } = useContext(CategoryListContext);

  const { setActionToDo } = useContext(HomeContext);

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

  // console.log(
  //   "CATEGORY DATA AT BUDGET VIEW:",
  //   JSON.stringify(categoryData, null, 2)
  // );

  useEffect(() => {
    // console.log(
    //   "TRANSACTIONS BY MONTH YEAR INSIDE USE EFFECT 1:",
    //   transactionsByMonthYear
    // );
    // setMonthSelected(month_name);
    const initialDonutChartGraphicNumbersForFirstCategoryData = async () => {
      setSelectedItem(firstCategoryDataExpenseCategories.category_id);
      setCategorySelected(firstCategoryDataExpenseCategories);
      packagingAndFilteringTransactionsAndAmountByCategoryBudget(
        firstCategoryDataExpenseCategories.category_id,
        transactionsByMonthYear
      );
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
    initialDonutChartGraphicNumbersForFirstCategoryData();

    return async () => {
      setCategoryDeleted(false);
      setNewCategoryAdded(false);
      setMonthSelected(month_name);
      setCategorySelected(firstCategoryDataExpenseCategories);
      resetMonth_year_toRender();
      await gettingCategoryData_onDemand(current_month_year);
    };
  }, []);

  useEffect(() => {
    // console.log(
    //   "TRANSACTIONS BY MONTH YEAR INSIDE USE EFFECT 2:",
    //   transactionsByMonthYear
    // );
    const donutChartGraphicNumbersWhenCategoryIsSelected = async () => {
      if (!categorySelected || categorySelected.category_id == null) {
        console.log(
          "categorySelected or categorySelected.category_id is null or undefined"
        );

        setPercentageCompleted(
          firstCategoryDataExpenseCategories.percentageCompleted
        );
        setOverSpentAmountInNegative(
          firstCategoryDataExpenseCategories.overSpentAmountInNegative
        );
        setOverSpentAmountInPositive(
          firstCategoryDataExpenseCategories.overSpentAmountInPositive
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
    donutChartGraphicNumbersWhenCategoryIsSelected();
  }, [categorySelected, categoryData, transactionsByMonthYear]);

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
    setActionToDo("new_expense_category");
    navigation.navigate("New_category_name_View", {
      action_to_do: "new_expense_category",
    });
  };
  const movingForwardToNewCategoryNameViewForUpdatingCategory = () => {
    setActionToDo("update_expense_category");
    set_update_category_name(categorySelected.category_name);
    setCategory_list_info_forUpdate({
      ...category_list_info_forUpdate,
      new_category_name: categorySelected.category_name,
      new_limit_amount: categorySelected.limit_amount,
      new_short_name: categorySelected.short_name,
      category_id: categorySelected.category_id,
      type: categorySelected.type,
    });
    navigation.navigate("New_category_name_View", {
      action_to_do: "update_expense_category",
    });
  };
  const movingBackToHome = () => {
    navigation.navigate("Home");
  };

  const movingForwardToTransferBottomSheet = async () => {
    setCategoryDataInfoForMoneyTransfer({
      ...categoryDataInfoForMoneyTransfer,
      receiver_category_id: categorySelected.category_id,
      receiver_category_name: categorySelected.category_name,
    });
    await arrayingCategoriesDataWithAmountsDifferentToZeroOrOverSpent();
    setModalActive(true);
  };
  return screenIsLoading ? (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
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
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  ) : categoryDataRequestStatus === 404 ? (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
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
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  ) : (
    <GestureHandlerRootView>
      <SafeArea background_color="#FFFFFF">
        <BottomSheetModalProvider>
          <GeneralFlexContainer color={theme.colors.bg.p_FFFFFF}>
            <BudgetsHeader
              navigation={navigation}
              color={theme.colors.bg.p_FFFFFF}
              //   color={"#FAA"}
              flexibility={0.15}
              direction={"row"}
              caption={
                month_year_toRender
                  ? month_year_toRender
                  : category_data_month_year
              }
              action1={() =>
                movingForwardToMonthsPadView(
                  navigation,
                  user_id,
                  set_month_year_toRender
                )
              }
              // action2={() => movingForwardToTransactions(navigation)}
              action2={() =>
                navigation.navigate("Transactions_by_category_View")
              }
              action3={() =>
                navigation.navigate("Delete_confirmation_view", {
                  comingFrom: "BudgetsView",
                  document_id: categorySelected.category_id,
                })
              }
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
                  categorySelected
                    ? categorySelected.amount_spent
                    : amount_spent
                }
                secondaryAmount={
                  categorySelected
                    ? categorySelected.amount_avail
                    : amount_avail
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
                      }).format(
                        firstCategoryDataExpenseCategories.limit_amount
                      )}
                </Text>
                {/* <Text text_variant="bold_text_12">{`Max: $420`}</Text> */}
              </ControlledContainer>
            </FlexibleContainer>

            <FlexibleContainer
              direction={"column"}
              color={theme.colors.bg.p_FFFFFF}
              // color={"lightblue"}
              flexibility={0.25}
              justify={"flex-start"}
              alignment={"flex-start"}
            >
              <Spacer size="large" position="top" />

              <ControlledContainer
                // color="brown"
                width={"100%"}
                height={"15%"}
                justify="space-between"
                alignment="center"
                direction="row"
              >
                <Spacer size="extraLarge" position="left">
                  <Text text_variant="bold_text_16">Categories</Text>
                </Spacer>
                {suspendedCategories.length > 0 && (
                  <Spacer size="large" position="right">
                    <RoundedOptionButton
                      color={theme.colors.ui.error_cancels}
                      width={"220px"}
                      action={() =>
                        navigation.navigate("Suspended_categories_view", {
                          comingFrom: "suspendedCategoriesButton",
                        })
                      }
                      height={"35px"}
                      borderRadius={25}
                      caption={"You have suspended categories"}
                      underlined={true}
                      type="red_option_button"
                    />
                  </Spacer>
                )}
              </ControlledContainer>
              {suspendedCategories.length > 0 && (
                <>
                  <Spacer size="large" position="bottom" />
                </>
              )}
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
                  renderItem={({ item }) => (
                    <CategoriesScrollComponent
                      item={item}
                      selectedItem={selectedItem}
                      action={selectingCategory}
                    />
                  )}
                  keyExtractor={(item, id) => {
                    return item.category_id;
                  }}
                />
              </ControlledContainer>
            </FlexibleContainer>
            <FlexibleContainer
              direction={"column"}
              // color={theme.colors.bg.s_142223C}
              color={theme.colors.bg.p_FFFFFF}
              flexibility={0.15}
              justify={"center"}
              alignment={"center"}
            >
              <ControlledContainer
                color={theme.colors.bg.p_FFFFFF}
                // color={"red"}
                width={"100%"}
                height={"100px"}
                justify="center"
                alignment="center"
                direction="row"
              >
                <ControlledContainer
                  // color={"lightblue"}
                  width={"40%"}
                  height={"60%"}
                  justify="center"
                  alignment="center"
                >
                  <CircularButtonOptionComponent
                    caption={""}
                    icon_name={"PlusIcon"}
                    action={() => movingForwardToNewCategoryNameView()}
                    isSelected={false}
                    icon_width={25}
                    // isSelected={}
                  />
                  <Text text_variant="neutral_bold_text_12">
                    Add new category
                  </Text>
                </ControlledContainer>
                {overSpentAmountInNegative !== 0 && (
                  <ControlledContainer
                    // color={"lightblue"}
                    width={"40%"}
                    height={"60%"}
                    justify="center"
                    alignment="center"
                  >
                    <CircularButtonOptionComponent
                      caption={""}
                      icon_name={"TransferIcon"}
                      // action={() => setModalActive(true)}
                      action={() => movingForwardToTransferBottomSheet()}
                      isSelected={false}
                      icon_width={25}
                      // isSelected={}
                    />
                    <Text text_variant="neutral_bold_text_12">
                      Transfer money
                    </Text>
                  </ControlledContainer>
                )}
              </ControlledContainer>
            </FlexibleContainer>
            <TransferMoneyExplanationBottomSheet
              navigation={navigation}
              movingBackToHome={movingBackToHome}
            />
          </GeneralFlexContainer>
        </BottomSheetModalProvider>
      </SafeArea>
    </GestureHandlerRootView>
  );
};
