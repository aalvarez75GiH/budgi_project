import React from "react";

import { ControlledContainer } from "../../containers/controlled_container";
import { FlexibleContainer } from "../../containers/flexible_container";
import { Text } from "../../../infrastructure/typography/text.component";
import { SVGComponent } from "../../image_components/svg.component";
import { theme } from "../../../infrastructure/theme";

export const InformationTileComponent = ({ caption }) => {
  return (
    <FlexibleContainer
      color={theme.colors.bg.p_FFFFFF}
      // color={"brown"}
      direction="column"
      flexibility={0.2}
      justify={"center"}
      isBordered={false}
    >
      <ControlledContainer
        color={theme.colors.bg.p_FFFFFF}
        // color={"red"}
        width={"100%"}
        height={"100px"}
        justify="center"
        alignment="flex-start"
        direction="row"
      >
        <ControlledContainer
          color={theme.colors.bg.p_FFFFFF}
          // color={"red"}
          width={"12%"}
          height={"100px"}
          justify="center"
          alignment="center"
          direction="row"
        >
          <SVGComponent
            icon_width={30}
            icon_height={30}
            position={"static"}
            justify={"center"}
            icon_name={"DescriptionIcon"}
            // icon_color={theme.colors.buttons.s_142223C}
            icon_color={"#000000"}
          />
        </ControlledContainer>
        <ControlledContainer
          color={theme.colors.bg.p_FFFFFF}
          // color={"lightgray"}
          width={"80%"}
          height={"100px"}
          justify="center"
          alignment="center"
          direction="row"
        >
          <Text text_variant="regular_text_16">{caption}</Text>
        </ControlledContainer>
      </ControlledContainer>
    </FlexibleContainer>
  );
};
