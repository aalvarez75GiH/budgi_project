import React from "react";

import { OPTButton } from "./buttons.styles";
import { Text } from "../../infrastructure/typography/text.component";
import { OptionButtonTextIconContainer } from "../buttons/buttons.styles";
import { Spacer } from "../optimized.spacer.component";
import { SVGComponent } from "../image_components/svg.component";
import { RoundedOPTButton } from "./buttons.styles";
import { UnderlinedRegularCaption } from "../organisms/confirmations/confirmation_component.styles";
import { UnderlinedBoldWhiteCaption } from "../special text components/underlined.text.component";
import { UnderlinedBoldCaption } from "../special text components/underlined.text.component";
import AntDesign from "react-native-vector-icons/AntDesign";
import { ControlledContainer } from "../containers/controlled_container";
import { theme } from "../../infrastructure/theme";
// import { Text } from "../../infrastructure/typography/text.component";
// import { SVGComponent } from "../image_components/svg.component";

export const PaidOrUnpaidButton = ({
  action,
  caption,
  color,
  width,
  height,
  borderRadius,
  type,
}) => {
  return (
    <RoundedOPTButton
      color={color}
      onPress={action}
      width={width}
      height={height}
      borderRadius={borderRadius}
    >
      {type === "grey_option_button" && (
        <OptionButtonTextIconContainer>
          {/* <UnderlinedBoldCaption size={14}>{caption}</UnderlinedBoldCaption> */}
          <Text text_variant="neutral_bold_text_12">{caption}</Text>
        </OptionButtonTextIconContainer>
      )}

      {type === "green_option_button" && (
        <ControlledContainer
          width={"50%"}
          height={"50%"}
          direction={"row"}
          color={theme.colors.ui.s_FFFFFF}
          //   color={"yellow"}
          justify={"center"}
          alignment={"center"}
        >
          <SVGComponent
            icon_name="SuccessIcon"
            icon_width={30}
            icon_height={30}
            position={"static"}
            left={"0%"}
            top={"0%"}
            justify={"center"}
          />
        </ControlledContainer>
      )}
    </RoundedOPTButton>
  );
};
