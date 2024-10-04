import React, { useContext } from "react";

import { ControlledContainer } from "./containers/controlled_container";
import { Text } from "../infrastructure/typography/text.component";

import { DateOperationsContext } from "../infrastructure/services/date_operations/date_operations.context";

export const EmptyInfoAlert = ({
  caption,
  width,
  height,
  direction,
  justify,
  alignment,
  color,
  comingFrom,
}) => {
  const { month_selected, month_year, gettingAcronym } = useContext(
    DateOperationsContext
  );
  const month_year_toRender = gettingAcronym(month_selected);
  if (comingFrom === "MyTransactionsView") {
    return (
      <ControlledContainer
        width={width}
        height={height}
        direction={direction}
        justify={justify}
        alignment={alignment}
        color={color}
      >
        <Text text_variant="neutral_bold_text_16">{caption}</Text>
        <Text text_variant="neutral_bold_text_16">
          for {month_year_toRender}
        </Text>
      </ControlledContainer>
    );
  }
};
