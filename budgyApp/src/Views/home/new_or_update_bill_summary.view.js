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
import { HomeContext } from "../../infrastructure/services/Home services/home.context";

export const NewOrUpdateBillSummaryView = ({ navigation, route }) => {
  //   const { comingFrom } = route.params;

  const {
    action_to_do,
    updateBillInfoForRequest,
    createBillInfoForRequest,
    updatingBillListByUserId,
    isLoadingBillRequest,
    creatingBillAtListByUserId,
  } = useContext(HomeContext);

  const { bill_amount, bill_title, payment_date } = updateBillInfoForRequest;
  const {
    bill_amount: create_bill_amount,
    bill_title: create_bill_title,
    payment_date: create_payment_date,
  } = createBillInfoForRequest;

  console.log(
    "UPDATE BILL INFO FOR REQUEST AT SUMMARY VIEW:",
    JSON.stringify(updateBillInfoForRequest, null, 2)
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
          resettingInfoForRequestsAndMovingToBudgets(navigation)
        }
        action_icon_left={() => navigation.goBack()}
        icon_name_left={"LeftArrowIcon"}
        icon_name_right={"ExitIcon"}
        icon_top_left={"0%"}
        icon_left_left={"2%"}
        icon_top_right={"0%"}
        icon_left_right={"80%"}
        icon_left_size={23}
        icon_right_size={23}
      />
      {action_to_do === "create_bill" && (
        <>
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
                <Text text_variant="bold_text_20">Creation bill summary</Text>
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
              caption={"Amount:"}
              caption2={new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(create_bill_amount)}
              navigation={navigation}
              icon_name={"EditIcon"}
              active_icon={true}
              action={() => null}
              icon_width={0}
              icon_height={0}
            />
            <InfoDetailsTile
              caption={"Category:"}
              //   caption2={category_name}
              caption2={create_bill_title}
              navigation={navigation}
              icon_name={"EditIcon"}
              active_icon={true}
              action={() => null}
              icon_width={0}
              icon_height={0}
            />
            <InfoDetailsTile
              caption={"Date:"}
              caption2={create_payment_date}
              navigation={navigation}
              icon_name={"CalendarIcon"}
              active_icon={true}
              icon_width={0}
              icon_height={0}
              action={() => null}
            />
            <InfoDetailsTile
              caption={"Desc:"}
              caption2={"Creating a bill"}
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
              caption="Create category"
              width={310}
              height={50}
              color={theme.colors.buttons.p_FC9827}
              borderRadius={50}
              action={() => creatingBillAtListByUserId(navigation)}
              text_variant="bold_text_20"
              isLoading={isLoadingBillRequest}
            />
          </FlexibleContainer>
        </>
      )}
      {action_to_do === "update_bill" && (
        <>
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
                <Text text_variant="bold_text_20">Update bill summary</Text>
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
              caption={"Amount:"}
              caption2={new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(bill_amount)}
              navigation={navigation}
              icon_name={"EditIcon"}
              active_icon={true}
              action={() => null}
              icon_width={0}
              icon_height={0}
            />
            <InfoDetailsTile
              caption={"Bill:"}
              caption2={bill_title}
              navigation={navigation}
              icon_name={"EditIcon"}
              active_icon={true}
              action={() => null}
              icon_width={0}
              icon_height={0}
            />
            <InfoDetailsTile
              caption={"Due date:"}
              caption2={payment_date}
              navigation={navigation}
              icon_name={"CalendarIcon"}
              active_icon={true}
              icon_width={0}
              icon_height={0}
              action={() => null}
            />
            <InfoDetailsTile
              caption={"Desc:"}
              caption2={"Updating a bill"}
              navigation={navigation}
              icon_name={""}
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
              caption="Update bill"
              width={310}
              height={50}
              color={theme.colors.buttons.p_FC9827}
              borderRadius={50}
              action={() => updatingBillListByUserId(navigation)}
              text_variant="bold_text_20"
              isLoading={isLoadingBillRequest}
            />
          </FlexibleContainer>
        </>
      )}
    </GeneralFlexContainer>
  );
};
