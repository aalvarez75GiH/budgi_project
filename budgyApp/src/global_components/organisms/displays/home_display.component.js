import React, { useContext } from "react";

import { Text } from "../../../infrastructure/typography/text.component";
import { HomeDisplayContainer } from "./home_display.styles";

export const HomeDisplayComponent = ({ number }) => {
  // console.log("number at display:", number);
  // console.log(`Number type is: ${typeof number}`);

  const formatCurrency = (number, symbol = "$") => {
    // Add thousands separator
    const formattedNumber = number.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    // console.log(`Formatted Number type is: ${typeof formattedNumber}`);

    // Format the number as a currency string
    return `${symbol}${formattedNumber}`;
  };

  return (
    <HomeDisplayContainer>
      <Text text_variant="numPad_display" style={{ textAlign: "center" }}>
        {formatCurrency(number)}
      </Text>
    </HomeDisplayContainer>
  );
};
