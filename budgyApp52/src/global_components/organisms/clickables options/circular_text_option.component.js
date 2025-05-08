import React from "react";

import { ControlledContainer } from "../../containers/controlled_container";
import { ClickableControlledContainer } from "../../containers/clickable_controlled_container";
import {
  UnderlinedRegularCaption,
  UnderlinedRegularCaptionLightColor,
} from "../../special text components/underlined.text.component";
import { CircularContainer } from "../../containers/circular_container";
import { CircularTextContainer } from "../../containers/circular_text_container";

export const CircularTextOptionComponent = ({ caption, isPressed, action }) => {
  console.log(isPressed);
  return (
    <ClickableControlledContainer
      width={"20%"}
      height={"100%"}
      //   color={"#FAD"}
      justify="center"
      alignment="center"
      direction="column"
      onPress={action}
    >
      <CircularTextContainer isPressed={isPressed} onPress={action}>
        {isPressed ? (
          <UnderlinedRegularCaptionLightColor size={16}>
            {caption}
          </UnderlinedRegularCaptionLightColor>
        ) : (
          <UnderlinedRegularCaption size={16}>
            {caption}
          </UnderlinedRegularCaption>
        )}
      </CircularTextContainer>
      <ControlledContainer
        width={"80%"}
        height={"20%"}
        // color={"orange"}
        justify="center"
        alignment="center"
        direction="column"
      ></ControlledContainer>
      {/* </ControlledContainer> */}
    </ClickableControlledContainer>
  );
};

{
}
