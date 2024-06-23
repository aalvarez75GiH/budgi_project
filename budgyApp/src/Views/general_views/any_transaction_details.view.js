import React from "react";

import { TwoIconsHeaderComponent } from "../../global_components/organisms/headers/two_icons.header";
import { FlexibleContainer } from "../../global_components/containers/flexible_container";
import { theme } from "../../infrastructure/theme";
import { Text } from "../../infrastructure/typography/text.component";
import { Spacer } from "../../global_components/optimized.spacer.component";
import { GeneralFlexContainer } from "../../global_components/containers/general_flex_container";
import { InfoDetailsTile } from "../../global_components/organisms/tiles/info_details_tile";
import { ControlledContainer } from "../../global_components/containers/controlled_container";
import { DescriptionTile } from "../../global_components/organisms/tiles/description_tile";
import { RegularCTAButton } from "../../global_components/buttons/cta_btn";
import { useAnyTransactionDetailsLogic } from "../../hooks/useAnyTransactionDetailsLogic";
import { useMonthPadLogic } from "../../hooks/useMonthPadLogic";

export const AnyTransactionDetailsView = ({ navigation, route }) => {
  // ****************LOGIC FROM HOOK ********
  const {
    navigationLogic,
    stringedAmount,
    transaction_date,
    short_name,
    description,
    isLoading,
  } = useAnyTransactionDetailsLogic();

  const {
    movingForwardToAddDescription,
    movingForwardToSelectCategoryView,
    movingForwardToGeneralCalendarView,
    movingForwardToDeleteConfirmationView,
    updatingTransactionProcess,
    closingMenu,
  } = navigationLogic();

  return (
    <GeneralFlexContainer color={theme.colors.bg.p_FFFFFF}>
      <TwoIconsHeaderComponent
        navigation={navigation}
        direction={"row"}
        color={theme.colors.bg.p_FFFFFF}
        // color={"#FAA"}
        flexibility={0.12}
        action_icon_right={() =>
          movingForwardToDeleteConfirmationView(
            navigation,
            "Delete_confirmation_view"
            // transaction_id
          )
        }
        action_icon_left={() => closingMenu(navigation)}
        icon_name_right={"RemoveIcon"}
        icon_name_left={"ExitIcon"}
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
            <Text text_variant="bold_text_20">Transaction info</Text>
          </Spacer>
        </ControlledContainer>
      </ControlledContainer>

      <FlexibleContainer
        color={theme.colors.bg.e_F4F4F4}
        // color={"lightblue"}
        direction="column"
        // flexibility={description ? 0.46 : 0.53}
        // flexibility={description ? 0.46 : 0.98}
        flexibility={0.55}
        justify={"center"}
        isBordered={false}
      >
        <InfoDetailsTile
          caption={"Amount:"}
          caption2={`$${stringedAmount}`}
          navigation={navigation}
          icon_name={"EditIcon"}
          active_icon={true}
          action={() => {
            navigation.navigate("Enter_amount_view", {
              comingFrom: "AnyTransactionDetailsView",
            });
          }}
          icon_width={25}
          icon_height={25}
        />
        <InfoDetailsTile
          caption={"Category:"}
          caption2={short_name}
          navigation={navigation}
          icon_name={"EditIcon"}
          active_icon={true}
          action={() =>
            movingForwardToSelectCategoryView(
              navigation,
              "General_select_category_view",
              "AnyTransactionDetailsView"
            )
          }
          icon_width={25}
          icon_height={25}
        />
        <InfoDetailsTile
          caption={"Exp. date:"}
          caption2={transaction_date}
          navigation={navigation}
          icon_name={"CalendarIcon"}
          active_icon={true}
          icon_width={25}
          icon_height={25}
          action={() =>
            movingForwardToGeneralCalendarView(
              navigation,
              "General_calendar_view",
              "AnyTransactionDetailsView"
            )
          }
        />

        <DescriptionTile
          width="100%"
          heigh="50%"
          description={description}
          action={() =>
            movingForwardToAddDescription(
              navigation,
              "General_AddDescription_view",
              "AnyTransactionDetailsView"
            )
          }
        />
      </FlexibleContainer>
      <FlexibleContainer
        color={theme.colors.bg.p_FFFFFF}
        // color={"brown"}
        direction="column"
        // flexibility={description ? 0.46 : 0.53}
        flexibility={0.2}
        justify={"center"}
        isBordered={false}
      >
        <RegularCTAButton
          caption="Update"
          width={310}
          height={50}
          color={theme.colors.buttons.p_FC9827}
          borderRadius={50}
          action={() => updatingTransactionProcess(navigation)}
          // action={() => null}
          text_variant="bold_text_20"
          isLoading={isLoading}
        />
      </FlexibleContainer>
    </GeneralFlexContainer>
  );
};
