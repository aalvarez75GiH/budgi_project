import { useState, useContext, useEffect } from "react";
import { TransactionTile } from "../global_components/organisms/tiles/transaction_tile";
import { CircularButtonOptionComponent } from "../global_components/organisms/clickables options/circularButton_option.component";

import { DateOperationsContext } from "../infrastructure/services/date_operations/date_operations.context";
import { AuthenticationContext } from "../infrastructure/services/authentication/authentication.context";
import { CategoryListContext } from "../infrastructure/services/category_list/category_list.context";
import { TransactionsContext } from "../infrastructure/services/transactions/transactions.context";
import { set } from "date-fns";

export const useMyTransactionsLogic = () => {
  //   ****** DATA FROM DATE OPERATIONS CONTEXT ************
  const {
    month_year,
    setMonthSelected,
    month_name,
    resetMonth_year_toRender,
    set_month_year_toRender,
    month_year_toRender,
  } = useContext(DateOperationsContext);

  //   ****** DATA FROM AUTHENTICATION CONTEXT ************
  const { user } = useContext(AuthenticationContext);
  const { user_id } = user;

  //   ****** DATA FROM CATEGORY LIST CONTEXT ************
  const { categoryList, sortingExpenseCategories } =
    useContext(CategoryListContext);
  const expenseCategories = categoryList.expense_categories;

  //   ****** DATA FROM TRANSACTIONS CONTEXT ************
  const {
    transactionsByMonthYear,
    total_amount,
    isLoading,
    setIsLoading,
    setTransactionInfoForUpdate,
    gettingTransactions_byUserID_MonthYear_onDemand,
    setTransactionsToRenderForBudgets,
    setTotalAmountToRenderForBudgets,
  } = useContext(TransactionsContext);

  const [isPressed, setIsPressed] = useState(false);
  const [isLoadingByCat, setIsLoadingByCat] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [totalAmountToRender, setTotalAmountToRender] = useState(0);
  const [transactionsToRender, setTransactionsToRender] = useState([]);
  const [expenseCategoriesToRender, setExpenseCategoriesToRender] = useState(
    []
  );
  // console.log(
  //   "CATEGORY_LIST AT MY TRANSACTIONS LOGIC:",
  //   JSON.stringify(categoryList, null, 2)
  // );
  // Step 3 & 4: Use useEffect to detect when state variables revert to their initial state
  useEffect(() => {
    if (transactionsToRender === transactionsByMonthYear) {
      // Step 5: Perform desired action
      console.log(
        "Both transactionsToRender and totalAmountToRender are set to their initial state."
      );
    }
  }, [transactionsToRender, totalAmountToRender]); // Dependencies array, effect runs on changes to these variables

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
          setTotalAmountToRender(0);
          setTransactionsToRender([]);
          // If there are no transactions that match the criteria, log a message.
          console.log("THERE ARE NO TRANSACTIONS FOR THAT CATEGORY...");
          return;
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
    console.log("TRANSACTIONS BY MONTH YEAR:", transactionsByMonthYear);
    console.log(
      "MONTH YEAR TO RENDER AT MY TRANSACTIONS LOGIC VIEW:",
      month_year_toRender
    );
    console.log("USER_ID AT MY TRANSACTIONS LOGIC:", user_id);
    console.log("CATEGORY SELECTED AT MY TRANSACTIONS LOGIC:", category_id);

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

        // If there are any transactions that match the criteria...
        if (transactionsByCategoryMonthYear.length) {
          // ...calculate the total amount of these transactions.
          const transactions_amount = transactionsByCategoryMonthYear.reduce(
            (a, b) => ({
              amount: a.amount + b.amount,
            })
          );

          // Set the total amount to be rendered.
          setTotalAmountToRenderForBudgets(transactions_amount.amount);
        } else {
          setTotalAmountToRenderForBudgets(0);
          setTransactionsToRenderForBudgets([]);
          // If there are no transactions that match the criteria, log a message.
          console.log("THERE ARE NO TRANSACTIONS FOR THAT CATEGORY...");
          return;
        }

        // Stop loading and set the transactions to be rendered.
        setTransactionsToRenderForBudgets(transactionsByCategoryMonthYear);
      } catch (error) {
        // If there's an error, log it.
        console.log(error);
      } finally {
        // Stop loading.
        setIsLoadingByCat(false);
      }
    }, 200);
  };

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
  //   ******** THIS FUNCTION IT DOES EXECUTES WHEN USER CLICK ALL TRANSACTIONS BUTTON ******** //
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

  const selectingCategoryAndPackagingRespectiveTransactions = (
    item,
    transactionsByMonthYear
  ) => {
    const { category_id } = item;
    selectedItem === category_id;
    setSelectedItem(category_id);
    settingUpTransactions_byCategory_by_MonthYear(
      user_id,
      category_id,
      month_year_toRender,
      transactionsByMonthYear
    );
  };

  const packagingAndFilteringTransactionsAndAmountByCategoryBudget = (
    category_id,
    transactionsByMonthYear
  ) => {
    // selectedItem === category_id;
    // setSelectedItem(category_id);
    settingUpTransactions_byCategory_by_MonthYear_onDemand(
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
    setTransactionInfoForUpdate,
    comingFrom
  ) => {
    // ****************************************
    const index = categoryList.expense_categories.findIndex(
      (category) => category.category_id === item.category_id
    );
    const node = categoryList.expense_categories[index];
    console.log("INDEX:", index);
    console.log("STATUS:", node.status);
    if (node.status === "suspended") {
      setTransactionInfoForUpdate({
        ...item,
        category_status: "suspended",
      });
      // console.log("CATEGORY SUSPENDED");
      navigation.navigate("Transaction_details_view", {
        comingFrom: comingFrom,
      });
      // return;
    }
    if (node.status === "active") {
      setTransactionInfoForUpdate({
        ...item,
        category_status: "active",
      });
      navigation.navigate("Transaction_details_view", {
        comingFrom: comingFrom,
      });
    }
    // ****************************************
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
    (navigation, setTransactionInfoForUpdate, comingFrom) =>
    ({ item }) => {
      return (
        <TransactionTile
          icon_name={item.icon_name}
          action={() =>
            movingForwardToDetailsView(
              navigation,
              item,
              setTransactionInfoForUpdate,
              comingFrom
            )
          }
          amount={item.amount}
          transaction_date={item.transaction_date}
          caption={item.category_name}
          most_recent={item.most_recent}
          short_name={item.short_name}
          active_icon={true}
        />
      );
    };

  return {
    movingForwardToDetailsView,
    movingForwardToMonthsPadView,
    settingUpTransactionsFromContextForAllOptionButton,
    settingUpTransactionsFromContext,
    renderItem,
    isPressed,
    setIsPressed,
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
    packagingAndFilteringTransactionsAndAmountByCategoryBudget,
    resetMonth_year_toRender,
    set_month_year_toRender,
    month_year_toRender,
    selectedItem,
    selectingCategoryAndPackagingRespectiveTransactions,
    sortingExpenseCategories,
  };
};
