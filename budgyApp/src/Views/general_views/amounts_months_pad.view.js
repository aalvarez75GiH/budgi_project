import React, { useContext, useState } from "react";
import { View } from "react-native";

import { Text } from "../../infrastructure/typography/text.component";
import { SafeArea } from "../../global_components/safe-area.component";
import { GeneralFlexContainer } from "../../global_components/containers/general_flex_container";
import { ExitHeaderComponent } from "../../global_components/organisms/headers/exit_header.component";
import { BackHeaderWithLabelComponent } from "../../global_components/organisms/headers/back_header_withLabel.component";
import { FlexibleContainer } from "../../global_components/containers/flexible_container";
import { theme } from "../../infrastructure/theme";
import { MonthsPadComponent } from "../../global_components/organisms/pads/months_pad.component";
import { AmountsMonthsPadComponent } from "../../global_components/organisms/pads/amounts_months_pad.component";
import { RegularCTAButton } from "../../global_components/buttons/cta_btn";
import { useMonthPadLogic } from "../../hooks/useMonthPadLogic";

import { DateOperationsContext } from "../../infrastructure/services/date_operations/date_operations.context";
import { RealIncomeContext } from "../../infrastructure/services/real_income/real_income.context";

export const AmountsMonthsPadView = ({ navigation, route }) => {
  // const { realIncomes } = route.params;
  const { gettingRealIncomeForEachButton } = useContext(RealIncomeContext);

  const { month_selected, setMonthSelected } = useContext(
    DateOperationsContext
  );

  const [isChosen, setIsChosen] = useState({
    month_selected: month_selected,
    isActive: true,
  });
  const [realIncomeOnDemand, setRealIncomeOnDemand] = useState({});

  const selectingMonth = (month) => {
    setIsChosen({ month_selected: month, isActive: true });
    setMonthSelected(month);
    const real_income_on_demand = gettingRealIncomeForEachButton(month);
    console.log("REAL INCOME ON DEMAND:", real_income_on_demand);
    setRealIncomeOnDemand(real_income_on_demand);
    navigation.navigate("Select_work_app_view", {
      realIncomeOnDemand: real_income_on_demand,
    });
  };

  return (
    <SafeArea background_color={theme.colors.bg.p_FFFFFF}>
      <GeneralFlexContainer color={theme.colors.bg.p_FFFFFF}>
        {/* <ExitHeaderComponent
          navigation={navigation}
          direction={"column"}
          color={theme.colors.bg.p_FFFFFF}
          //   color={"#FAA"}
          flexibility={0.06}
          justify={"flex-end"}
        /> */}
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
