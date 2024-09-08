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
import { useEnterAmountLogic } from "../../hooks/useEnterAmountLogic";
import { DoneHeaderComponent } from "../../global_components/organisms/headers/done_heaer.component";
import { SVGComponent } from "../../global_components/image_components/svg.component";
import { useSVGComponent } from "../../util/system_icons.hook";

import { CategoryListContext } from "../../infrastructure/services/category_list/category_list.context";
import { DateOperationsContext } from "../../infrastructure/services/date_operations/date_operations.context";

export const NewOrUpdateCategoryConfirmationView = ({ navigation }) => {
  // ****************LOGIC FROM HOOK ********
  const {
    category_list_info_forRequest,
    category_list_info_forUpdate,
    resettingInfoForRequestsAndMovingToBudgets,
    // resettingCategoryListInfoForRequest,
    goingHome,
    action_to_do,
    movingBackToHome,
  } = useContext(CategoryListContext);
  console.log(
    "CATEGORY LIST INFO FOR REQUEST AT SUMMARY VIEW:",
    JSON.stringify(category_list_info_forRequest, null, 2)
  );
  const { new_expense_category_node } = category_list_info_forRequest;
  const { category_name, limit_amount } = new_expense_category_node;

  const { expenseDate } = useContext(DateOperationsContext);
  const { amountToSet } = useEnterAmountLogic();

  const { new_category_name, new_limit_amount } = category_list_info_forUpdate;

  useEffect(() => {
    return () => {
      movingBackToHome(navigation);
    };
  }, []);

  return (
    <GeneralFlexContainer color={theme.colors.bg.p_FFFFFF}>
      {action_to_do === "new_expense_category" && (
        <>
          <>
            <FlexibleContainer
              color={theme.colors.bg.p_FFFFFF}
              // color={"lightblue"}
              direction="column"
              flexibility={Platform.OS === "android" ? 0.15 : 0.15}
              justify={"flex-end"}
              isBordered={false}
            >
              <Text text_variant="bold_text_20">Category created done!</Text>
              {/* <Text text_variant="bold_text_20">Transaction update done!</Text> */}
            </FlexibleContainer>
            <FlexibleContainer
              color={theme.colors.bg.p_FFFFFF}
              // color={"lightblue"}
              direction="column"
              flexibility={Platform.OS === "android" ? 0.45 : 0.4}
              justify={"center"}
              isBordered={false}
            >
              <SVGComponent
                icon_width={160}
                icon_height={160}
                position={"static"}
                justify={"center"}
                icon_name={"SuccessIlustration"}
                icon_color={theme.colors.buttons.s_142223C}
              />
            </FlexibleContainer>
            <FlexibleContainer
              color={theme.colors.bg.e_F4F4F4}
              //color={"lightblue"}
              direction="column"
              flexibility={Platform.OS === "android" ? 0.37 : 0.3}
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
            </FlexibleContainer>
            <FlexibleContainer
              color={theme.colors.bg.p_FFFFFF}
              // color={"brown"}
              direction="column"
              flexibility={0.3}
              justify={"center"}
              isBordered={false}
            >
              <RegularCTAButton
                caption="Done"
                width={310}
                height={50}
                color={theme.colors.ui.success}
                borderRadius={50}
                action={() => movingBackToHome(navigation)}
                text_variant="white_bold_text_16"
              />
            </FlexibleContainer>
          </>

          {/* <ControlledContainer
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
                <Text text_variant="bold_text_20">Updated successfully</Text>
              </Spacer>
            </ControlledContainer>
          </ControlledContainer>

          <FlexibleContainer
            color={theme.colors.bg.e_F4F4F4}
            //color={"lightblue"}
            direction="column"
            // flexibility={description ? 0.46 : 0.53}
            // flexibility={description ? 0.46 : 0.98}
            flexibility={Platform.OS === "android" ? 0.45 : 0.4}
            justify={"center"}
            isBordered={false}
          >
            <InfoDetailsTile
              caption={"Amount:"}
              //   caption2={`$${stringedAmount}`}
              //   caption2={`$${limit_amount}`}
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
            // flexibility={description ? 0.46 : 0.53}
            flexibility={0.45}
            justify={"center"}
            isBordered={false}
          >
            <RegularCTAButton
              caption="Done"
              width={290}
              height={60}
              color={theme.colors.ui.success}
              borderRadius={50}
              action={() => movingBackToHome(navigation)}
              text_variant="white_bold_text_16"
            />
          </FlexibleContainer> */}
        </>
      )}
      {action_to_do === "update_expense_category" && (
        <>
          <FlexibleContainer
            color={theme.colors.bg.p_FFFFFF}
            // color={"lightblue"}
            direction="column"
            flexibility={Platform.OS === "android" ? 0.15 : 0.15}
            justify={"flex-end"}
            isBordered={false}
          >
            <Text text_variant="bold_text_20">Category update done!</Text>
            {/* <Text text_variant="bold_text_20">Transaction update done!</Text> */}
          </FlexibleContainer>
          <FlexibleContainer
            color={theme.colors.bg.p_FFFFFF}
            // color={"lightblue"}
            direction="column"
            flexibility={Platform.OS === "android" ? 0.45 : 0.4}
            justify={"center"}
            isBordered={false}
          >
            <SVGComponent
              icon_width={160}
              icon_height={160}
              position={"static"}
              justify={"center"}
              icon_name={"SuccessIlustration"}
              icon_color={theme.colors.buttons.s_142223C}
            />
          </FlexibleContainer>
          <FlexibleContainer
            color={theme.colors.bg.e_F4F4F4}
            //color={"lightblue"}
            direction="column"
            flexibility={Platform.OS === "android" ? 0.37 : 0.3}
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
              //   caption2={category_name}
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
          </FlexibleContainer>
          <FlexibleContainer
            color={theme.colors.bg.p_FFFFFF}
            // color={"brown"}
            direction="column"
            flexibility={0.3}
            justify={"center"}
            isBordered={false}
          >
            <RegularCTAButton
              caption="Done"
              width={310}
              height={50}
              color={theme.colors.ui.success}
              borderRadius={50}
              action={() => movingBackToHome(navigation)}
              text_variant="white_bold_text_16"
            />
          </FlexibleContainer>
        </>
      )}
    </GeneralFlexContainer>
  );
};
