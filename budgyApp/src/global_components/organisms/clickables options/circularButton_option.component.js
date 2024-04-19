import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";

import { ControlledContainer } from "../../containers/controlled_container";
import { ClickableControlledContainer } from "../../containers/clickable_controlled_container";
import { SVGComponent } from "../../image_components/svg.component";
import { Text } from "../../../infrastructure/typography/text.component";
import { CircularContainer } from "../../containers/circular_container";

export const CircularButtonOptionComponent = ({
  caption,
  action,
  icon_name,
  isSelected,
}) => {
  return (
    <ClickableControlledContainer
      width={"100px"}
      height={"100%"}
      // color={"red"}
      justify="center"
      alignment="center"
      direction="column"
      margin_right={"3px"}
      margin_left={"3px"}
      onPress={action}
    >
      <ClickableControlledContainer
        onPress={action}
        width={"80%"}
        height={"60%"}
        // color={"blue"}
        justify="center"
        alignment="center"
        direction="column"
      >
        <CircularContainer isSelected={isSelected} onPress={action}>
          <SVGComponent
            onPress={action}
            icon_width={25}
            icon_height={25}
            position={"static"}
            left={"0%"}
            top={"0%"}
            justify={"center"}
            icon_name={icon_name}
            icon_color={isSelected ? "#FFFFFF" : "#14223C"}
          />
        </CircularContainer>
      </ClickableControlledContainer>
      <ClickableControlledContainer
        width={"80%"}
        height={"20%"}
        // color={"orange"}
        justify="center"
        alignment="center"
        direction="column"
        onPress={action}
      >
        <Text text_variant="bold_caption_12">{caption}</Text>
      </ClickableControlledContainer>
    </ClickableControlledContainer>
  );
};
