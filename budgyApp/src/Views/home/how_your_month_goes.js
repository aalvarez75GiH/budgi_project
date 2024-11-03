import React, { useEffect, useState, useContext } from "react";
import { FlatList } from "react-native";

import { Platform } from "react-native";

import { ExitHeaderWithMonthsOptionButtonComponent } from "../../global_components/organisms/headers/exit+month_option_button.header";
import { ExitHeaderComponent } from "../../global_components/organisms/headers/exit_header.component";
import { theme } from "../../infrastructure/theme";
import { GeneralFlexContainer } from "../../global_components/containers/general_flex_container";
import { FlexibleContainer } from "../../global_components/containers/flexible_container";
import { CircularChartComponent } from "../../global_components/organisms/bar charts diagrams/circular_chart.component";
import { CenteredTextTileWithIcon } from "../../global_components/organisms/tiles/centered_text_with_icon_tile";
import { useHowYourMonthGoesLogic } from "../../hooks/useHowYourMonthGoesLogic";
import { EmptyInfoAlert } from "../../global_components/empty_info_alert";
import { SafeArea } from "../../global_components/safe-area.component";
import { ControlledContainer } from "../../global_components/containers/controlled_container";
import { Spacer } from "../../global_components/optimized.spacer.component";
import { SquaredRoundedOptionComponent } from "../../global_components/organisms/clickables options/squared_rounded_option.component";

import { HomeContext } from "../../infrastructure/services/Home services/home.context";

export const HowMonthIsGoingView = ({ navigation }) => {
  //   *****************************************************************************************************
  const {
    switchingOptions,
    isSpinnerLoading,
    tile_selected,
    movingForwardToMonthsPadView,
    month_year_toRender,
    amountsMathLogic,
    getting_transactions_budgeted_and_real_income_totalAmounts,
    setTotalTransactionsAmountOnDemand,
    setTotalAmountBudgeted,
    setRealIncomeTotalAmountOnDemand,
    totalTransactionsAmountOnDemand,
    totalAmountBudgeted,
    realIncomeTotalAmountOnDemand,
    setMonthSelected,
    month_name,
    month_year,
    user_id,
    spentPlusBillsVsIncomeMathLogic,
  } = useHowYourMonthGoesLogic();
  const { percentageCompleted, overSpentAmountInNegative } = amountsMathLogic();

  const {
    bills_by_user,
    billsSelectedTotalAmount,
    isLoadingBillRequest,
    setIsLoadingBillRequest,
  } = useContext(HomeContext);

  const [sortedBills, setSortedBills] = useState([]);
  const [
    billsAmountPlusTransactionsAmount,
    setBillsAmountPlusTransactionsAmount,
  ] = useState(0);

  useEffect(() => {
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

    return () => {
      const settingTransactionsTotalAmountAndTotalBudgeted = async () => {
        setMonthSelected(month_name);
        const response =
          await getting_transactions_budgeted_and_real_income_totalAmounts(
            user_id,
            month_year
          );
        console.log(
          "RESPONSE AT HOW YOUR MONTH  GOES:",
          JSON.stringify(response.transactions_total_amount, null, 2)
        );
        setTotalTransactionsAmountOnDemand(response.transactions_total_amount);
        setTotalAmountBudgeted(response.totalBudgeted);
        setRealIncomeTotalAmountOnDemand(response.realIncomeTotalAmount);
      };
      settingTransactionsTotalAmountAndTotalBudgeted();
    };
  }, [bills_by_user]);

  console.log("REAL INCOME TOTAL AMOUNT AT 1:", realIncomeTotalAmountOnDemand);
  console.log("PERCENTAGE COMPLETED AT 1:", percentageCompleted);
  console.log("OVER SPENT AMOUNT IN NEGATIVE AT 1:", overSpentAmountInNegative);
  console.log("TILE SELECTED AT 1:", tile_selected);

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
      <ExitHeaderWithMonthsOptionButtonComponent
        navigation={navigation}
        direction={"column"}
        color={theme.colors.bg.p_FFFFFF}
        // color={"#FAA"}
        flexibility={0.12}
        month_year_toRender={month_year_toRender}
        month_year={month_year}
        action={() => movingForwardToMonthsPadView(navigation)}
        icon_left={"2%"}
        icon_top={"10%"}
      />

      <FlexibleContainer
        color={theme.colors.bg.p_FFFFFF}
        // color={"lightblue"}
        direction="row"
        flexibility={Platform.OS === "ios" ? 0.35 : 0.37}
        justify={"center"}
        isBordered={false}
      >
        {tile_selected === "Spent vs budgeted" && (
          <CircularChartComponent
            primaryAmount={totalTransactionsAmountOnDemand}
            secondaryAmount={totalAmountBudgeted}
            percentageCompleted={percentageCompleted}
            secondaryLabel="Budgeted:"
            overSpentAmountInNegative={overSpentAmountInNegative}
            isSpinnerLoading={isSpinnerLoading}
          />
        )}

        {tile_selected === "Spent vs income" && (
          <CircularChartComponent
            primaryAmount={totalTransactionsAmountOnDemand}
            secondaryAmount={realIncomeTotalAmountOnDemand}
            percentageCompleted={percentageCompleted}
            secondaryLabel="Income: "
            overSpentAmountInNegative={overSpentAmountInNegative}
            isSpinnerLoading={isSpinnerLoading}
          />
        )}
        {tile_selected === "Spent + bills vs income" && (
          // <CircularChartComponent
          //   primaryAmount={totalTransactionsAmountOnDemand}
          //   secondaryAmount={realIncomeTotalAmountOnDemand}
          //   percentageCompleted={percentageCompleted}
          //   secondaryLabel="Income: "
          //   overSpentAmountInNegative={overSpentAmountInNegative}
          //   isSpinnerLoading={isSpinnerLoading}
          // />
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
        )}
      </FlexibleContainer>
      <FlexibleContainer
        color={theme.colors.neutrals.e2_F5F5F5}
        // color={"lightblue"}
        direction="column"
        // flexibility={0.185}
        flexibility={Platform.OS === "ios" ? 0.25 : 0.285}
        justify={"center"}
        isBordered={false}
      >
        <CenteredTextTileWithIcon
          caption={"Spent vs budgeted"}
          navigation={navigation}
          icon_name={"ThinCheckIcon"}
          active_icon={true}
          action={() => switchingOptions("Spent vs budgeted")}
          tile_selected={tile_selected}
        />
        <CenteredTextTileWithIcon
          caption={"Spent vs income"}
          navigation={navigation}
          icon_name={"ThinCheckIcon"}
          active_icon={false}
          action={() => switchingOptions("Spent vs income")}
          tile_selected={tile_selected}
        />
        <CenteredTextTileWithIcon
          caption={"Spent + bills vs income"}
          navigation={navigation}
          icon_name={"ThinCheckIcon"}
          active_icon={false}
          // action={() => navigation.navigate("Spent_plus_bills_vs_income")}
          // action={() => switchingOptions("Spent + bills vs income")}
          action={() => switchingOptions("Spent + bills vs income")}
          tile_selected={tile_selected}
        />
      </FlexibleContainer>
      <FlexibleContainer
        color={theme.colors.ui.s_FFFFFF}
        //color={"lightgreen"}
        direction="column"
        // flexibility={0.185}
        flexibility={Platform.OS === "ios" ? 0.2 : 0.2}
        justify={"center"}
        isBordered={false}
      >
        {tile_selected === "Spent + bills vs income" && (
          <ControlledContainer
            width={"100%"}
            height={"90%"}
            justify="center"
            alignment="center"
            //   color={theme.colors.neutrals.e3_D6D6D6}
            color={theme.colors.bg.p_FFFFFF}
            //   color={"blue"}
          >
            {/* <ControlledContainer
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
              <Text text_variant="bold_text_16">{billCurrentDate}</Text>
            </Spacer>
          </ControlledContainer> */}
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

            {/* <ControlledContainer
            color={theme.colors.bg.p_FFFFFF}
            // color={"lightblue"}
            width={"100%"}
            height={"20%"}
            justify="center"
            alignment="center"
            direction="column"
          >
            <LinkButton caption={"Clear all bills"} action={() => null} />
          </ControlledContainer> */}
          </ControlledContainer>
        )}
      </FlexibleContainer>
    </GeneralFlexContainer>
  );
};
