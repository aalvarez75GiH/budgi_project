import React, { useState, useContext } from "react";
import { Platform } from "react-native";
import CalendarPicker from "react-native-calendar-picker-scrollable-fix";

import { theme } from "../../infrastructure/theme";
import { GeneralFlexContainer } from "../../global_components/containers/general_flex_container";
import { BackHeaderComponent } from "../../global_components/organisms/headers/back_header.component";
import { FlexibleContainer } from "../../global_components/containers/flexible_container";
import { RegularCTAButton } from "../../global_components/buttons/cta_btn";
import { Spacer } from "../../global_components/optimized.spacer.component";

import { DateOperationsContext } from "../../infrastructure/services/date_operations/date_operations.context";
import { TransactionsContext } from "../../infrastructure/services/transactions/transactions.context";

export const GeneralCalendarView = ({ navigation, route }) => {
  const { packingExpenseDateForDifferentDay, system_date } = useContext(
    DateOperationsContext
  );

  const [selected, setSelected] = useState(null);
  const { setButton1Pressed, setButton2Pressed, comingFrom } = route.params;

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [timeStamp, setTimeStamp] = useState(null);

  //   ****** Date operations context consumption ************
  // console.log("SYSTEM DATE AT NEW CALENDAR:", system_date);
  // console.log("SELECTED  AT NEW CALENDAR:", selected);
  // console.log("SELECTED DATE TIME STAMP:", selectedDate.getTime());
  // console.log("TIME STAMP::", timeStamp);

  //   ****** Transactions context consumption ************
  const {
    setTransactionInfoForRequest,
    transactionInfoForRequest,
    transactionInfoForUpdate,
    setTransactionInfoForUpdate,
    transactionsByMonthYear,
  } = useContext(TransactionsContext);

  console.log("SELECTED DATE DATE AT NEW CALENDAR:", selectedDate);

  const settingTimeStampForDifferentDay = (expenseDate) => {
    const last_transactionWithSameExpenseDate = transactionsByMonthYear.find(
      (element) => element.transaction_date === expenseDate
    );

    let timeStampForDifferentDayTransaction;
    if (last_transactionWithSameExpenseDate) {
      // Use last_transactionWithSameExpenseDate
      timeStampForDifferentDayTransaction =
        last_transactionWithSameExpenseDate.timeStamp + 1000;
      // return timeStampForDifferentDayTransaction;
    } else {
      // Handle the case where last_transactionWithSameExpenseDate is undefined
      timeStampForDifferentDayTransaction = Date.now();
      // return timeStampForDifferentDayTransaction;
    }
    return timeStampForDifferentDayTransaction;
  };

  const onDateChange = (date) => {
    setSelected(date);
    const { expenseDate, month_year } = packingExpenseDateForDifferentDay(date);

    const timeStampForDifferentDayTransaction =
      settingTimeStampForDifferentDay(expenseDate);

    {
      comingFrom === "TransactionSummaryView"
        ? setTransactionInfoForRequest({
            ...transactionInfoForRequest,
            creation_date: system_date,
            transaction_date: expenseDate,
            month_year: month_year,
            timeStamp: timeStampForDifferentDayTransaction
              ? timeStampForDifferentDayTransaction
              : Date.now(),
          })
        : setTransactionInfoForUpdate({
            ...transactionInfoForUpdate,
            transaction_date: expenseDate,
            month_year: month_year,
            timeStamp: timeStampForDifferentDayTransaction
              ? timeStampForDifferentDayTransaction
              : Date.now(),
          });
    }
  };

  function backHeaderAction() {
    const { expenseDate, month_year } =
      packingExpenseDateForDifferentDay(system_date);

    const timeStampForDifferentDayTransaction =
      settingTimeStampForDifferentDay(expenseDate);
    {
      comingFrom === "TransactionSummaryView"
        ? setTransactionInfoForRequest({
            ...transactionInfoForRequest,
            creation_date: system_date,
            transaction_date: expenseDate,
            month_year: month_year,
            timeStamp: timeStampForDifferentDayTransaction
              ? timeStampForDifferentDayTransaction
              : Date.now(),
          })
        : setTransactionInfoForUpdate({
            ...transactionInfoForUpdate,
            transaction_date: expenseDate,
            month_year: month_year,
            timeStamp: timeStampForDifferentDayTransaction
              ? timeStampForDifferentDayTransaction
              : Date.now(),
          });
    }
    {
      comingFrom === "TransactionSummaryView"
        ? settingButtonPressedAndExiting()
        : movingBackToTransactionDetails();
    }
  }

  const settingButtonPressedAndExiting = () => {
    setButton1Pressed(true);
    setButton2Pressed(false);
    navigation.goBack();
  };

  const comingBackToSummary = () => {
    setButton1Pressed(false);
    setButton2Pressed(true);
    navigation.goBack();
  };

  const movingBackToTransactionDetails = () => {
    navigation.navigate("Transaction_details_view");
  };

  return (
    <GeneralFlexContainer color={"white"}>
      <BackHeaderComponent
        navigation={navigation}
        width={"50%"}
        height={"15%"}
        direction={"column"}
        color={theme.colors.bg.p_FFFFFF}
        action={backHeaderAction}
        // color={"#FAD"}
      />
      <FlexibleContainer
        //   color={theme.colors.bg.e_F4F4F4}
        color={"white"}
        direction="row"
        flexibility={1.2}
        justify={"center"}
        isBordered={false}
      >
        <CalendarPicker
          maxDate={new Date()}
          onDateChange={onDateChange}
          todayTextStyle={{
            color: "#14223C",
            fontFamily: theme.fonts.bold,
            textDecorationLine: "underline",
          }}
          todayBackgroundColor="#FFFFFF"
          selectedDayColor="#14223C"
          selectedDayTextColor="#FFFFFF"
          textStyle={{ fontFamily: theme.fonts.bold, fontSize: 14 }}
          width={410}
          height={410}
          scrollable={Platform.OS === "android" ? false : true}
          dayLabelsWrapper={{ borderBottomColor: "#FFFFFF" }}
          monthTitleStyle={{
            fontSize: 20,
            color: theme.colors.neutrals.p_B7B7B7,
          }}
          yearTitleStyle={{
            fontSize: 20,
            color: theme.colors.neutrals.p_B7B7B7,
          }}
        />
      </FlexibleContainer>
      <Spacer position="top" size="extraLarge" />
      <Spacer position="top" size="extraLarge" />
      <Spacer position="top" size="extraLarge" />
      <FlexibleContainer
        color={theme.colors.bg.p_FFFFFF}
        // color={"red"}
        direction="column"
        flexibility={1.7}
        justify={"space-evenly"}
        isBordered={false}
      >
        <Spacer position="top" size="xxl" />
        {selected ? (
          <RegularCTAButton
            caption="Set new date"
            width={310}
            height={50}
            color={theme.colors.buttons.p_FC9827}
            borderRadius={50}
            action={
              comingFrom === "TransactionSummaryView"
                ? comingBackToSummary
                : movingBackToTransactionDetails
            }
            text_variant="bold_text_20"
            //   isLoading={isLoading}
          />
        ) : null}
      </FlexibleContainer>
    </GeneralFlexContainer>
  );
};
