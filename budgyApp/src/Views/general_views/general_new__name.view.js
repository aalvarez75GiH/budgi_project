import React, { useState, useContext, useEffect } from "react";
import { Platform, View } from "react-native";

import { SafeArea } from "../../global_components/safe-area.component";
import { BackHeaderWithLabelAndCancelButton } from "../../global_components/organisms/headers/back_header+label+cancel.header";
import { BackHeaderWithLabelComponent } from "../../global_components/organisms/headers/back_header_withLabel.component";
import { BackHeaderComponent } from "../../global_components/organisms/headers/back_header.component";
import { Spacer } from "../../global_components/optimized.spacer.component";
import { theme } from "../../infrastructure/theme";
import { FlexibleContainer } from "../../global_components/containers/flexible_container";
import { GeneralFlexContainer } from "../../global_components/containers/general_flex_container";
import { LinkButton } from "../../global_components/buttons/link_button";
import { TextFormInputComponent } from "../../global_components/organisms/inputs/textFormInput.component";
import { RegularCTAButton } from "../../global_components/buttons/cta_btn";
import { Text } from "../../infrastructure/typography/text.component";
import { ControlledContainer } from "../../global_components/containers/controlled_container";

import { CategoryListContext } from "../../infrastructure/services/category_list/category_list.context";
import { HomeContext } from "../../infrastructure/services/Home services/home.context";

export const GeneralNewNameView = ({ navigation, route }) => {
  // const { action_to_do } = route.params;
  const {
    updateBillName,
    updateBillInfoForRequest,
    setUpdateBillName,
    settingNewBillName,
    action_to_do,
    newBillName,
    setNewBillName,
    createBillInfoForRequest,
  } = useContext(HomeContext);
  const { type: bill_type, bill_short_name } = updateBillInfoForRequest;
  console.log(
    " UPDATE BILL INFO FOR REQUEST AT GENERAL NEW NAME VIEW:",
    JSON.stringify(updateBillInfoForRequest, null, 2)
  );
  console.log(
    " CREATE BILL INFO FOR REQUEST AT GENERAL NEW NAME VIEW:",
    JSON.stringify(createBillInfoForRequest, null, 2)
  );

  const {
    new_category_name,
    set_new_category_name,
    update_category_name,
    set_update_category_name,
    settingNewCategoryName,
    category_list_info_forUpdate,
    categoryListContextStateReset,
  } = useContext(CategoryListContext);
  const { type, new_short_name } = category_list_info_forUpdate;
  useEffect(() => {
    return () => categoryListContextStateReset();
  }, []);
  // console.log(
  //   "CATEGORY LIST INFO FOR UPDATE AT GENERAL NEW NAME VIEW:",
  //   JSON.stringify(category_list_info_forUpdate, null, 2)
  // );
  // const new_category_name = category_list_info_forUpdate.new_category_name;
  // console.log(
  //   "CATEGORY TO UPDATE NAME AT GENERAL VIEW:",
  //   JSON.stringify(update_category_name, null, 2)
  // );
  // console.log(
  //   "CATEGORY TO CREATE NAME AT GENERAL VIEW:",
  //   JSON.stringify(new_category_name, null, 2)
  // );
  console.log("ACTION TO DO:", action_to_do);

  return (
    <SafeArea background_color={"#FFFFFF"}>
      <GeneralFlexContainer>
        <BackHeaderComponent
          navigation={navigation}
          color={theme.colors.bg.p_FFFFFF}
          // color={"#FAA"}
          // action={() => clearingCategoryNameAndBack(navigation)}
          action={() => navigation.goBack()}
          align="flex-end"
          flexibility={0.08}
        />
        {action_to_do === "new_expense_category" && (
          <>
            <FlexibleContainer
              direction={"column"}
              color={theme.colors.bg.p_FFFFFF}
              // color={"lightblue"}
              // flexibility={Platform.OS === "ios" ? 0.25 : 0.3}
              flexibility={Platform.OS === "ios" ? 0.25 : 0.5}
              justify={"center"}
            >
              <Spacer position="top" size="xxl" />
              <Spacer position="top" size="xxl" />

              <TextFormInputComponent
                set_text_input_value={set_new_category_name}
                text_input_value={new_category_name}
                type={"by_user"}
                caption={"Category name"}
              />

              <ControlledContainer
                width={"100%"}
                height={"50%"}
                justify="center"
                alignment="center"
                direction="column"
                // color="red"
              >
                {new_category_name.length > 0 && (
                  <LinkButton
                    caption="Clear"
                    action={() => {
                      set_new_category_name("");
                    }}
                  />
                )}
              </ControlledContainer>
            </FlexibleContainer>
            <FlexibleContainer
              direction={"column"}
              color={theme.colors.bg.p_FFFFFF}
              // color={"brown"}
              flexibility={Platform.OS === "ios" ? 0.3 : 0.45}
              justify={"center"}
              alignment={"center"}
            >
              {new_category_name.length > 0 ? (
                <RegularCTAButton
                  caption="Next"
                  width={310}
                  height={50}
                  color={theme.colors.buttons.p_FC9827}
                  borderRadius={50}
                  action={() =>
                    settingNewCategoryName(
                      navigation,
                      new_category_name,
                      "by_user",
                      ""
                    )
                  }
                  text_variant="bold_text_20"
                />
              ) : null}
              <Spacer position="top" size="large" />
            </FlexibleContainer>
          </>
        )}
        {action_to_do === "update_expense_category" && (
          <>
            <FlexibleContainer
              direction={"column"}
              color={theme.colors.bg.p_FFFFFF}
              // color={"brown"}
              // flexibility={Platform.OS === "ios" ? 0.25 : 0.3}
              flexibility={Platform.OS === "ios" ? 0.25 : 0.5}
              justify={"center"}
            >
              <Spacer position="top" size="xxl" />
              <Spacer position="top" size="xxl" />
              <TextFormInputComponent
                set_text_input_value={set_update_category_name}
                text_input_value={update_category_name}
                type={"by_user"}
                caption={"Category name"}
              />
              {update_category_name.length > 0 && (
                <LinkButton
                  caption="Clear"
                  action={() => {
                    set_update_category_name("");
                  }}
                />
              )}
            </FlexibleContainer>
            <FlexibleContainer
              direction={"column"}
              color={theme.colors.bg.p_FFFFFF}
              // color={"brown"}
              flexibility={Platform.OS === "ios" ? 0.3 : 0.55}
              justify={"center"}
              alignment={"center"}
            >
              {update_category_name.length > 0 ? (
                <RegularCTAButton
                  caption="Next"
                  width={310}
                  height={50}
                  color={theme.colors.buttons.p_FC9827}
                  borderRadius={50}
                  action={() =>
                    settingNewCategoryName(
                      navigation,
                      update_category_name,
                      type,
                      new_short_name
                    )
                  }
                  text_variant="bold_text_20"
                />
              ) : null}
              <Spacer position="top" size="large" />
            </FlexibleContainer>
          </>
        )}
        {action_to_do === "update_bill" && (
          <>
            <FlexibleContainer
              direction={"column"}
              color={theme.colors.bg.p_FFFFFF}
              // color={"brown"}
              // flexibility={Platform.OS === "ios" ? 0.25 : 0.3}
              flexibility={Platform.OS === "ios" ? 0.25 : 0.5}
              justify={"center"}
            >
              <Spacer position="top" size="xxl" />
              <Spacer position="top" size="xxl" />
              <TextFormInputComponent
                set_text_input_value={setUpdateBillName}
                text_input_value={updateBillName}
                type={bill_type}
                caption={"Bill name"}
              />

              {updateBillName.length > 0 && (
                <LinkButton
                  caption="Clear"
                  action={() => {
                    setUpdateBillName("");
                  }}
                />
              )}
            </FlexibleContainer>
            <FlexibleContainer
              direction={"column"}
              color={theme.colors.bg.p_FFFFFF}
              // color={"brown"}
              flexibility={Platform.OS === "ios" ? 0.3 : 0.55}
              justify={"center"}
              alignment={"center"}
            >
              {updateBillName.length > 0 ? (
                <RegularCTAButton
                  caption="Next"
                  width={310}
                  height={50}
                  color={theme.colors.buttons.p_FC9827}
                  borderRadius={50}
                  action={() =>
                    settingNewBillName(
                      navigation,
                      updateBillName,
                      bill_type,
                      bill_short_name
                    )
                  }
                  text_variant="bold_text_20"
                />
              ) : null}
              <Spacer position="top" size="large" />
            </FlexibleContainer>
          </>
        )}
        {action_to_do === "create_bill" && (
          <>
            <FlexibleContainer
              direction={"column"}
              color={theme.colors.bg.p_FFFFFF}
              // color={"brown"}
              // flexibility={Platform.OS === "ios" ? 0.25 : 0.3}
              flexibility={Platform.OS === "ios" ? 0.25 : 0.5}
              justify={"center"}
            >
              <Spacer position="top" size="xxl" />
              <Spacer position="top" size="xxl" />
              <TextFormInputComponent
                set_text_input_value={setNewBillName}
                text_input_value={newBillName}
                type={"by_user"}
                caption={"Bill name"}
              />
              {newBillName.length > 0 && (
                <LinkButton
                  caption="Clear"
                  action={() => {
                    setNewBillName("");
                  }}
                />
              )}
            </FlexibleContainer>
            <FlexibleContainer
              direction={"column"}
              color={theme.colors.bg.p_FFFFFF}
              // color={"brown"}
              flexibility={Platform.OS === "ios" ? 0.3 : 0.55}
              justify={"center"}
              alignment={"center"}
            >
              {newBillName.length > 0 ? (
                <RegularCTAButton
                  caption="Next"
                  width={310}
                  height={50}
                  color={theme.colors.buttons.p_FC9827}
                  borderRadius={50}
                  action={() =>
                    settingNewBillName(navigation, newBillName, "by_user", "")
                  }
                  text_variant="bold_text_20"
                />
              ) : null}
              <Spacer position="top" size="large" />
            </FlexibleContainer>
          </>
        )}
      </GeneralFlexContainer>
    </SafeArea>
  );
};
