import React from "react";

import { OPTButton } from "./buttons.styles";
import { Text } from "../../infrastructure/typography/text.component";
import { OptionButtonTextIconContainer } from "../buttons/buttons.styles";
import { Spacer } from "../optimized.spacer.component";
import { SVGComponent } from "../image_components/svg.component";

export const MonthOptionButton = ({
  action,
  caption,
  color1,
  color2,
  width,
  height,
  borderRadius,
  isDisabled,
  isChosen,
}) => {
  return (
    <OPTButton
      color1={color1}
      color2={color2}
      onPress={action}
      width={width}
      height={height}
      borderRadius={borderRadius}
      isActive={isChosen}
    >
      <OptionButtonTextIconContainer
        width={"70%"}
        justify="center"
        align={"center"}
        direction="row"
      >
        <Spacer position="left" size="large">
          <Text
            text_variant={
              isChosen
                ? "white_bold_text_20"
                : isDisabled
                ? "neutral_bold_text_20"
                : "bold_text_20"
            }
          >
            {caption}
          </Text>
        </Spacer>
        <>
          <Spacer position="left" size="medium" />
          {isChosen && (
            <SVGComponent
              icon_name="SuccessIcon"
              icon_width={15}
              icon_height={15}
              position={"static"}
              left={"0%"}
              top={"0%"}
              justify={"center"}
            />
          )}
        </>
      </OptionButtonTextIconContainer>
    </OPTButton>
  );
};
