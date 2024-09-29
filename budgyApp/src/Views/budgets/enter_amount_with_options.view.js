import React, { useContext, useEffect } from "react";
import { Platform } from "react-native";

import { SafeArea } from "../../global_components/safe-area.component";
import { BackHeaderWithLabelAndCancelButton } from "../../global_components/organisms/headers/back_header+label+cancel.header";
import { Spacer } from "../../global_components/optimized.spacer.component";
import { theme } from "../../infrastructure/theme";
import { FlexibleContainer } from "../../global_components/containers/flexible_container";
import { GeneralFlexContainer } from "../../global_components/containers/general_flex_container";

import { Text } from "../../infrastructure/typography/text.component";
import { ControlledContainer } from "../../global_components/containers/controlled_container";
import { AmountFormInput } from "../../global_components/inputs/amount_formInput";
import { RegularCTAButton } from "../../global_components/buttons/cta_btn";
import { SVGComponent } from "../../global_components/image_components/svg.component";
import { ClickableControlledContainer } from "../../global_components/containers/clickable_controlled_container";
import { useEnterAmountLogic } from "../../hooks/useEnterAmountLogic";
import { CategoryListContext } from "../../infrastructure/services/category_list/category_list.context";

export const EnterAmountWithOptionsView = ({ navigation, route }) => {
  const { comingFrom } = route.params;
  const {
    cta_action,
    setAmountToSet,
    amountToSet,
    clearingText,
    formatCurrency,
    exitingToRoot,
  } = useEnterAmountLogic(comingFrom);
  useEffect(() => {
    console.log(" I AM ENTER AMOUNT WITH OPTIONS ");
  }, []);
  const { category_list_info_forRequest, category_list_info_forUpdate } =
    useContext(CategoryListContext);
  console.log("AMOUNT TO SET AT ENTER AMOUNT VIEW WITH OPTIONS:", amountToSet);
  console.log("COMING FROM AT ENTER AMOUNT VIEW:", comingFrom);
  console.log(
    "CATEGORY LIST INFO FOR REQUEST AT GENERAL VIEW:",
    JSON.stringify(category_list_info_forRequest, null, 2)
  );
  console.log(
    "CATEGORY LIST INFO FOR UPDATE AT ENTER AMOUNT WITH OPTIONS VIEW:",
    JSON.stringify(category_list_info_forUpdate, null, 2)
  );

  return (
    <SafeArea background_color={"#FFFFFF"}>
      <GeneralFlexContainer>
        <BackHeaderWithLabelAndCancelButton
          caption=""
          direction={"row"}
          color={theme.colors.bg.p_FFFFFF}
          flexibility={0.08}
          arrow_left_action={() => navigation.goBack()}
          // cancel_button_action={() => navigation.popToTop()}
          cancel_button_action={() => exitingToRoot(navigation)}
          align={"center"}
          // color={"#FAA"}
        />
        <FlexibleContainer
          direction={"column"}
          color={theme.colors.bg.p_FFFFFF}
          // color={"brown"}
          flexibility={Platform.OS === "ios" ? 0.25 : 0.3}
          justify={"center"}
        >
          <Spacer position="top" size="xxl" />
          <Spacer position="top" size="xxl" />
          <ControlledContainer
            width={"100%"}
            height={"16%"}
            justify="center"
            alignment="center"
            // color="red"
          >
            {/* <Text text_variant="dark_bold_caption_20">Enter Amount</Text> */}
            <Text text_variant="bold_text_20">Enter Amount</Text>
          </ControlledContainer>
          <ControlledContainer
            width={"100%"}
            height={"50%"}
            justify="center"
            alignment="center"
            direction="row"
            // color="lightblue"
          >
            <ControlledContainer
              width={"80%"}
              height={"50%"}
              justify="center"
              alignment="center"
              direction="row"
            >
              <Spacer position="left" size="xxl" />
              <Spacer position="left" size="medium" />
              <AmountFormInput
                width={"75%"}
                height={"50px"}
                color={theme.colors.bg.p_FFFFFF}
                mode="flat"
                placeholder={"$0"}
                font_size={theme.fontSizes.text_32}
                onChangeText={(value) => formatCurrency(value)}
                value={amountToSet}
                style={{
                  fontFamily: theme.fonts.bold,
                  justifyContent: "center",
                  alignItems: "center",
                  borderBottomWidth: 0.3,
                  borderBottomColor: theme.colors.neutrals.p_B7B7B7,
                }}
                underlineColor={theme.colors.neutrals.p_B7B7B7}
                activeUnderlineColor={theme.colors.neutrals.p_B7B7B7}
                keyboardType={Platform.OS === "ios" ? "number-pad" : "numeric"}
                onFocus={() => setAmountToSet(0)}
                textBreakStrategy="simple"
              />
              <ClickableControlledContainer
                width={"17%"}
                height={"80%"}
                justify="center"
                alignment="center"
                direction="row"
                // color="red"
                onPress={clearingText}
              >
                <SVGComponent
                  icon_width={30}
                  icon_height={30}
                  position={"static"}
                  left={"0%"}
                  top={"0%"}
                  justify={"center"}
                  icon_name={"ClearTextIcon"}
                  icon_color={theme.colors.neutrals.s_898989}
                />
              </ClickableControlledContainer>
            </ControlledContainer>
          </ControlledContainer>
        </FlexibleContainer>
        <FlexibleContainer
          direction={"column"}
          color={theme.colors.bg.p_FFFFFF}
          // color={"lightblue"}
          flexibility={Platform.OS === "ios" ? 0.33 : 0.55}
          justify={"flex-end"}
          alignment={"center"}
        >
          {amountToSet.length > 0 ? (
            <RegularCTAButton
              caption="Set Amount"
              width={310}
              height={50}
              color={theme.colors.buttons.p_FC9827}
              borderRadius={50}
              action={() => cta_action(navigation, comingFrom)}
              text_variant="bold_text_20"
            />
          ) : null}
          <Spacer position="top" size="large" />
        </FlexibleContainer>
      </GeneralFlexContainer>
    </SafeArea>
  );
};
