import React from "react";

import { FlexibleContainer } from "../../containers/flexible_container";
import { ControlledContainer } from "../../containers/controlled_container";
import { RoundedOptionButton } from "../../buttons/rounded_option_button";
import { theme } from "../../../infrastructure/theme";
// import { Spacer } from "../../optimized.spacer.component";

export const BudgetsHeader = ({
  navigation,
  color,
  direction,
  action1,
  action2,
  action3,
  caption,
}) => {
  return (
    <FlexibleContainer
      color={color}
      //   color={"red"}
      direction={direction}
      flexibility={0.17}
      justify={"flex-end"}
    >
      <ControlledContainer
        color={theme.colors.bg.p_FFFFFF}
        // color={"lightblue"}
        width={"100%"}
        height={"100px"}
        justify="space-evenly"
        alignment="center"
        direction="row"
      >
        <RoundedOptionButton
          color={"#F4F4F4"}
          width={"140px"}
          action={action1}
          height={"55px"}
          borderRadius={25}
          caption={caption}
          underlined={true}
        />
        <RoundedOptionButton
          color={"#F4F4F4"}
          width={"140px"}
          action={action2}
          height={"55px"}
          borderRadius={25}
          caption={"Transactions"}
          //   caption={"MAY 2024"}
          underlined={true}
        />
      </ControlledContainer>
    </FlexibleContainer>
  );
};
