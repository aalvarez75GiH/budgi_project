import React, { useContext, useState, useEffect } from "react";
import { View } from "react-native";

import { Text } from "../../infrastructure/typography/text.component";
import { SafeArea } from "../../global_components/safe-area.component";
import { GeneralFlexContainer } from "../../global_components/containers/general_flex_container";
import { ExitHeaderComponent } from "../../global_components/organisms/headers/exit_header.component";
import { FlexibleContainer } from "../../global_components/containers/flexible_container";
import { theme } from "../../infrastructure/theme";
import { MonthOptionButton } from "../../global_components/buttons/month_option_button";
import { MonthsPadComponent } from "../../global_components/organisms/pads/months_pad.component";
import { RegularCTAButton } from "../../global_components/buttons/cta_btn";

import { DateOperationsContext } from "../../infrastructure/services/date_operations/date_operations.context";
import { TransactionsContext } from "../../infrastructure/services/transactions/transactions.context";

export const MonthsPadView = ({ navigation, route }) => {
  const { user_id, set_month_year_toRender } = route.params;
  const [month_selected, setMonthSelected] = useState(
    month_selected ? month_selected : "May"
  );
  const [month_year_onDemand, setMonthYearOnDemand] = useState("MAY 2024");
  const [isActive, setIsActive] = useState({
    month_selected: month_selected,
    isActive: true,
  });

  const { gettingAcronym } = useContext(DateOperationsContext);
  const { gettingTransactions_byUserID_MonthYear_onDemand, isLoading } =
    useContext(TransactionsContext);

  useEffect(() => {
    const month_year_for_request = gettingAcronym(month_selected);
    console.log("MONTH YEAR FOR REQUEST:", month_year_for_request);
    setMonthYearOnDemand(month_year_for_request);
    set_month_year_toRender(month_year_for_request);
  }, [month_selected]);

  const selectingMonth = (month) => {
    setIsActive({ month_selected: month, isActive: true });
    setMonthSelected(month);
  };

  console.log("MONTH SELECTED:", month_selected);
  console.log("MONTH YEAR ON DEMAND OUTSIDE:", month_year_onDemand);

  const gettingTransactionsOnDemand = async () => {
    await gettingTransactions_byUserID_MonthYear_onDemand(
      user_id,
      month_year_onDemand
    );
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
            isActive={isActive}
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
            action={() => gettingTransactionsOnDemand()}
            text_variant="bold_text_20"
            isLoading={isLoading}
          />
        </FlexibleContainer>
      </GeneralFlexContainer>
    </SafeArea>
  );
};
