import React, { useContext, useState, useEffect } from "react";
import { View } from "react-native";

import { Text } from "../../infrastructure/typography/text.component";
import { SafeArea } from "../../global_components/safe-area.component";
import { GeneralFlexContainer } from "../../global_components/containers/general_flex_container";
import { ExitHeaderComponent } from "../../global_components/organisms/headers/exit_header.component";
import { FlexibleContainer } from "../../global_components/containers/flexible_container";
import { theme } from "../../infrastructure/theme";
import { MonthsPadComponent } from "../../global_components/organisms/pads/months_pad.component";
import { RegularCTAButton } from "../../global_components/buttons/cta_btn";
import { getTotalAmountByMonthYearAndUser_ID } from "../../infrastructure/services/transactions/transactions.services";

import { DateOperationsContext } from "../../infrastructure/services/date_operations/date_operations.context";
import { TransactionsContext } from "../../infrastructure/services/transactions/transactions.context";

export const MonthsPadView = ({ navigation, route }) => {
  const {
    user_id,
    set_month_year_toRender,
    comingFrom,
    setTotalTransactionsAmountOnDemand,
    setTotalAmountBudgeted,
    // tile_selected,
    setRealIncomeTotalAmountOnDemand,
  } = route.params;

  // console.log("TIILE SELECTED AT MONTH PAD VIEW:", tile_selected);

  //   ****** DATA FROM DATES OPERATIONS CONTEXT ************
  const {
    setMonthSelected,
    month_selected,
    settingMonthYearForRequest,
    month_year,
  } = useContext(DateOperationsContext);

  //   ****** DATA FROM TRANSACTIONS CONTEXT ************
  const {
    gettingTransactions_byUserID_MonthYear_onDemand,
    isLoading,
    getting_transactions_budgeted_and_real_income_totalAmounts,
  } = useContext(TransactionsContext);

  const [month_year_onDemand, setMonthYearOnDemand] = useState(month_year);

  const [isChosen, setIsChosen] = useState({
    month_selected: month_selected,
    isActive: true,
  });

  const selectingMonth = (month) => {
    const month_year_for_request = settingMonthYearForRequest(month);
    setIsChosen({ month_selected: month, isActive: true });
    setMonthSelected(month);
    setMonthYearOnDemand(month_year_for_request);
    set_month_year_toRender(month_year_for_request);
  };

  const cta_action = async () => {
    if (comingFrom === "MyTransactionsView") {
      await gettingTransactions_byUserID_MonthYear_onDemand(
        user_id,
        month_year_onDemand
      );
    }
    if (comingFrom === "HowMonthIsGoingView") {
      const response =
        await getting_transactions_budgeted_and_real_income_totalAmounts(
          user_id,
          month_year_onDemand
        );
      console.log("RESPONSE AT MONTHS PAD VIEW:", response);
      setTotalTransactionsAmountOnDemand(response.transactions_total_amount);
      setTotalAmountBudgeted(response.totalBudgeted);
      setRealIncomeTotalAmountOnDemand(response.realIncomeTotalAmount);
    }

    navigation.goBack();
  };

  console.log("MONTH YEAR ON DEMAND:", month_year_onDemand);
  return (
    <SafeArea background_color={theme.colors.bg.p_FFFFFF}>
      <GeneralFlexContainer color={theme.colors.bg.p_FFFFFF}>
        <ExitHeaderComponent
          navigation={navigation}
          direction={"column"}
          color={theme.colors.bg.p_FFFFFF}
          //   color={"#FAA"}
          flexibility={0.06}
        />
        <FlexibleContainer
          width={"100%"}
          height={"20%"}
          justify="center"
          alignment="center"
          color={"white"}
          flexibility={0.12}
        >
          <View>
            <Text text_variant="neutral_bold_text_24">Switch Month</Text>
          </View>
        </FlexibleContainer>
        <FlexibleContainer
          width={"100%"}
          height={"20%"}
          justify="center"
          alignment="center"
          color={"white"}
          flexibility={0.5}
        >
          <MonthsPadComponent
            user_id={user_id}
            selectingMonth={selectingMonth}
            //isActive={isActive}
            isChosen={isChosen}
          />
        </FlexibleContainer>
        <FlexibleContainer
          width={"100%"}
          height={"20%"}
          justify="flex-end"
          alignment="center"
          color={"white"}
          //   color={"brown"}
          flexibility={0.25}
        >
          <RegularCTAButton
            caption="Continue"
            width={310}
            height={50}
            color={theme.colors.buttons.p_FC9827}
            borderRadius={50}
            action={cta_action}
            text_variant="bold_text_20"
            isLoading={isLoading}
          />
        </FlexibleContainer>
      </GeneralFlexContainer>
    </SafeArea>
  );
};
