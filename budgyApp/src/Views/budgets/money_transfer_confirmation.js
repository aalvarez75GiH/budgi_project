import React, { useContext, useEffect } from "react";
import { Platform } from "react-native";

import { TwoIconsHeaderComponent } from "../../global_components/organisms/headers/two_icons.header";
import { FlexibleContainer } from "../../global_components/containers/flexible_container";
import { theme } from "../../infrastructure/theme";
import { Text } from "../../infrastructure/typography/text.component";
import { Spacer } from "../../global_components/optimized.spacer.component";
import { GeneralFlexContainer } from "../../global_components/containers/general_flex_container";
import { InfoDetailsTile } from "../../global_components/organisms/tiles/info_details_tile";
import { ControlledContainer } from "../../global_components/containers/controlled_container";
import { RegularCTAButton } from "../../global_components/buttons/cta_btn";

import { CategoryListContext } from "../../infrastructure/services/category_list/category_list.context";
import { DateOperationsContext } from "../../infrastructure/services/date_operations/date_operations.context";
import { CategoryDataContext } from "../../infrastructure/services/category_data/category_data.context";

export const MoneyTransferConfirmationView = ({ navigation, route }) => {
  //   const { comingFrom } = route.params;
  // ****************LOGIC FROM HOOK ********

  const {
    categoryDataInfoForMoneyTransfer,
    movingBackToHome,
    isLoadingCategoryDataContext,
    doingCategoriesMoneyTransfer,
  } = useContext(CategoryDataContext);
  console.log(
    "CATEGORY DATA INFO FOR TRANSFER AT SUMMARY VIEW:",
    JSON.stringify(categoryDataInfoForMoneyTransfer, null, 2)
  );
  const {
    transmitter_category_name,
    transmitter_available_amount,
    receiver_category_name,
  } = categoryDataInfoForMoneyTransfer;

  const { expenseDate } = useContext(DateOperationsContext);

  return (
    <GeneralFlexContainer color={theme.colors.bg.p_FFFFFF}>
      <TwoIconsHeaderComponent
        navigation={navigation}
        direction={"row"}
        color={theme.colors.bg.p_FFFFFF}
        // color={"#FAA"}
        flexibility={0.12}
        action_icon_right={() =>
          resettingInfoForRequestsAndMovingToBudgets(navigation)
        }
        action_icon_left={() => navigation.goBack()}
        icon_name_left={"LeftArrowIcon"}
        icon_name_right={"ExitIcon"}
        icon_top_left={"0%"}
        icon_left_left={"2%"}
        icon_top_right={"0%"}
        icon_left_right={"80%"}
      />

      <ControlledContainer
        color={theme.colors.bg.p_FFFFFF}
        // color={"red"}
        width={"100%"}
        height={"100px"}
        justify="center"
        alignment="flex-start"
      >
        <ControlledContainer
          color={theme.colors.bg.p_FFFFFF}
          // color={"red"}
          width={"100%"}
          height={"100px"}
          justify="center"
          alignment="flex-start"
        >
          <Spacer position="left" size="extraLarge">
            <Text text_variant="bold_text_20">Transfer Summary</Text>
          </Spacer>
        </ControlledContainer>
      </ControlledContainer>

      <FlexibleContainer
        color={theme.colors.bg.e_F4F4F4}
        //color={"lightblue"}
        direction="column"
        flexibility={Platform.OS === "android" ? 0.45 : 0.4}
        justify={"center"}
        isBordered={false}
      >
        <InfoDetailsTile
          caption={"From:"}
          //   caption2={category_name}
          caption2={transmitter_category_name}
          navigation={navigation}
          icon_name={"EditIcon"}
          active_icon={true}
          action={() => null}
          icon_width={0}
          icon_height={0}
        />
        <InfoDetailsTile
          caption={"To:"}
          caption2={receiver_category_name}
          navigation={navigation}
          icon_name={"CalendarIcon"}
          active_icon={true}
          icon_width={0}
          icon_height={0}
          action={() => null}
        />
        <InfoDetailsTile
          caption={"Amount:"}
          //   caption2={transmitter_available_amount}
          caption2={new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(transmitter_available_amount)}
          navigation={navigation}
          icon_name={"CalendarIcon"}
          active_icon={true}
          icon_width={0}
          icon_height={0}
          action={() => null}
        />
        <InfoDetailsTile
          caption={"Date:"}
          caption2={expenseDate}
          navigation={navigation}
          icon_name={"CalendarIcon"}
          active_icon={true}
          icon_width={0}
          icon_height={0}
          action={() => null}
        />
      </FlexibleContainer>
      <FlexibleContainer
        color={theme.colors.bg.p_FFFFFF}
        // color={"brown"}
        direction="column"
        flexibility={0.45}
        justify={"center"}
        isBordered={false}
      >
        <RegularCTAButton
          caption="Done"
          width={290}
          height={60}
          color={theme.colors.ui.success}
          borderRadius={0}
          action={() => movingBackToHome(navigation)}
          text_variant="white_bold_text_16"
        />
      </FlexibleContainer>
    </GeneralFlexContainer>
  );
};
