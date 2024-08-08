import React, { useState, useContext } from "react";
import { Platform } from "react-native";

import { SafeArea } from "../../global_components/safe-area.component";
import { BackHeaderWithLabelAndCancelButton } from "../../global_components/organisms/headers/back_header+label+cancel.header";
import { BackHeaderWithLabelComponent } from "../../global_components/organisms/headers/back_header_withLabel.component";
import { BackHeaderComponent } from "../../global_components/organisms/headers/back_header.component";
import { Spacer } from "../../global_components/optimized.spacer.component";
import { theme } from "../../infrastructure/theme";
import { FlexibleContainer } from "../../global_components/containers/flexible_container";
import { GeneralFlexContainer } from "../../global_components/containers/general_flex_container";

import { TextFormInputComponent } from "../../global_components/organisms/inputs/textFormInput.component";
import { RegularCTAButton } from "../../global_components/buttons/cta_btn";

import { CategoryListContext } from "../../infrastructure/services/category_list/category_list.context";

export const GeneralNewNameView = ({ navigation, route }) => {
  // const { action_to_do } = route.params;

  // console.log("ACTION TO DO AT EXPENSE CATEGORY NAME VIEW:", action_to_do);
  // const [categoryName, setCategoryName] = useState("");
  const {
    clearingCategoryNameAndBack,
    category_list_info_forRequest,
    text_input_value,
    set_text_input_value,

    settingNewCategoryName,
    category_list_info_forUpdate,
  } = useContext(CategoryListContext);
  // const { new_category_name } = category_list_info_forUpdate;

  console.log(
    "CATEGORY LIST INFO FOR UPDATE AT GENERAL NEW NAME VIEW:",
    JSON.stringify(category_list_info_forUpdate, null, 2)
  );
  const new_category_name = category_list_info_forUpdate.new_category_name;
  console.log(
    "CATEGORY TO UPDATE NAME AT GENERAL VIEW:",
    JSON.stringify(new_category_name, null, 2)
  );
  console.log(
    "CATEGORY TO CREATE NAME AT GENERAL VIEW:",
    JSON.stringify(text_input_value, null, 2)
  );
  // console.log("CATEGORY LIST INFO FOR REQUEST:", category_list_info_forRequest);

  return (
    <SafeArea background_color={"#FFFFFF"}>
      <GeneralFlexContainer>
        <BackHeaderComponent
          navigation={navigation}
          color={theme.colors.bg.p_FFFFFF}
          // color={"#FAA"}
          action={() => clearingCategoryNameAndBack(navigation)}
          align="flex-end"
          flexibility={0.08}
        />
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
            set_text_input_value={set_text_input_value}
            new_category_name={
              new_category_name !== "" ? new_category_name : text_input_value
            }
          />
        </FlexibleContainer>
        <FlexibleContainer
          direction={"column"}
          color={theme.colors.bg.p_FFFFFF}
          // color={"brown"}
          flexibility={Platform.OS === "ios" ? 0.3 : 0.55}
          justify={"center"}
          alignment={"center"}
        >
          {text_input_value.length > 0 ? (
            <RegularCTAButton
              caption="Next"
              width={310}
              height={50}
              color={theme.colors.buttons.p_FC9827}
              borderRadius={50}
              action={() =>
                settingNewCategoryName(text_input_value, navigation)
              }
              text_variant="bold_text_20"
            />
          ) : null}
          <Spacer position="top" size="large" />
        </FlexibleContainer>
      </GeneralFlexContainer>
    </SafeArea>
  );
};
