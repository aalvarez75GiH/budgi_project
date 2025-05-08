import React, { useContext } from "react";

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
import { SVGComponent } from "../../global_components/image_components/svg.component";
import { InformationTileComponent } from "../../global_components/organisms/tiles/information_tile";

import { TransactionsContext } from "../../infrastructure/services/transactions/transactions.context";
export const AnyTransactionDetailsView = ({ navigation, route }) => {
  const { comingFrom } = route.params;
  // ****************LOGIC FROM HOOK ********
  const {
    navigationLogic,
    stringedAmount,
    transaction_date,
    short_name,
    description,
    isLoading,
    readyToUpdate,
    updatingTransactionProcess,
    category_status,
  } = useAnyTransactionDetailsLogic();
  const { transactionInfoForUpdate } = useContext(TransactionsContext);
  const {
    movingForwardToAddDescription,
    movingForwardToSelectCategoryView,
    movingForwardToGeneralCalendarView,
    movingForwardToDeleteConfirmationView,
  } = navigationLogic();
  console.log("CATEGORY STATUS AT VIEW:", category_status);
  console.log(
    "TRANSACTION INFO FOR UPDATE AT VIEW:",
    JSON.stringify(transactionInfoForUpdate, null, 2)
  );
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
            "Delete_confirmation_view",
            comingFrom
            // transaction_id
          )
        }
        action_icon_left={() => navigation.goBack()}
        icon_name_right={"RemoveIcon"}
        icon_name_left={"ExitIcon"}
        icon_top_left={"0%"}
        icon_left_left={"2%"}
        icon_top_right={"0%"}
        icon_left_right={"80%"}
        status={category_status}
        icon_left_size={23}
        icon_right_size={23}
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
            if (category_status === "active") {
              navigation.navigate("Enter_amount_view", {
                comingFrom: "AnyTransactionDetailsView",
              });
            }
          }}
          icon_width={25}
          icon_height={25}
          category_status={category_status}
        />
        <InfoDetailsTile
          caption={"Category:"}
          caption2={short_name}
          navigation={navigation}
          icon_name={"EditIcon"}
          active_icon={true}
          action={() => {
            if (category_status === "active") {
              movingForwardToSelectCategoryView(
                navigation,
                "General_select_category_view",
                "AnyTransactionDetailsView"
              );
            }
          }}
          icon_width={25}
          icon_height={25}
          category_status={category_status}
        />
        <InfoDetailsTile
          caption={"Exp. date:"}
          caption2={transaction_date}
          navigation={navigation}
          icon_name={"CalendarIcon"}
          active_icon={true}
          icon_width={25}
          icon_height={25}
          action={() => {
            if (category_status === "active") {
              movingForwardToGeneralCalendarView(
                navigation,
                "General_calendar_view",
                "AnyTransactionDetailsView"
              );
            }
          }}
          category_status={category_status}
        />

        <DescriptionTile
          width="100%"
          heigh="50%"
          description={description}
          category_status={category_status}
          action={() =>
            movingForwardToAddDescription(
              navigation,
              "General_AddDescription_view",
              "AnyTransactionDetailsView"
            )
          }
        />
      </FlexibleContainer>

      {category_status === "suspended" && (
        <InformationTileComponent caption="This transaction belongs to a suspended category. It can not be deleted or updated" />
      )}

      <FlexibleContainer
        color={theme.colors.bg.p_FFFFFF}
        // color={"brown"}
        direction="column"
        flexibility={0.2}
        justify={"center"}
        isBordered={false}
      >
        {readyToUpdate && (
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
        )}
      </FlexibleContainer>
    </GeneralFlexContainer>
  );
};
