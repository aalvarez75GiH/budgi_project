/* eslint-disable react-native/no-inline-styles */
import React from "react";
import { TouchableOpacity } from "react-native";

import { Text } from "../../infrastructure/typography/text.component";
import { NumPadBtn } from "./buttons.styles";

export const NumPadButton = ({
  text_variant,
  color,
  caption,
  wide = false,
  action,
}) => {
  return (
    <TouchableOpacity onPress={() => action(caption)}>
      <NumPadBtn wide={wide} color={color}>
        <Text text_variant={text_variant}>{caption}</Text>
      </NumPadBtn>
    </TouchableOpacity>
  );
};
