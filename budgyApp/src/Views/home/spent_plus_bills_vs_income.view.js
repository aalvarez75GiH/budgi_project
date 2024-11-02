import React, { useEffect, useContext, useState } from "react";

import { Platform, FlatList, StyleSheet, View } from "react-native";

import { ExitHeaderWithMonthsOptionButtonComponent } from "../../global_components/organisms/headers/exit+month_option_button.header";
import { ExitHeaderComponent } from "../../global_components/organisms/headers/exit_header.component";
import { theme } from "../../infrastructure/theme";
import { GeneralFlexContainer } from "../../global_components/containers/general_flex_container";
import { FlexibleContainer } from "../../global_components/containers/flexible_container";
import { CircularChartComponent } from "../../global_components/organisms/bar charts diagrams/circular_chart.component";
import { useHowYourMonthGoesLogic } from "../../hooks/useHowYourMonthGoesLogic";
import { EmptyInfoAlert } from "../../global_components/empty_info_alert";
import { SafeArea } from "../../global_components/safe-area.component";
import { ControlledContainer } from "../../global_components/containers/controlled_container";
import { Text } from "../../infrastructure/typography/text.component";
import { Spacer } from "../../global_components/optimized.spacer.component";
import { SquaredRoundedOptionComponent } from "../../global_components/organisms/clickables options/squared_rounded_option.component";
import { LinkButton } from "../../global_components/buttons/link_button";

import { HomeContext } from "../../infrastructure/services/Home services/home.context";
import { AuthenticationContext } from "../../infrastructure/services/authentication/authentication.context";
import { DateOperationsContext } from "../../infrastructure/services/date_operations/date_operations.context";

export const SpentPlusBillsVsIncomeView = ({ navigation, route }) => {
  //   *****************************************************************************************************
  const {
    totalTransactionsAmountOnDemand,
    realIncomeTotalAmountOnDemand,
    percentageCompleted,
    overSpentAmountInNegative,
  } = route.params;

  const { user } = useContext(AuthenticationContext);
  const { user_id } = user;

  const { system_date, expenseDate, billCurrentDate } = useContext(
    DateOperationsContext
  );

  console.log(
    "TOTAL TRANSACTIONS AMOUNT AT 2:",
    totalTransactionsAmountOnDemand
  );
  console.log("REAL INCOME TOTAL AMOUNT AT 2:", realIncomeTotalAmountOnDemand);
  console.log("PERCENTAGE COMPLETED AT 2:", percentageCompleted);
  console.log("OVER SPENT AMOUNT IN NEGATIVE AT 2:", overSpentAmountInNegative);

  const {
    // switchingOptions,
    isSpinnerLoading,
    // tile_selected,
    movingForwardToMonthsPadView,
    month_year_toRender,
    amountsMathLogic,
    getting_transactions_budgeted_and_real_income_totalAmounts,
    setTotalTransactionsAmountOnDemand,
    setTotalAmountBudgeted,
    setRealIncomeTotalAmountOnDemand,
    // totalTransactionsAmountOnDemand,
    totalAmountBudgeted,
    // realIncomeTotalAmountOnDemand,
    setMonthSelected,
    month_name,
    month_year,
    //user_id,
    // set_tile_selected,
    spentPlusBillsVsIncomeMathLogic,
  } = useHowYourMonthGoesLogic();

  const { bills_by_user, billsSelectedTotalAmount, isLoadingBillRequest } =
    useContext(HomeContext);

  console.log(
    "IS SELECTED ARRAY TOTAL AMOUNT AT VIEW:",
    billsSelectedTotalAmount
  );
  const [
    billsAmountPlusTransactionsAmount,
    setBillsAmountPlusTransactionsAmount,
  ] = useState(0);

  useEffect(() => {
    // spentPlusBillsVsIncomeMathLogic();
    const sortBillsByTimestamp = (bills_by_user) => {
      return bills_by_user.sort(
        (a, b) =>
          a.payment_date_timeStamp._seconds - b.payment_date_timeStamp._seconds
      );
    };

    const sortedBills = sortBillsByTimestamp(bills_by_user);
    setSortedBills(sortedBills);

    const billsAmountPlusTransactionsAmount =
      totalTransactionsAmountOnDemand + billsSelectedTotalAmount;
    setBillsAmountPlusTransactionsAmount(billsAmountPlusTransactionsAmount);
  }, [bills_by_user]);

  //   const { percentageCompleted, overSpentAmountInNegative } = amountsMathLogic();
  const [sortedBills, setSortedBills] = useState([]);
  const [billSelected, setBillSelected] = useState(null);
  const [isSelected, setIsSelected] = useState(false);

  const renderUnPaidBillItem = ({ item }) => {
    const { status, bill_id } = item;
    if (status === "Paused") {
      return null;
    }
    return <SquaredRoundedOptionComponent item={item} bill_id={bill_id} />;
  };

  if (totalAmountBudgeted === 0) {
    return (
      <SafeArea background_color={theme.colors.bg.p_FFFFFF}>
        <GeneralFlexContainer color={theme.colors.bg.p_FFFFFF}>
          <ExitHeaderComponent
            navigation={navigation}
            direction={"column"}
            color={theme.colors.bg.p_FFFFFF}
            //   color={"#FAA"}
            flexibility={0.06}
            justify={"flex-end"}
            icon_left={"10%"}
            icon_top={"0%"}
          />

          <EmptyInfoAlert
            caption="There are no transactions made :("
            width={"90%"}
            height={"20%"}
            color="#F9F9FA"
            justify={"center"}
            alignment={"center"}
            comingFrom="MyTransactionsView"
          />
        </GeneralFlexContainer>
      </SafeArea>
    );
  }

  return (
    <GeneralFlexContainer color={theme.colors.bg.p_FFFFFF}>
      <ExitHeaderComponent
        navigation={navigation}
        direction={"column"}
        color={theme.colors.bg.p_FFFFFF}
        //   color={"#FAA"}
        flexibility={0.15}
        justify={"flex-end"}
        icon_left={"2%"}
        icon_top={"0%"}
      />

      <FlexibleContainer
        color={theme.colors.bg.p_FFFFFF}
        // color={"lightblue"}
        direction="row"
        flexibility={Platform.OS === "ios" ? 0.42 : 0.45}
        justify={"center"}
        isBordered={false}
      >
        <CircularChartComponent
          //   primaryAmount={totalTransactionsAmountOnDemand}
          primaryAmount={billsAmountPlusTransactionsAmount}
          secondaryAmount={realIncomeTotalAmountOnDemand}
          percentageCompleted={percentageCompleted}
          secondaryLabel="Income: "
          overSpentAmountInNegative={overSpentAmountInNegative}
          // isSpinnerLoading={isSpinnerLoading}
          isSpinnerLoading={isLoadingBillRequest}
        />
      </FlexibleContainer>
      <FlexibleContainer
        // color={theme.colors.neutrals.e2_F5F5F5}
        color={theme.colors.bg.p_FFFFFF}
        // color={"red"}
        direction="column"
        // flexibility={0.185}
        flexibility={Platform.OS === "ios" ? 0.25 : 0.25}
        justify={"center"}
        isBordered={false}
      >
        <ControlledContainer
          width={"100%"}
          height={"90%"}
          justify="center"
          alignment="center"
          //   color={theme.colors.neutrals.e3_D6D6D6}
          color={theme.colors.bg.p_FFFFFF}
          //   color={"blue"}
        >
          <ControlledContainer
            width={"100%"}
            height={"20%"}
            justify="center"
            alignment="center"
            direction="row"
            // color={"orange"}
            color={theme.colors.bg.p_FFFFFF}
          >
            <Spacer position="left" size="large">
              <Text text_variant="bold_text_16">
                Select bills you have paid till today -
              </Text>
            </Spacer>
            <Spacer position="left" size="small">
              {/* <Text text_variant="bold_text_16">Oct 30, 2024</Text> */}
              <Text text_variant="bold_text_16">{billCurrentDate}</Text>
            </Spacer>
          </ControlledContainer>
          <Spacer position="top" size="medium" />
          <ControlledContainer
            color={theme.colors.bg.p_FFFFFF}
            width={"100%"}
            height={"80%"}
            justify="center"
            alignment="center"
            direction="row"
          >
            <ControlledContainer
              color={theme.colors.bg.p_FFFFFF}
              //   color={"red"}
              width={"5%"}
              height={"80%"}
              justify="center"
              alignment="center"
              direction="row"
            />
            <FlatList
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={sortedBills}
              renderItem={renderUnPaidBillItem}
              keyExtractor={(item, id) => {
                return item.bill_id;
              }}
            />
          </ControlledContainer>

          <ControlledContainer
            color={theme.colors.bg.p_FFFFFF}
            // color={"lightblue"}
            width={"100%"}
            height={"20%"}
            justify="center"
            alignment="center"
            direction="column"
          >
            <LinkButton caption={"Clear all bills"} action={() => null} />
          </ControlledContainer>
        </ControlledContainer>
      </FlexibleContainer>
    </GeneralFlexContainer>
  );
};
