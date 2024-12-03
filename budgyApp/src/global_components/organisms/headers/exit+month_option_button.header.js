import React from "react";

import { FlexibleContainer } from "../../containers/flexible_container";
import { ControlledContainer } from "../../containers/controlled_container";
import { SVGComponent } from "../../image_components/svg.component";
import { SVG_Clickable_Component } from "../../image_components/svg_clickable.component";
import { RoundedOptionButton } from "../../buttons/rounded_option_button";
import { theme } from "../../../infrastructure/theme";
import { Spacer } from "../../optimized.spacer.component";

export const ExitHeaderWithMonthsOptionButtonComponent = ({
  navigation,
  color,
  flexibility,
  direction,
  month_year_toRender,
  month_year,
  action,
  icon_left,
  icon_top,
}) => {
  const closingMenu = () => {
    navigation.goBack();
  };

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
        justify="center"
        alignment="center"
        direction="row"
      >
        <SVG_Clickable_Component
          action={closingMenu}
          icon_name="ExitIcon"
          // icon_path={`${svg_path}/exit_icon2.svg`}
          icon_width={20}
          icon_height={20}
          position={"absolute"}
          icon_left={icon_left}
          icon_to={icon_top}
          justify="center"
        />

        <Spacer position="left" size="xxl" />
        <Spacer position="left" size="xxl" />
        <Spacer position="left" size="xxl" />
        <Spacer position="left" size="xxl" />
        <Spacer position="left" size="xxl" />
        <Spacer position="left" size="xxl" />

        <RoundedOptionButton
          color={"#F4F4F4"}
          width={"140px"}
          action={action}
          height={"55px"}
          borderRadius={25}
          caption={month_year_toRender ? month_year_toRender : month_year}
          type="grey_option_button"
        />
      </ControlledContainer>
    </FlexibleContainer>
  );
};
