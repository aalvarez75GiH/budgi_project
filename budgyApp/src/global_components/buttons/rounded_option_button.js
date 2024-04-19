import React from "react";

import { OPTButton } from "./buttons.styles";
import { Text } from "../../infrastructure/typography/text.component";
import { OptionButtonTextIconContainer } from "../buttons/buttons.styles";
import { Spacer } from "../optimized.spacer.component";
import { SVGComponent } from "../image_components/svg.component";
import { RoundedOPTButton } from "./buttons.styles";
import { UnderlinedRegularCaption } from "../organisms/confirmations/confirmation_component.styles";
import { UnderlinedBoldCaption } from "../special text components/underlined.text.component";
export const RoundedOptionButton = ({
  action,
  caption,
  color,
  width,
  height,
  borderRadius,
  underlined,
}) => {
  return (
    <RoundedOPTButton
      color={color}
      onPress={action}
      width={width}
      height={height}
      borderRadius={borderRadius}
    >
      <OptionButtonTextIconContainer>
        {/* <Text text_variant="bold_caption_12">{caption}</Text> */}
        <UnderlinedBoldCaption size={12}>{caption}</UnderlinedBoldCaption>
      </OptionButtonTextIconContainer>
    </RoundedOPTButton>
  );
};
