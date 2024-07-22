import React, { useState } from "react";
import { Platform } from "react-native";

import { SafeArea } from "../../global_components/safe-area.component";
import { BackHeaderWithLabelAndCancelButton } from "../../global_components/organisms/headers/back_header+label+cancel.header";
import { BackHeaderWithLabelComponent } from "../../global_components/organisms/headers/back_header_withLabel.component";
import { BackHeaderComponent } from "../../global_components/organisms/headers/back_header.component";
import { Spacer } from "../../global_components/optimized.spacer.component";
import { theme } from "../../infrastructure/theme";
import { FlexibleContainer } from "../../global_components/containers/flexible_container";
import { GeneralFlexContainer } from "../../global_components/containers/general_flex_container";

import { Text } from "../../infrastructure/typography/text.component";
import { ControlledContainer } from "../../global_components/containers/controlled_container";
import { AmountFormInput } from "../../global_components/inputs/amount_formInput";
import { TextFormInputComponent } from "../../global_components/organisms/inputs/textFormInput.component";
import { RegularCTAButton } from "../../global_components/buttons/cta_btn";
import { SVGComponent } from "../../global_components/image_components/svg.component";
import { ClickableControlledContainer } from "../../global_components/containers/clickable_controlled_container";
import { useEnterAmountLogic } from "../../hooks/useEnterAmountLogic";

import { CategoryListContext } from "../../infrastructure/services/category_list/category_list.context";

export const GeneralNewNameView = ({ navigation, route }) => {
  const { comingFrom } = route.params;
  const {
    cta_action,
    setAmountToSet,
    amountToSet,
    clearingText,
    formatCurrency,
    exitingToRoot,
  } = useEnterAmountLogic(comingFrom);
  console.log("AMOUNT TO SET AT ENTER AMOUNT VIEW:", amountToSet);
  console.log("COMING FROM AT ENTER AMOUNT VIEW:", comingFrom);
  // const [categoryName, setCategoryName] = useState("");
  const { categoryName, setCategoryName, clearingCategoryNameAndBack } =
    React.useContext(CategoryListContext);
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
            categoryName={categoryName}
            setCategoryName={setCategoryName}
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
          {categoryName.length > 0 ? (
            <RegularCTAButton
              caption="Next"
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
