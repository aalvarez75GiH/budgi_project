import React, { useContext, useState } from "react";
import { View } from "react-native";

import { Text } from "../../infrastructure/typography/text.component";
import { SafeArea } from "../../global_components/safe-area.component";
import { GeneralFlexContainer } from "../../global_components/containers/general_flex_container";
import { BackHeaderWithLabelComponent } from "../../global_components/organisms/headers/back_header_withLabel.component";
import { FlexibleContainer } from "../../global_components/containers/flexible_container";
import { theme } from "../../infrastructure/theme";
import { AmountsMonthsPadComponent } from "../../global_components/organisms/pads/amounts_months_pad.component";

import { DateOperationsContext } from "../../infrastructure/services/date_operations/date_operations.context";
import { RealIncomeContext } from "../../infrastructure/services/real_income/real_income.context";
import { ExpectedIncomeContext } from "../../infrastructure/services/expected _income/expected_income.context";

export const AmountsMonthsPadView = ({ navigation, route }) => {
  const { comingFrom } = route.params;
  console.log("COMING FROM AT AMOUNT MONTHS PAD VIEW:", comingFrom);
  const { gettingRealIncomeForEachButton } = useContext(RealIncomeContext);

  const { month_selected, setMonthSelected } = useContext(
    DateOperationsContext
  );

  const {
    gettingExpectedIncomeForEachButton,
    setExpectedIncomeForRequest,
    expectedIncomeForRequest,
  } = useContext(ExpectedIncomeContext);

  const [isChosen, setIsChosen] = useState({
    month_selected: month_selected,
    isActive: true,
  });
  const [realIncomeOnDemand, setRealIncomeOnDemand] = useState({});

  const selectingMonth = (month) => {
    if (comingFrom === "appsCashIncomeTile") {
      setIsChosen({ month_selected: month, isActive: true });
      setMonthSelected(month);
      const real_income_on_demand = gettingRealIncomeForEachButton(month);
      console.log("REAL INCOME ON DEMAND:", real_income_on_demand);
      setRealIncomeOnDemand(real_income_on_demand);
      navigation.navigate("Select_work_app_view", {
        realIncomeOnDemand: real_income_on_demand,
      });
    }
    if (comingFrom === "addExpectedIncomeTile") {
      setIsChosen({ month_selected: month, isActive: true });
      setMonthSelected(month);
      const expected_income_on_demand =
        gettingExpectedIncomeForEachButton(month);
      console.log("EXPECTED INCOME ON DEMAND:", expected_income_on_demand);
      setExpectedIncomeForRequest({
        ...expectedIncomeForRequest,
        month_year: expected_income_on_demand.month_year,
        new_expected_income: {
          amount: expected_income_on_demand.amount,
          month_year: expected_income_on_demand.month_year,
          updated: true,
        },
      });
      navigation.navigate("Enter_amount_view", {
        expectedIncomeOnDemand: expected_income_on_demand,
        comingFrom: "addExpectedIncomeTile",
      });
    }
  };

  return (
    <SafeArea background_color={theme.colors.bg.p_FFFFFF}>
      <GeneralFlexContainer color={theme.colors.bg.p_FFFFFF}>
        <BackHeaderWithLabelComponent
          navigation={navigation}
          caption=""
          direction={"row"}
          color={theme.colors.bg.p_FFFFFF}
          // color={"#FAD"}
          flexibility={0.1}
          action={() => navigation.goBack()}
          align="flex-end"
          caption_margin_left={"0%"}
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
            <Text text_variant="neutral_bold_text_24">Select Month</Text>
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
            selectingMonth={(month) => selectingMonth(month)}
            isChosen={isChosen}
            comingFrom={comingFrom}
            // realIncomes={realIncomes}
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
        ></FlexibleContainer>
      </GeneralFlexContainer>
    </SafeArea>
  );
};
