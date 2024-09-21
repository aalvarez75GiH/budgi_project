import React, { useState } from "react";
import { Animated } from "react-native";

import { Text } from "../../../infrastructure/typography/text.component";
import { LinkButton } from "../../buttons/link_button";
import { ControlledContainer } from "../../containers/controlled_container";
import { theme } from "../../../infrastructure/theme";
import { AnimatedContainer } from "../../containers/animated_container";

export const AccordionComponent = ({
  navigation,
  stringedAmount,
  short_name,
  transaction_date,
}) => {
  const [opened, setOpened] = useState(false);
  const [animation, setAnimation] = useState(new Animated.Value(0));

  const toggleAccordion = () => {
    if (!opened) {
      Animated.timing(animation, {
        toValue: 1,
        duration: 100,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(animation, {
        toValue: 0,
        duration: 100,
        useNativeDriver: false,
      }).start();
    }
    setOpened(!opened);
  };

  const heightAnimationInterpolation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 100],
  });

  return (
    <ControlledContainer
      width={"90%"}
      height={"100%"}
      color={theme.colors.bg.p_FFFFFF}
      direction={"column"}
      justify={"center"}
      alignment={"center"}
      style={{ borderRadius: 5 }}
    >
      <ControlledContainer
        width={"70%"}
        height={"30%"}
        color={theme.colors.bg.p_FFFFFF}
        direction={"row"}
        justify={"center"}
        alignment={"center"}
        style={{ padding: 10 }}
      >
        <LinkButton
          caption={!opened ? "View details" : "Close details"}
          action={toggleAccordion}
        />
      </ControlledContainer>

      <AnimatedContainer
        width={"80%"}
        height={"20%"}
        marginTop={8}
        direction={"column"}
        interpolation={heightAnimationInterpolation}
        style={{ height: heightAnimationInterpolation }}
      >
        <ControlledContainer
          width={"100%"}
          height={"25%"}
          color={theme.colors.bg.p_FFFFFF}
          direction={"row"}
          marginBottom={5}
        >
          <ControlledContainer
            width={"50%"}
            height={"80%"}
            alignment={"center"}
            justify={"center"}
            color={theme.colors.bg.p_FFFFFF}
          >
            <Text text_variant="bold_text_14">Amount:</Text>
          </ControlledContainer>
          <ControlledContainer
            width={"50%"}
            height={"80%"}
            color={theme.colors.bg.p_FFFFFF}
          >
            <Text text_variant="regular_text_14">${stringedAmount}</Text>
          </ControlledContainer>
        </ControlledContainer>
        <ControlledContainer
          width={"100%"}
          height={"25%"}
          color={theme.colors.bg.p_FFFFFF}
          direction={"row"}
          marginBottom={5}
        >
          <ControlledContainer
            width={"50%"}
            height={"80%"}
            alignment={"center"}
            justify={"center"}
            color={theme.colors.bg.p_FFFFFF}
          >
            <Text text_variant="bold_text_14">Category:</Text>
          </ControlledContainer>
          <ControlledContainer
            width={"50%"}
            height={"80%"}
            color={theme.colors.bg.p_FFFFFF}
          >
            <Text text_variant="regular_text_14">{short_name}</Text>
          </ControlledContainer>
        </ControlledContainer>
        <ControlledContainer
          width={"100%"}
          height={"25%"}
          color={theme.colors.bg.p_FFFFFF}
          direction={"row"}
          marginBottom={5}
        >
          <ControlledContainer
            width={"50%"}
            height={"80%"}
            alignment={"center"}
            justify={"center"}
            color={theme.colors.bg.p_FFFFFF}
          >
            <Text text_variant="bold_text_14">Date:</Text>
          </ControlledContainer>
          <ControlledContainer
            width={"50%"}
            height={"80%"}
            color={theme.colors.bg.p_FFFFFF}
          >
            <Text text_variant="regular_text_14">{transaction_date}</Text>
          </ControlledContainer>
        </ControlledContainer>
      </AnimatedContainer>
    </ControlledContainer>
  );
};
