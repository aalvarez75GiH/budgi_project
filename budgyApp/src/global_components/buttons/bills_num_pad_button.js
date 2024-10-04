/* eslint-disable react-native/no-inline-styles */
import React from "react";
import { TouchableOpacity } from "react-native";

import { Text } from "../../infrastructure/typography/text.component";
import { BillsNumPadBtn } from "./buttons.styles";

export const BillsNumPadButton = ({
  text_variant,
  color,
  caption,
  wide = false,
  action,
  billDayChosen,
}) => {
  const { isActive, day_selected } = billDayChosen;
  const flippingColor = day_selected === caption ? isActive : false;
  return (
    <TouchableOpacity onPress={() => action(caption)}>
      <BillsNumPadBtn wide={wide} color={color} isActive={flippingColor}>
        <Text
          text_variant={flippingColor ? "white_bold_text_20" : "bold_text_20"}
        >
          {caption}
        </Text>
      </BillsNumPadBtn>
    </TouchableOpacity>
  );
};
