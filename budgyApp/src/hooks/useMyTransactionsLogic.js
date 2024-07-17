import { useState, useContext } from "react";
import { TransactionTile } from "../global_components/organisms/tiles/transaction_tile";
import { CircularButtonOptionComponent } from "../global_components/organisms/clickables options/circularButton_option.component";

import { DateOperationsContext } from "../infrastructure/services/date_operations/date_operations.context";
import { AuthenticationContext } from "../infrastructure/services/authentication/authentication.context";
import { CategoryListContext } from "../infrastructure/services/category_list/category_list.context";
import { TransactionsContext } from "../infrastructure/services/transactions/transactions.context";

export const useMyTransactionsLogic = () => {
  //   ****** DATA FROM DATE OPERATIONS CONTEXT ************
  const { month_year, setMonthSelected, month_name } = useContext(
    DateOperationsContext
  );

  //   ****** DATA FROM AUTHENTICATION CONTEXT ************
  const { user } = useContext(AuthenticationContext);
  const { user_id } = user;

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

  const [isPressed, setIsPressed] = useState(false);
  const [isLoadingByCat, setIsLoadingByCat] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [month_year_toRender, set_month_year_toRender] = useState(month_year);
  const [totalAmountToRender, setTotalAmountToRender] = useState(0);
  const [transactionsToRender, setTransactionsToRender] = useState([]);
  const [expenseCategoriesToRender, setExpenseCategoriesToRender] = useState(
    []
  );

  const settingUpTransactions_byCategory_by_MonthYear = async (
    user_id,
    category_id,
    month_year_toRender,
    transactionsByMonthYear
  ) => {
    // console.log("TRANSACTIONS BY MONTH YEAR:", transactionsByMonthYear);
    console.log("MONTH YEAR TO RENDER AT FUNCTION VIEW:", month_year_toRender);
    console.log("USER_ID AT FUNCTION VIEW:", user_id);
    console.log("CATEGORY SELECTED AT FUNCTION VIEW:", category_id);

    // Set the button to not pressed and start loading.
    setIsPressed(false);
    setIsLoadingByCat(true);

    // Delay the execution of the following code by 200ms.
    setTimeout(() => {
      try {
        // Initialize an empty array to store transactions that match the criteria.
        let transactionsByCategoryMonthYear = [];

        // Loop through all transactions.
        transactionsByMonthYear.map((transaction) => {
          // If the transaction matches the user, category, and month/year, add it to the array.
          if (
            transaction.user_id === user_id &&
            transaction.category_id === category_id &&
            transaction.month_year === month_year_toRender
          ) {
            transactionsByCategoryMonthYear.push(transaction);
          }
        });

        // console.log(
        //   "TRANSACTIONS BY CATEGORY MONTH YEAR:",
        //   JSON.stringify(transactionsByCategoryMonthYear, null, 2)
        // );
        // If there are any transactions that match the criteria...
        if (transactionsByCategoryMonthYear.length) {
          // ...calculate the total amount of these transactions.
          const transactions_amount = transactionsByCategoryMonthYear.reduce(
            (a, b) => ({
              amount: a.amount + b.amount,
            })
          );

          // Set the total amount to be rendered.
          setTotalAmountToRender(transactions_amount.amount);
        } else {
          // If there are no transactions that match the criteria, log a message.
          console.log("THERE ARE NO TRANSACTIONS FOR THAT CATEGORY...");
        }

        // Stop loading and set the transactions to be rendered.
        // setIsLoadingByCat(false);
        setTransactionsToRender(transactionsByCategoryMonthYear);
      } catch (error) {
        // If there's an error, log it.
        console.log(error);
      } finally {
        // Stop loading.
        setIsLoadingByCat(false);
      }
    }, 200);
  };

  const settingUpTransactions_byCategory_by_MonthYear_onDemand = async (
    user_id,
    category_id,
    month_year_toRender,
    transactionsByMonthYear
  ) => {
    // console.log("TRANSACTIONS BY MONTH YEAR:", transactionsByMonthYear);
    console.log("MONTH YEAR TO RENDER AT FUNCTION VIEW:", month_year_toRender);
    console.log("USER_ID AT FUNCTION VIEW:", user_id);
    console.log("CATEGORY SELECTED AT FUNCTION VIEW:", category_id);

    // Set the button to not pressed and start loading.
    setIsPressed(false);
    setIsLoadingByCat(true);

    try {
      let transactionsByCategoryMonthYear = [];

      transactionsByMonthYear.map((transaction) => {
        if (
          transaction.user_id === user_id &&
          transaction.category_id === category_id &&
          transaction.month_year === month_year_toRender
        ) {
          transactionsByCategoryMonthYear.push(transaction);
        }
      });

      if (transactionsByCategoryMonthYear.length) {
        const transactions_amount = transactionsByCategoryMonthYear.reduce(
          (a, b) => ({
            amount: a.amount + b.amount,
          })
        );

        setTotalAmountToRender(transactions_amount.amount);
        const transactions_total_amount_and_transactions_by_category = {
          total_amount_by_category: transactions_amount.amount,
          transactions_by_category: transactionsByCategoryMonthYear,
        };
        return transactions_total_amount_and_transactions_by_category;
      }
      if (transactionsByCategoryMonthYear.length === 0) {
        const transactions_total_amount_and_transactions_by_category = {
          total_amount_by_category: 0,
          transactions_by_category: [],
        };
        return transactions_total_amount_and_transactions_by_category;
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingByCat(false);
    }
  };

  // console.log(
  //   "TRANSACTIONS TO RENDER  AT USE MY TRANSACTIONS HOOK:",
  //   JSON.stringify(transactionsToRender, null, 2)
  // );
  // console.log(
  //   "TOTAL AMOUNT TO RENDER AT USE MY TRANSACTIONS HOOK:",
  //   totalAmountToRender
  // );
  //   **** HERE WE GET THE TRANSACTIONS COMING FROM CONTEXT ****
  const settingUpTransactionsFromContext = () => {
    setIsPressed(true);
    setIsLoading(true);
    setSelectedItem(null);
    setTimeout(() => {
      setTransactionsToRender(transactionsByMonthYear);
      setTotalAmountToRender(total_amount);
      setIsLoading(false);
    }, 1000);
  };

  //   ******** THIS FUNCTION TAKE THE WHOLE TRANSACTIONS AND SET IT UP FOR RENDERING ******** //
  const settingUpTransactionsFromContextForAllOptionButton = (
    transactionsByMonthYear,
    total_amount,
    setTransactionsToRender,
    setTotalAmountToRender,
    setIsLoadingByCat
  ) => {
    setIsPressed(true);
    setIsLoadingByCat(true);
    setSelectedItem(null);
    setTimeout(() => {
      setTransactionsToRender(transactionsByMonthYear);
      setTotalAmountToRender(total_amount);
      setIsLoadingByCat(false);
    }, 1000);
  };

  const selectingCategoryAndGettingTransactions = (
    item,
    transactionsByMonthYear
  ) => {
    const { category_id } = item;
    selectedItem === category_id;
    setSelectedItem(item.category_id);
    settingUpTransactions_byCategory_by_MonthYear(
      user_id,
      category_id,
      month_year_toRender,
      transactionsByMonthYear
    );
  };

  // ********* MOVING FORWARD LOGIC ********* //
  const movingForwardToDetailsView = (
    navigation,
    item,
    setTransactionInfoForUpdate
  ) => {
    setTransactionInfoForUpdate(item);
    navigation.navigate("Transaction_details_view");
  };

  const movingForwardToMonthsPadView = (
    navigation,
    user_id,
    set_month_year_toRender
  ) => {
    navigation.navigate("Months_Pad_View", {
      user_id: user_id,
      set_month_year_toRender: set_month_year_toRender,
      comingFrom: "MyTransactionsView",
    });
  };

  // ********* RENDER LOGIC ********* //

  //   ********* RENDERING TRANSACTIONS ********* //
  const renderItem =
    (navigation, setTransactionInfoForUpdate) =>
    ({ item }) => {
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
          action={() =>
            movingForwardToDetailsView(
              navigation,
              item,
              setTransactionInfoForUpdate
            )
          }
        />
      );
    };

  //**** HERE WE RENDER CATEGORIES AT CATEGORIES BELT SELECTOR  ****
  const renderCategoryItem =
    (transactionsByMonthYear) =>
    ({ item }) => {
      // console.log("ITEM:", item);
      const { category_id } = item;
      const isSelected = selectedItem === category_id;
      return (
        <CircularButtonOptionComponent
          caption={item.short_name}
          icon_name={item.icon_name}
          action={() =>
            selectingCategoryAndGettingTransactions(
              item,
              transactionsByMonthYear
            )
          }
          isSelected={isSelected}
          icon_width={25}
        />
      );
    };

  return {
    movingForwardToDetailsView,
    movingForwardToMonthsPadView,
    settingUpTransactionsFromContextForAllOptionButton,
    settingUpTransactionsFromContext,
    renderItem,
    renderCategoryItem,
    selectingCategoryAndGettingTransactions,
    selectedItem,
    isPressed,
    setIsPressed,
    month_year_toRender,
    set_month_year_toRender,
    month_year,
    setMonthSelected,
    month_name,
    user_id,
    transactionsToRender,
    setTransactionsToRender,
    totalAmountToRender,
    setTotalAmountToRender,
    expenseCategoriesToRender,
    setExpenseCategoriesToRender,
    isLoadingByCat,
    setIsLoadingByCat,
    transactionsByMonthYear,
    total_amount,
    isLoading,
    setIsLoading,
    setTransactionInfoForUpdate,
    gettingTransactions_byUserID_MonthYear_onDemand,
    expenseCategories,
    settingUpTransactions_byCategory_by_MonthYear,
    settingUpTransactions_byCategory_by_MonthYear_onDemand,
  };
};
