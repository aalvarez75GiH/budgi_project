import React, { useContext } from "react";
import { View } from "react-native";

import { Text } from "../../infrastructure/typography/text.component";
import { SafeArea } from "../../global_components/safe-area.component";
import { GeneralFlexContainer } from "../../global_components/containers/general_flex_container";
import { ExitHeaderComponent } from "../../global_components/organisms/headers/exit_header.component";
import { FlexibleContainer } from "../../global_components/containers/flexible_container";
import { theme } from "../../infrastructure/theme";
import { MonthsPadComponent } from "../../global_components/organisms/pads/months_pad.component";
import { RegularCTAButton } from "../../global_components/buttons/cta_btn";
import { useMonthPadLogic } from "../../hooks/useMonthPadLogic";

import { CategoryDataContext } from "../../infrastructure/services/category_data/category_data.context";

export const MonthsPadView = ({ navigation, route }) => {
  const {
    user_id,
    set_month_year_toRender,
    comingFrom,
    setTotalTransactionsAmountOnDemand,
    setTotalAmountBudgeted,
    setRealIncomeTotalAmountOnDemand,
  } = route.params;

  const {
    selectingMonth,
    isChosen,
    cta_action,
    isLoading,
    confirmingIfMonthIsEnabled,
  } = useMonthPadLogic();

  console.log("IS LOADING:", isLoading);
  const { isLoadingCategoryDataContext } = useContext(CategoryDataContext);
  console.log(
    "IS LOADING CATEGORY DATA CONTEXT:",
    isLoadingCategoryDataContext
  );
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
          <MonthsPadComponent
            user_id={user_id}
            selectingMonth={(month) =>
              selectingMonth(month, set_month_year_toRender)
            }
            isChosen={isChosen}
            confirmingIfMonthIsEnabled={confirmingIfMonthIsEnabled}
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
            isLoading={isLoading ? isLoading : isLoadingCategoryDataContext}
          />
        </FlexibleContainer>
      </GeneralFlexContainer>
    </SafeArea>
  );
};
