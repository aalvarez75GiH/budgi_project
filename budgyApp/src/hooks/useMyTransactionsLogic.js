import { useState } from "react";
import { TransactionTile } from "../global_components/organisms/tiles/transaction_tile";
import { CircularButtonOptionComponent } from "../global_components/organisms/clickables options/circularButton_option.component";

export const useMyTransactionsLogic = () => {
  //   const [isPressed, setIsPressed] = useState(false);
  //   const [isLoadingByCat, setIsLoadingByCat] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  //   const [totalAmountToRender, setTotalAmountToRender] = useState(0);
  //   const [transactionsToRender, setTransactionsToRender] = useState([]);

  const settingUpTransactions_byCategory_by_MonthYear = async (
    user_id,
    category_id,
    month_year_toRender,
    transactionsByMonthYear,
    setIsPressed,
    setTotalAmountToRender,
    setTransactionsToRender,
    setIsLoadingByCat
  ) => {
    console.log("USER ID:", user_id);
    console.log("CATEGORY ID:", category_id);
    console.log("MONTH YEAR TO RENDER:", month_year_toRender);
    // console.log("TRANSACTIONS BY MONTH YEAR:", transactionsByMonthYear);

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

        console.log(
          "TRANSACTIONS BY CATEGORY MONTH YEAR:",
          JSON.stringify(transactionsByCategoryMonthYear, null, 2)
        );
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

  //   **** HERE WE GET THE TRANSACTIONS COMING FROM CONTEXT ****
  const settingUpTransactionsFromContext = (
    transactionsByMonthYear,
    total_amount,
    setIsPressed,
    setIsLoading,
    // setSelectedItem,
    setTransactionsToRender,
    setTotalAmountToRender
  ) => {
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
    setIsPressed,
    // setSelectedItem,
    setTransactionsToRender,
    setTotalAmountToRender
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
    // selectedItem,
    // setSelectedItem,
    user_id,
    month_year_toRender,
    transactionsByMonthYear,
    setIsPressed,
    setTotalAmountToRender,
    setTransactionsToRender,
    setIsLoadingByCat
  ) => {
    console.log("ITEM:", item);
    const { category_id } = item;
    selectedItem === category_id;
    setSelectedItem(item.category_id);
    settingUpTransactions_byCategory_by_MonthYear(
      user_id,
      category_id,
      month_year_toRender,
      transactionsByMonthYear,
      setIsPressed,
      setTotalAmountToRender,
      setTransactionsToRender,
      setIsLoadingByCat
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
    (
      //   selectedItem,
      //   setSelectedItem,
      user_id,
      month_year_toRender,
      transactionsByMonthYear,
      setIsPressed,
      setTotalAmountToRender,
      setTransactionsToRender,
      setIsLoadingByCat
    ) =>
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
              //   selectedItem,
              //   setSelectedItem,
              user_id,
              month_year_toRender,
              transactionsByMonthYear,
              setIsPressed,
              setIsLoadingByCat,
              setTotalAmountToRender,
              setTransactionsToRender
            )
          }
          isSelected={isSelected}
        />
      );
    };

  return {
    movingForwardToDetailsView,
    movingForwardToMonthsPadView,
    settingUpTransactions_byCategory_by_MonthYear,
    settingUpTransactionsFromContextForAllOptionButton,
    settingUpTransactionsFromContext,
    renderItem,
    renderCategoryItem,
    selectingCategoryAndGettingTransactions,
    // isLoadingByCat,
    selectedItem,
  };
};
