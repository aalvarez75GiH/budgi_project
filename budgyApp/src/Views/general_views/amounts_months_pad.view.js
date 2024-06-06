import React, { useContext, useState } from "react";
import { View } from "react-native";

import { Text } from "../../infrastructure/typography/text.component";
import { SafeArea } from "../../global_components/safe-area.component";
import { GeneralFlexContainer } from "../../global_components/containers/general_flex_container";
import { ExitHeaderComponent } from "../../global_components/organisms/headers/exit_header.component";
import { FlexibleContainer } from "../../global_components/containers/flexible_container";
import { theme } from "../../infrastructure/theme";
import { MonthsPadComponent } from "../../global_components/organisms/pads/months_pad.component";
import { AmountsMonthsPadComponent } from "../../global_components/organisms/pads/amounts_months_pad.component";
import { RegularCTAButton } from "../../global_components/buttons/cta_btn";
import { useMonthPadLogic } from "../../hooks/useMonthPadLogic";

import { DateOperationsContext } from "../../infrastructure/services/date_operations/date_operations.context";

export const AmountsMonthsPadView = ({ navigation, route }) => {
  const { month_selected, setMonthSelected } = useContext(
    DateOperationsContext
  );

  const [isChosen, setIsChosen] = useState({
    month_selected: month_selected,
    isActive: true,
  });

  const selectingMonth = (month) => {
    setIsChosen({ month_selected: month, isActive: true });
    setMonthSelected(month);
  };

  const cta_action = async (
    navigation,
    comingFrom,
    user_id,
    setTotalTransactionsAmountOnDemand,
    setTotalAmountBudgeted,
    setRealIncomeTotalAmountOnDemand
  ) => {
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
      //   console.log("RESPONSE AT MONTHS PAD VIEW:", response);
      setTotalTransactionsAmountOnDemand(response.transactions_total_amount);
      setTotalAmountBudgeted(response.totalBudgeted);
      setRealIncomeTotalAmountOnDemand(response.realIncomeTotalAmount);
    }

    navigation.goBack();
  };

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
          <AmountsMonthsPadComponent
            // user_id={user_id}
            selectingMonth={(month) => selectingMonth(month)}
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
          {/* <RegularCTAButton
            caption="Continue"
            width={310}
            height={50}
            color={theme.colors.buttons.p_FC9827}
            borderRadius={50}
            action={() =>
              cta_action(
                navigation,
                comingFrom,
                user_id,
                setTotalTransactionsAmountOnDemand,
                setTotalAmountBudgeted,
                setRealIncomeTotalAmountOnDemand
              )
            }
            text_variant="bold_text_20"
            isLoading={isLoading}
          /> */}
        </FlexibleContainer>
      </GeneralFlexContainer>
    </SafeArea>
  );
};
