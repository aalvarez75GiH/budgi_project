import React, { useEffect, useState, useContext } from "react";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
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
import { SquaredRoundedOptionComponent } from "../../global_components/organisms/clickables options/squared_rounded_option.component";
import { PayingBillsBottomSheet } from "../../global_components/bottom_sheets/paying_bills_bottom_sheet";

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
  } = useHowYourMonthGoesLogic();
  const { percentageCompleted, overSpentAmountInNegative } = amountsMathLogic();

  const {
    bills_by_user,
    billsSelectedTotalAmount,
    isLoadingBillRequest,
    setModalActive,
    modalActive,
  } = useContext(HomeContext);

  const [
    billsAmountPlusTransactionsAmount,
    setBillsAmountPlusTransactionsAmount,
  ] = useState(0);

  useEffect(() => {
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
    <GestureHandlerRootView>
      <GeneralFlexContainer color={theme.colors.bg.p_FFFFFF}>
        <BottomSheetModalProvider>
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
              <CircularChartComponent
                primaryAmount={billsAmountPlusTransactionsAmount}
                secondaryAmount={realIncomeTotalAmountOnDemand}
                percentageCompleted={percentageCompleted}
                secondaryLabel="Income: "
                overSpentAmountInNegative={overSpentAmountInNegative}
                isSpinnerLoading={isLoadingBillRequest}
              />
            )}
          </FlexibleContainer>
          <FlexibleContainer
            color={theme.colors.neutrals.e2_F5F5F5}
            // color={"lightblue"}
            direction="column"
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
              action={() => {
                switchingOptions("Spent + bills vs income");
                setModalActive(true);
              }}
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
          ></FlexibleContainer>
          {modalActive && (
            <PayingBillsBottomSheet
              navigation={navigation}
              movingBackToHome={() => null}
              billsAmountPlusTransactionsAmount={
                billsAmountPlusTransactionsAmount
              }
            />
          )}
        </BottomSheetModalProvider>
      </GeneralFlexContainer>
    </GestureHandlerRootView>
  );
};
