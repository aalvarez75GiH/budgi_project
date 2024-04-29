import React, { useState } from "react";

import { theme } from "../../infrastructure/theme";
import { OptionsButtonsContainer } from "./buttons.styles";
import { OptionButton } from "./option_button";

export const OptionsButtonsComponent = ({
  action,
  action2,
  button1Pressed,
  button2Pressed,
}) => {
  // const [button1Active, setButton1Active] = useState(true);
  // const [button2Active, setButton2Active] = useState(false);

  const activatingButton1 = () => {
    setButton1Active(!button1Active);
    setButton2Active(!button2Active);
  };
  const activatingButton2 = () => {
    setButton1Active(!button1Active);
    setButton2Active(!button2Active);
  };
  return (
    <OptionsButtonsContainer
      width={350}
      height={50}
      color={theme.colors.bg.p_FFFFFF}
    >
      <OptionButton
        width={170}
        height={50}
        caption="Today"
        color={theme.colors.bg.s_142223C}
        borderRadius={0}
        isActive={button1Pressed}
        action={action}
      />
      <OptionButton
        width={170}
        height={50}
        action={action2}
        caption="Different day"
        color={theme.colors.buttons.t_E5E5E5}
        borderRadius={0}
        isActive={button2Pressed}
      />
    </OptionsButtonsContainer>
  );
};
