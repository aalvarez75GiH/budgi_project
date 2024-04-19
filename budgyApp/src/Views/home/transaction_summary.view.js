import React, { useState, useContext, useEffect } from "react";

import { SafeArea } from "../../global_components/safe-area.component";
import { RegularCTAButton } from "../../global_components/buttons/cta_btn";
import { BackHeaderComponent } from "../../global_components/organisms/headers/back_header.component";
import { OptionsButtonsComponent } from "../../global_components/buttons/optionsButtons.component";
import { ConfirmationInfoComponent } from "../../global_components/organisms/confirmations/transaction_confirmation.component";
import { LinkButton } from "../../global_components/buttons/link_button";
import { registerTransactionRequest } from "../../infrastructure/services/transactions/transactions.services";
import { Spacer } from "../../global_components/optimized.spacer.component";
import { theme } from "../../infrastructure/theme";
import { FlexibleContainer } from "../../global_components/containers/flexible_container";
import { GeneralFlexContainer } from "../../global_components/containers/general_flex_container";
import { getTransactionsAndTotalAmountRequestOrderedByTimeStamp } from "../../infrastructure/services/transactions/transactions.services";

import { AuthenticationContext } from "../../infrastructure/services/authentication/authentication.context";
import { TransactionsContext } from "../../infrastructure/services/transactions/transactions.context";
import { DateOperationsContext } from "../../infrastructure/services/date_operations/date_operations.context";

export const TransactionSummaryView = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [button1Pressed, setButton1Pressed] = useState(true);
  const [button2Pressed, setButton2Pressed] = useState(false);

  //   ***** Transactions context consumption
  const {
    isConfirmed,
    setIsConfirmed,
    cleaningState,
    transactionInfoForRequest,
    setTransactionInfoForRequest,
    fixingANumberToTwoDecimalsAndString,
    setTransactionsByMonthYear,
    setTransactionsTotalAmount,
  } = useContext(TransactionsContext);

  const { amount } = transactionInfoForRequest;
  const { packingExpenseDateForDifferentDay, system_date, month_year } =
    useContext(DateOperationsContext);

  //   ***** Authentication context consumption
  const { user, db } = useContext(AuthenticationContext);
  const { user_id } = user;

  // ****** Here we are parsing amount to integer for request to transaction end point
  const {
    transaction_date,
    short_name,
    makingATransactionsAndTotalAmountRequestOrderedByTimeStampAfterAnotherTransaction,
  } = transactionInfoForRequest;

  // console.log(
  //   "TRANSACTION INFO AT SUMMARY:",
  //   JSON.stringify(transactionInfoForRequest, null, 2)
  // );
  const stringedAmount = fixingANumberToTwoDecimalsAndString(amount);

  // const listenForNewChangesAtDB = () => {
  //   let newData;
  //   const collectionRef = db.collection("transactions");

  //   collectionRef.onSnapshot((snapshot) => {
  //     snapshot.docChanges().forEach(async (change) => {
  //       if (change.type === "added" && change.oldIndex === -1) {
  //         newData = change.doc.data();
  //         console.log("NEW TRANSACTION IS:", newData);
  //         if (newData) {
  //           try {
  //             const transactionsAndAmount =
  //               await getTransactionsAndTotalAmountRequestOrderedByTimeStamp(
  //                 user_id,
  //                 month_year
  //               );

  //             const { transactions, total_amount } = transactionsAndAmount;

  //             setTransactionsByMonthYear(transactions);
  //             setTransactionsTotalAmount(total_amount);
  //           } catch (error) {
  //             console.log(error);
  //           }
  //         }
  //       }
  //     });
  //     // setNewTransaction(newData);
  //   });
  // };
  // const listenForNewChangesAtDB = () => {
  //   const currentTime = new Date();

  //   let newData;
  //   const collectionRef = db.collection("transactions");

  //   collectionRef
  //     .where("timeStamp", ">", currentTime)
  //     .onSnapshot((snapshot) => {
  //       snapshot.docChanges().forEach(async (change) => {
  //         if (change.type === "added") {
  //           newData = change.doc.data();
  //           console.log("NEW TRANSACTION IS:", newData);
  //           // if (newData) {
  //           //   try {
  //           //     const transactionsAndAmount =
  //           //       await getTransactionsAndTotalAmountRequestOrderedByTimeStamp(
  //           //         user_id,
  //           //         month_year
  //           //       );

  //           //     const { transactions, total_amount } = transactionsAndAmount;

  //           //     setTransactionsByMonthYear(transactions);
  //           //     setTransactionsTotalAmount(total_amount);
  //           //   } catch (error) {
  //           //     console.log(error);
  //           //   }
  //           // }
  //         }
  //       });
  //     });
  // };
  const listenForNewChangesAtDB = () => {
    // let newData;
    const collectionRef = db.collection("transactions");
    collectionRef.onSnapshot((snapshot) => {
      snapshot.docChanges().forEach(async (change) => {
        if (change.type === "added") {
          const newData = change.doc.data();
          console.log("NEW TRANSACTION IS:", newData);
          if (newData) {
            try {
              const transactionsAndAmount =
                await getTransactionsAndTotalAmountRequestOrderedByTimeStamp(
                  user_id,
                  month_year
                );

              const { transactions, total_amount } = transactionsAndAmount;

              setTransactionsByMonthYear(transactions);
              setTransactionsTotalAmount(total_amount);
            } catch (error) {
              console.log(error);
            }
          }
        }
      });
    });
  };

  const registeringTransaction = async () => {
    setIsLoading(true);
    const transactionInfoForRequestWithTS = {
      ...transactionInfoForRequest,
      timeStamp: Date.now(),
    };
    console.log(
      "TRANSACTION INFO FOR REQ WITH TS:",
      JSON.stringify(transactionInfoForRequestWithTS, null, 2)
    );
    setTimeout(async () => {
      try {
        const response = await registerTransactionRequest(
          transactionInfoForRequestWithTS
        );

        response ? setIsLoading(false) : setIsLoading(true);
        response ? setIsConfirmed(true) : setIsConfirmed(false);
        response ? listenForNewChangesAtDB() : null;

        navigation.navigate("Transaction_confirmation");
      } catch (error) {
        console.log("THERE WAS AN ERROR:", error);
      }
    }, 3000);
  };

  // const registeringTransaction = async () => {
  //   setIsLoading(true);
  //   const transactionInfoForRequestWithTS = {
  //     ...transactionInfoForRequest,
  //     timeStamp: Date.now(),
  //   };
  //   console.log(
  //     "TRANSACTION INFO FOR REQ WITH TS:",
  //     JSON.stringify(transactionInfoForRequestWithTS, null, 2)
  //   );
  //   setTimeout(async () => {
  //     try {
  //       const response = await registerTransactionRequest(
  //         transactionInfoForRequestWithTS
  //       );

  //       const transactionsAndAmount =
  //         await getTransactionsAndTotalAmountRequestOrderedByTimeStamp(
  //           user_id,
  //           month_year
  //         );
  //       console.log(
  //         "NEW TRANSACTIONS AND AMOUNT",
  //         JSON.stringify(transactionsAndAmount, null, 2)
  //       );
  //       const { transactions, total_amount } = transactionsAndAmount;
  //       setTransactionsByMonthYear(transactions);
  //       setTransactionsTotalAmount(total_amount);
  //       response ? setIsLoading(false) : setIsLoading(true);
  //       response ? setIsConfirmed(true) : setIsConfirmed(false);
  //       navigation.navigate("Transaction_confirmation");
  //     } catch (error) {
  //       console.log("THERE WAS AN ERROR:", error);
  //     }
  //   }, 3000);
  // };

  const cancellingTransaction = () => {
    cleaningState();
    navigation.reset({
      index: 0,
      routes: [{ name: "Home" }],
    });
  };

  const movingForwardToCalendar = () => {
    navigation.navigate("Calendar_view", {
      setButton1Pressed,
      setButton2Pressed,
    });
    setButton1Pressed(false);
    setButton2Pressed(true);
  };

  const backHeaderAction = () => {
    const { expenseDate } = packingExpenseDateForDifferentDay(system_date);
    console.log("EXPENSE DATE AT NEW CALENDAR:", expenseDate);
    setTransactionInfoForRequest({
      ...transactionInfoForRequest,
      creation_date: system_date,
      transaction_date: expenseDate,
    });
    setButton1Pressed(true);
    setButton2Pressed(false);
    navigation.goBack();
  };

  const settingTodayTransactionDate = () => {
    const { expenseDate } = packingExpenseDateForDifferentDay(system_date);
    console.log("EXPENSE DATE AT NEW CALENDAR:", expenseDate);
    setTransactionInfoForRequest({
      ...transactionInfoForRequest,
      creation_date: system_date,
      transaction_date: expenseDate,
    });
    setButton1Pressed(true);
    setButton2Pressed(false);
  };

  return (
    <SafeArea background_color={"#FFFFFF"}>
      <GeneralFlexContainer>
        <BackHeaderComponent
          navigation={navigation}
          width={"100%"}
          height={"15%"}
          direction={"row"}
          color={theme.colors.bg.p_FFFFFF}
          // color={"#FAD"}
          action={backHeaderAction}
        />
        <FlexibleContainer
          direction={"column"}
          color={theme.colors.bg.p_FFFFFF}
          // color={"red"}
          flexibility={1}
          justify={"center"}
        >
          <OptionsButtonsComponent
            action={settingTodayTransactionDate}
            action2={movingForwardToCalendar}
            button1Pressed={button1Pressed}
            button2Pressed={button2Pressed}
          />
        </FlexibleContainer>
        <FlexibleContainer
          direction={"column"}
          justify={"flex-start"}
          color={theme.colors.bg.p_FFFFFF}
          // color={"lightblue"}
          flexibility={6}
        >
          <Spacer position="top" size="large" />

          <ConfirmationInfoComponent
            width={200}
            height={140}
            isConfirmed={isConfirmed}
            amount={stringedAmount}
            transaction_date={transaction_date}
            short_name={short_name}
          />
          <Spacer position="top" size="extraLarge" />
          <Spacer position="top" size="extraLarge" />
          <Spacer position="top" size="extraLarge" />
          <LinkButton caption="Cancel" action={cancellingTransaction} />
        </FlexibleContainer>
        <FlexibleContainer
          direction={"row"}
          color={theme.colors.bg.p_FFFFFF}
          // color={"brown"}
          flexibility={2}
          justify={"center"}
        >
          <Spacer position="top" size="xxl" />
          <Spacer position="top" size="xxl" />
          <RegularCTAButton
            caption="Confirm"
            width={310}
            height={50}
            color={theme.colors.buttons.p_FC9827}
            borderRadius={50}
            action={registeringTransaction}
            text_variant="cta_dark_caption"
            isLoading={isLoading}
          />
        </FlexibleContainer>
      </GeneralFlexContainer>
    </SafeArea>
  );
};
