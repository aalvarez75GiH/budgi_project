import React, { useState, useEffect, useContext } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native";

import { ExitHeaderComponent } from "../../global_components/organisms/headers/exit_header.component";
import { FlexibleContainer } from "../../global_components/containers/flexible_container";
import { theme } from "../../infrastructure/theme";
import { Text } from "../../infrastructure/typography/text.component";
import { Spacer } from "../../global_components/optimized.spacer.component";
import { TransactionTile } from "../../global_components/organisms/tiles/transaction_tile";
import {
  getTransactionsAndTotalAmountRequestOrderedByTimeStamp,
  getTransactionsAndTotalAmountRequest_ByUser_ByCat_ByMonthyear_OrderedByTimeStamp,
} from "../../infrastructure/services/transactions/transactions.services";
import { IsLoadingContainer } from "../../global_components/containers/isLoading_container";
import { CheckIconComponent } from "../../global_components/check_icon_component";
import { RoundedOptionButton } from "../../global_components/buttons/rounded_option_button";
import { GeneralFlexContainer } from "../../global_components/containers/general_flex_container";
import { ControlledContainer } from "../../global_components/containers/controlled_container";
import { CircularButtonOptionComponent } from "../../global_components/organisms/clickables options/circularButton_option.component";
import { CircularTextOptionComponent } from "../../global_components/organisms/clickables options/circular_text_option.component";
import { useSVGComponent } from "../../util/system_icons.hook";

import { AuthenticationContext } from "../../infrastructure/services/authentication/authentication.context";
import { CategoryListContext } from "../../infrastructure/services/category_list/category_list.context";
import { DateOperationsContext } from "../../infrastructure/services/date_operations/date_operations.context";
import { TransactionsContext } from "../../infrastructure/services/transactions/transactions.context";
import { EmptyInfoAlert } from "../../global_components/empty_info_alert";

export const MyTransactionsView = ({ navigation }) => {
  const [transactionsToRender, setTransactionsToRender] = useState([]);
  const [totalAmountToRender, setTotalAmountToRender] = useState(0);
  const [expenseCategoriesToRender, setExpenseCategoriesToRender] = useState(
    []
  );
  // const [isLoading, setIsLoading] = useState(false);
  const [isLoadingByCat, setIsLoadingByCat] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  //   ****** Consumption from Category List Context ************
  const { categoryList } = useContext(CategoryListContext);
  const expenseCategories = categoryList.expense_categories;
  //   console.log(
  //     "CATEGORY LIST AT HOW_MONTH:",
  //     JSON.stringify(categoryList, null, 2)
  //   );
  //   console.log("EXPENSE CATEGORIES AT HOW_MONTH:", expenseCategories);

  //   ****** Consumption from Date Operations Context ************
  const { month_year } = useContext(DateOperationsContext);

  //   ****** Consumption from Authentication Context ************
  const { user } = useContext(AuthenticationContext);
  const { user_id } = user;

  //   ****** Consumption from Transactions Context ************
  const { transactionsByMonthYear, total_amount, isLoading, setIsLoading } =
    useContext(TransactionsContext);

  useEffect(() => {
    settingUpTransactionsFromContext();
    setExpenseCategoriesToRender(expenseCategories);
  }, []);

  //   console.log(
  //     "TRANSACTIONS TO RENDER:",
  //     JSON.stringify(transactionsToRender, null, 2)
  //   );

  //   **** HERE WE GET THE TRANSACTIONS COMING FROM CONTEXT ****
  const settingUpTransactionsFromContext = () => {
    setIsPressed(true);
    setIsLoading(true);
    // setIsLoadingByCat(true);
    setSelectedItem(null);
    setTimeout(() => {
      setTransactionsToRender(transactionsByMonthYear);
      setTotalAmountToRender(total_amount);
      // setIsLoadingByCat(false);
      setIsLoading(false);
    }, 1000);
  };
  //   **** HERE WE GET THE TRANSACTIONS COMING FROM CONTEXT ****
  const settingUpTransactionsFromContextForAllOptionButton = () => {
    setIsPressed(true);
    setIsLoadingByCat(true);
    // setIsLoadingByCat(true);
    setSelectedItem(null);
    setTimeout(() => {
      setTransactionsToRender(transactionsByMonthYear);
      setTotalAmountToRender(total_amount);
      // setIsLoadingByCat(false);
      setIsLoadingByCat(false);
    }, 1000);
  };

  //**** HERE WE SET THE TRANSACTIONS BY CATEGORY AND MONTH YEAR BY DEMAND ****

  const settingUpTransactions_byCategory_by_MonthYear = async (
    user_id,
    category_id,
    month_year
  ) => {
    setIsPressed(false);
    setIsLoadingByCat(true);
    setTimeout(() => {
      try {
        let transactionsByCategoryMonthYear = [];
        transactionsByMonthYear.map((transaction) => {
          if (
            transaction.user_id === user_id &&
            transaction.category_id === category_id &&
            transaction.month_year === month_year
          ) {
            transactionsByCategoryMonthYear.push(transaction);
          }
        });

        // console.log(
        //   "TRANSACTIONS BY CATEGORY AND MONTH YEAR:",
        //   JSON.stringify(transactionsByCategoryMonthYear, null, 2)
        // );
        if (transactionsByCategoryMonthYear.length) {
          const transactions_amount = transactionsByCategoryMonthYear.reduce(
            (a, b) => ({
              amount: a.amount + b.amount,
            })
          );
          // console.log(
          //   "TRANSACTIONS TOTAL AMOUNT:",
          //   JSON.stringify(transactions_amount, null, 2)
          // );
          setTotalAmountToRender(transactions_amount.amount);
        } else {
          console.log("THERE ARE NO TRANSACTIONS FOR THAT CATEGORY...");
        }
        setIsLoadingByCat(false);
        setTransactionsToRender(transactionsByCategoryMonthYear);
      } catch (error) {
        console.log(error);
      }
    }, 200);
  };

  const movingForwardToDetailsView = (item) => {
    console.log("ITEM:", JSON.stringify(item, null, 2));
    const { amount, short_name, transaction_date, description } = item;
    console.log("AMOUNT:", amount);
    console.log("SHORT NAME:", short_name);
    console.log("EXPENSE DATE:", transaction_date);
    console.log("DESCRIPTION:", description);
    navigation.navigate("Transaction_details_view", {
      item,
    });
  };

  //   *************** it does render transactions
  const renderItem = ({ item }) => {
    return (
      <TransactionTile
        caption={item.category_name}
        navigation={navigation}
        icon_name={item.icon_name}
        active_icon={true}
        amount={item.amount}
        transaction_date={item.transaction_date}
        most_recent={item.most_recent}
        short_name={item.short_name}
        action={() => movingForwardToDetailsView(item)}
      />
    );
  };

  //**** HERE WE SET THE CATEGORY SELECTED AND GET TRANSACTIONS BY CATEGORY AND MONTH YEAR WITH TRANSACTION CONTEXT AS SOURCE ****
  const selectingCategoryAndGettingTransactions = (item) => {
    const { category_id } = item;
    selectedItem === category_id;
    setSelectedItem(item.category_id);
    settingUpTransactions_byCategory_by_MonthYear(
      user_id,
      category_id,
      month_year
      // index
    );
  };

  //**** HERE WE RENDER CATEGORIES AT CATEGORIES SELECTOR  ****
  const renderCategoryItem = ({ item, index }) => {
    // console.log("ITEM:", item);
    const { category_id, status } = item;
    const isSelected = selectedItem === category_id;
    return (
      <CircularButtonOptionComponent
        caption={item.short_name}
        icon_name={item.icon_name}
        action={() => selectingCategoryAndGettingTransactions(item)}
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
              {/* <Text text_variant="bold_text_20"> */}
              Total: ${totalAmountToRender.toFixed(2)}
            </Text>
          </Spacer>
          <Spacer position="top" size="medium" />
          <ControlledContainer width={"100%"} height={"50%"} direction={"row"}>
            <Spacer position="left" size="small">
              <Spacer position="left" size="large">
                <CheckIconComponent icon_width={20} icon_height={20} />
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
              onPress={() => null}
              width={"140px"}
              height={"55px"}
              borderRadius={25}
              caption={month_year}
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
          action={settingUpTransactionsFromContextForAllOptionButton}
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
            renderItem={renderCategoryItem}
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
              caption="Sorry, No transactions for this category yet :("
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
              renderItem={renderItem}
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
