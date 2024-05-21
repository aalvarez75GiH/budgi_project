import React, { useState, useEffect, useContext } from "react";
import { FlatList } from "react-native";

import { ExitHeaderComponent } from "../../global_components/organisms/headers/exit_header.component";
import { FlexibleContainer } from "../../global_components/containers/flexible_container";
import { theme } from "../../infrastructure/theme";
import { Text } from "../../infrastructure/typography/text.component";
import { Spacer } from "../../global_components/optimized.spacer.component";
// import { TransactionTile } from "../../global_components/organisms/tiles/transaction_tile";
import { CircularButtonOptionComponent } from "../../global_components/organisms/clickables options/circularButton_option.component";

import { IsLoadingContainer } from "../../global_components/containers/isLoading_container";
import { CheckIconComponent } from "../../global_components/check_icon_component";
import { RoundedOptionButton } from "../../global_components/buttons/rounded_option_button";
import { GeneralFlexContainer } from "../../global_components/containers/general_flex_container";
import { ControlledContainer } from "../../global_components/containers/controlled_container";
import { CircularTextOptionComponent } from "../../global_components/organisms/clickables options/circular_text_option.component";
import { useMyTransactionsLogic } from "../../hooks/useMyTransactionsLogic";

import { AuthenticationContext } from "../../infrastructure/services/authentication/authentication.context";
import { CategoryListContext } from "../../infrastructure/services/category_list/category_list.context";
import { DateOperationsContext } from "../../infrastructure/services/date_operations/date_operations.context";
import { TransactionsContext } from "../../infrastructure/services/transactions/transactions.context";
import { EmptyInfoAlert } from "../../global_components/empty_info_alert";

export const MyTransactionsView = ({ navigation }) => {
  // ************** LOGIC FROM HOOK **************
  const {
    movingForwardToMonthsPadView,
    settingUpTransactionsFromContextForAllOptionButton,
    settingUpTransactionsFromContext,
    renderItem,
    selectingCategoryAndGettingTransactions,
    selectedItem,
    // renderCategoryItem,
    // isLoadingByCat,
  } = useMyTransactionsLogic();

  //   ****** DATA FROM DATES OPERATIONS CONTEXT ************
  const { month_year, setMonthSelected, month_name } = useContext(
    DateOperationsContext
  );

  //   ****** DATA FROM DATES AUTHENTICATION CONTEXT ************
  const { user } = useContext(AuthenticationContext);
  const { user_id } = user;

  const [transactionsToRender, setTransactionsToRender] = useState([]);
  const [totalAmountToRender, setTotalAmountToRender] = useState(0);
  const [expenseCategoriesToRender, setExpenseCategoriesToRender] = useState(
    []
  );
  const [isLoadingByCat, setIsLoadingByCat] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [month_year_toRender, set_month_year_toRender] = useState(month_year);

  //   ****** DATA FROM CATEGORY LIST CONTEXT ************
  const { categoryList } = useContext(CategoryListContext);
  const expenseCategories = categoryList.expense_categories;

  //   ****** DATA FROM TRANSACTIONS CONTEXT ************
  const {
    transactionsByMonthYear,
    total_amount,
    isLoading,
    setIsLoading,
    setTransactionInfoForUpdate,
    gettingTransactions_byUserID_MonthYear_onDemand,
  } = useContext(TransactionsContext);

  useEffect(() => {
    settingUpTransactionsFromContext(
      transactionsByMonthYear,
      total_amount,
      setIsPressed,
      setIsLoading,
      // setSelectedItem,
      setTransactionsToRender,
      setTotalAmountToRender
    );
    setExpenseCategoriesToRender(expenseCategories);

    return async () => {
      setMonthSelected(month_name);
      await gettingTransactions_byUserID_MonthYear_onDemand(
        user_id,
        month_year
      );
    };
  }, []);
  console.log("MONTH YEAR TO RENDER:", month_year_toRender);
  console.log("MONTH YEAR :", month_year);

  useEffect(() => {
    settingUpTransactionsFromContext(
      transactionsByMonthYear,
      total_amount,
      setIsPressed,
      setIsLoading,
      // setSelectedItem,
      setTransactionsToRender,
      setTotalAmountToRender
    );
  }, [transactionsByMonthYear, total_amount]);

  const renderCategoryItem =
    (
      user_id,
      month_year_toRender,
      transactionsByMonthYear,
      setIsPressed,
      setTotalAmountToRender,
      setTransactionsToRender,
      setIsLoadingByCat
    ) =>
    ({ item, index }) => {
      // console.log("ITEM:", item);
      const { category_id, status } = item;
      const isSelected = selectedItem === category_id;
      return (
        <CircularButtonOptionComponent
          caption={item.short_name}
          icon_name={item.icon_name}
          action={() =>
            selectingCategoryAndGettingTransactions(
              item,
              user_id,
              month_year_toRender,
              transactionsByMonthYear,
              setIsPressed,
              setTotalAmountToRender,
              setTransactionsToRender,
              setIsLoadingByCat
            )
          }
          isSelected={isSelected}
        />
      );
    };

  return isLoading ? (
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
        caption="Loading transactions..."
      />
    </FlexibleContainer>
  ) : (
    <GeneralFlexContainer>
      <ExitHeaderComponent
        navigation={navigation}
        direction={"column"}
        color={theme.colors.bg.p_FFFFFF}
        // color={"#FAA"}
        flexibility={0.14}
      />

      {/*********  Rendering Total Amount and change month option button  **************/}
      <FlexibleContainer
        color={theme.colors.bg.p_FFFFFF}
        // color={"#FAD"}
        direction="row"
        flexibility={0.15}
        justify={"flex-start"}
        isBordered={false}
        alignment={"center"}
      >
        <ControlledContainer width={"60%"} height={"35%"} direction={"column"}>
          <Spacer position="left" size="large">
            <Text text_variant="bold_text_20">
              {/* Total: ${totalAmountToRender.toFixed(2)} */}
              Total:{" "}
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(totalAmountToRender)}
            </Text>
          </Spacer>
          {/* <Spacer position="top" size="medium" /> */}
          <ControlledContainer
            width={"90%"}
            height={"70%"}
            direction={"row"}
            // color="brown"
            justify={"center"}
            alignment={"center"}
          >
            <Spacer position="left" size="small">
              <Spacer position="left" size="medium">
                <CheckIconComponent icon_width={15} icon_height={15} />
              </Spacer>
            </Spacer>
            <Text text_variant="bold_text_12">Most updated transaction</Text>
          </ControlledContainer>
        </ControlledContainer>
        <Spacer position="left" size="medium">
          <ControlledContainer
            width={"35%"}
            height={"45%"}
            justify={"flex-start"}
          >
            <RoundedOptionButton
              color={"#F4F4F4"}
              action={() =>
                movingForwardToMonthsPadView(
                  navigation,
                  user_id,
                  set_month_year_toRender
                )
              }
              width={"140px"}
              height={"55px"}
              borderRadius={25}
              caption={month_year_toRender ? month_year_toRender : month_year}
              underlined={true}
            />
          </ControlledContainer>
        </Spacer>
      </FlexibleContainer>
      <Spacer position="top" size="small" />
      <Spacer position="top" size="small" />

      {/************* Rendering FlatList with categories option ***********/}
      <FlexibleContainer
        color={theme.colors.bg.p_FFFFFF}
        // color={"lightblue"}
        direction="row"
        flexibility={0.16}
        justify={"flex-start"}
        isBordered={false}
        alignment={"center"}
      >
        <CircularTextOptionComponent
          caption="All"
          isPressed={isPressed}
          action={() =>
            settingUpTransactionsFromContextForAllOptionButton(
              transactionsByMonthYear,
              total_amount,
              setIsPressed,
              // setSelectedItem,
              setTransactionsToRender,
              setTotalAmountToRender,
              setIsLoadingByCat
            )
          }
        />
        <ControlledContainer
          width={"300px"}
          height={"100px"}
          justify="center"
          alignment="center"
        >
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            // showsVerticalScrollIndicator={true}
            data={expenseCategoriesToRender}
            renderItem={renderCategoryItem(
              user_id,
              month_year_toRender,
              transactionsByMonthYear,
              setIsPressed,
              setTotalAmountToRender,
              setTransactionsToRender,
              setIsLoadingByCat
            )}
            keyExtractor={(item, id) => {
              return item.category_id;
            }}
          />
        </ControlledContainer>
      </FlexibleContainer>

      {/************* Rendering FlatList with transactions  ***********/}
      {isLoadingByCat ? (
        <>
          <Spacer position="top" size="small" />
          <Spacer position="top" size="small" />
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
              caption="Loading transactions..."
            />
          </FlexibleContainer>
        </>
      ) : !transactionsToRender.length ? (
        <>
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
            />
          </FlexibleContainer>
        </>
      ) : (
        <>
          <Spacer position="top" size="small" />
          <Spacer position="top" size="small" />
          <FlexibleContainer
            color={theme.colors.bg.e_F4F4F4}
            // color={"lightblue"}
            direction="column"
            flexibility={1}
            justify={"center"}
            isBordered={false}
          >
            <FlatList
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              data={transactionsToRender}
              renderItem={renderItem(navigation, setTransactionInfoForUpdate)}
              keyExtractor={(item, id) => {
                return item.transaction_id;
              }}
              scrollSpeed={0.5}
            />
          </FlexibleContainer>
        </>
      )}
    </GeneralFlexContainer>
  );
};
