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
import { Text } from "../../infrastructure/typography/text.component";
import { ControlledContainer } from "../../global_components/containers/controlled_container";
import { ClickableControlledContainer } from "../../global_components/containers/clickable_controlled_container";
import { TextForDescription } from "../../global_components/special text components/text_for_descriptions";

export const TransactionSummaryView = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [button1Pressed, setButton1Pressed] = useState(true);
  const [button2Pressed, setButton2Pressed] = useState(false);

  //   ****** DATA FROM TRANSACTIONS CONTEXT ************
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

  const { amount, transaction_date, short_name, description } =
    transactionInfoForRequest;

  //   ****** DATA FROM DATE OPERATIONS CONTEXT ************
  const { packingExpenseDateForDifferentDay, system_date, month_year } =
    useContext(DateOperationsContext);

  //   ****** DATA FROM AUTHENTICATION CONTEXT ************
  const { user, db } = useContext(AuthenticationContext);
  const { user_id } = user;

  console.log(
    "TRANSACTION INFO AT SUMMARY:",
    JSON.stringify(transactionInfoForRequest, null, 2)
  );
  // ****** Here we are parsing amount to integer for request to transaction end point
  const stringedAmount = fixingANumberToTwoDecimalsAndString(amount);

  const listenForNewChangesAtDB = () => {
    const collectionRef = db.collection("transactions");
    collectionRef.onSnapshot(async (snapshot) => {
      let hasNewData = false;

      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const newData = change.doc.data();
          console.log("NEW TRANSACTION IS:", newData);
          if (newData) {
            hasNewData = true;
          }
        }
      });

      if (hasNewData) {
        try {
          const transactionsAndAmount =
            await getTransactionsAndTotalAmountRequestOrderedByTimeStamp(
              user_id,
              month_year
            );

          const { transactions, total_amount } = transactionsAndAmount;

          setTransactionsByMonthYear(transactions);
          setTransactionsTotalAmount(total_amount);
          setIsLoading(false);
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  const registeringTransaction = async () => {
    setIsLoading(true);
    const transactionInfoForRequestWithTS = {
      ...transactionInfoForRequest,
      timeStamp: transactionInfoForRequest.timeStamp
        ? transactionInfoForRequest.timeStamp
        : Date.now(),
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
        // console.log("RESPONSE:", JSON.stringify(response, null, 2));
        response ? setIsLoading(false) : setIsLoading(true);
        response ? setIsConfirmed(true) : setIsConfirmed(false);
        response ? listenForNewChangesAtDB() : null;
        navigation.navigate("Transaction_confirmation");
      } catch (error) {
        console.log("THERE WAS AN ERROR:", error);
      }
    }, 3000);
  };

  const movingForwardToCalendar = () => {
    navigation.navigate("General_calendar_view", {
      setButton1Pressed,
      setButton2Pressed,
      comingFrom: "TransactionSummaryView",
    });
    setButton1Pressed(false);
    setButton2Pressed(true);
  };

  const movingForwardToAddDescription = () => {
    navigation.navigate("General_AddDescription_view", {
      comingFrom: "TransactionSummaryView",
    });
  };

  const backHeaderAction = () => {
    const { expenseDate } = packingExpenseDateForDifferentDay(system_date);
    // console.log("EXPENSE DATE AT NEW CALENDAR:", expenseDate);
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
    // console.log("EXPENSE DATE AT NEW CALENDAR:", expenseDate);
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
          align="center"
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
            isConfirmed={isConfirmed}
            amount={stringedAmount}
            transaction_date={transaction_date}
            short_name={short_name}
          />
          <Spacer position="top" size="extraLarge" />

          {description ? (
            <>
              <ControlledContainer
                width={"100%"}
                height={"10%"}
                justify="center"
                alignment="flex-start"
                // color="red"
              >
                <Spacer position="left" size="extraLarge">
                  <Text text_variant="bold_text_16">Description:</Text>
                </Spacer>
              </ControlledContainer>
              <ClickableControlledContainer
                width={"85%"}
                height={"30%"}
                justify="flex-start"
                alignment="flex-start"
                action={movingForwardToAddDescription}
                // color={theme.colors.bg.e_F4F4F4}
                onPress={movingForwardToAddDescription}
              >
                <TextForDescription size={16}>{description}</TextForDescription>
              </ClickableControlledContainer>
            </>
          ) : (
            <>
              <Spacer position="top" size="extraLarge" />
              <Spacer position="top" size="extraLarge" />
              <LinkButton
                caption="Add a description (optional)"
                action={movingForwardToAddDescription}
              />
            </>
          )}
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
            text_variant="bold_text_20"
            isLoading={isLoading}
          />
        </FlexibleContainer>
      </GeneralFlexContainer>
    </SafeArea>
  );
};
