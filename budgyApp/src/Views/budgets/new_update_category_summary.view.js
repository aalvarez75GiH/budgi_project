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

export const NewOrUpdateCategorySummaryView = ({ navigation, route }) => {
  const { comingFrom } = route.params;
  // ****************LOGIC FROM HOOK ********
  const {
    category_list_info_forRequest,
    category_list_info_forUpdate,
    resettingInfoForRequestsAndMovingToBudgets,
    isLoading,
    registeringNewExpenseCategory,
    updatingExpenseCategory,
  } = useContext(CategoryListContext);
  const { action_to_do } = useContext(HomeContext);
  console.log(
    "CATEGORY LIST INFO FOR REQUEST AT SUMMARY VIEW:",
    JSON.stringify(category_list_info_forRequest, null, 2)
  );
  const { new_expense_category_node } = category_list_info_forRequest;
  const { category_name, limit_amount } = new_expense_category_node;
  console.log(
    "CATEGORY LIST INFO FOR UPDATE AT SUMMARY VIEW:",
    JSON.stringify(category_list_info_forUpdate, null, 2)
  );

  const { new_category_name, new_limit_amount } = category_list_info_forUpdate;

  const { expenseDate } = useContext(DateOperationsContext);
  console.log("ACTION TO DO AT SUMMARY VIEW:", action_to_do);
  return action_to_do === "new_expense_category" ? (
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
            <Text text_variant="bold_text_20">Summary</Text>
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
          }).format(limit_amount)}
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
          caption2={category_name}
          navigation={navigation}
          icon_name={"EditIcon"}
          active_icon={true}
          action={() => null}
          icon_width={0}
          icon_height={0}
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
        <InfoDetailsTile
          caption={"Desc:"}
          caption2={"New category"}
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
          action={() => registeringNewExpenseCategory(navigation)}
          text_variant="bold_text_20"
          isLoading={isLoading}
        />
      </FlexibleContainer>
    </GeneralFlexContainer>
  ) : (
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
            <Text text_variant="bold_text_20">Summary</Text>
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
          }).format(new_limit_amount)}
          navigation={navigation}
          icon_name={"EditIcon"}
          active_icon={true}
          action={() => null}
          icon_width={0}
          icon_height={0}
        />
        <InfoDetailsTile
          caption={"Category:"}
          caption2={new_category_name}
          navigation={navigation}
          icon_name={"EditIcon"}
          active_icon={true}
          action={() => null}
          icon_width={0}
          icon_height={0}
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
        <InfoDetailsTile
          caption={"Desc:"}
          caption2={"Update category"}
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
          caption="Update category"
          width={310}
          height={50}
          color={theme.colors.buttons.p_FC9827}
          borderRadius={50}
          action={() => updatingExpenseCategory(navigation)}
          text_variant="bold_text_20"
          isLoading={isLoading}
        />
      </FlexibleContainer>
    </GeneralFlexContainer>
  );
};
