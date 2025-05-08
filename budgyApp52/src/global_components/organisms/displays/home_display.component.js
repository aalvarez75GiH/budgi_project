import React, { useContext } from "react";

import { Text } from "../../../infrastructure/typography/text.component";
import { FlexibleContainer } from "../../containers/flexible_container";

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
    <FlexibleContainer alignment="center" justify="center" direction="column">
      <Text
        text_variant="white_regular_text_96"
        style={{ textAlign: "center" }}
      >
        {formatCurrency(number)}
      </Text>
    </FlexibleContainer>
  );
};

// alignment="center"
//       justify="center"
//       direction="column"
