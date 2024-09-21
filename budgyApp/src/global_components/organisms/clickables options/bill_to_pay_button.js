import React from "react";

import { SVGComponent } from "../../image_components/svg.component";
import { PNGComponent } from "../../image_components/png.component";

import { Text } from "../../../infrastructure/typography/text.component";
import { CheckIconComponent } from "../../check_icon_component";
import {
  TilesContainer,
  TileLabelContainer,
  TileIconContainer,
} from "../../containers/tile_container";
import { theme } from "../../../infrastructure/theme";
import { ControlledContainer } from "../../containers/controlled_container";
import { ClickableControlledContainer } from "../../containers/clickable_controlled_container";
import { Spacer } from "../../optimized.spacer.component";

// import { SVGIconComponent } from "../../image_components/svg_icon.component";
import { useSVGComponent } from "../../../util/system_icons.hook";
export const BillToPayOption = ({
  bill_title,
  icon_name,
  bill_amount,
  payment_due_date,
  action,
}) => {
  const { SVGIconComponent } = useSVGComponent(icon_name);

  return (
    <>
      <ControlledContainer
        width={"170px"}
        height={"150px"}
        // width={"45%"}
        // height={"65%"}
        justify="space-evenly"
        alignment="center"
        direction="column"
        // color={"red"}
        onPress={action}
        z
      >
        <ClickableControlledContainer
          width={"100%"}
          height={"50%"}
          justify="space-evenly"
          alignment="center"
          direction="column"
          color={theme.colors.neutrals.e2_F5F5F5}
          borderTopLeftRadius={10}
          borderBottomLeftRadius={10}
          borderTopRightRadius={10}
          borderBottomRightRadius={10}
          onPress={action}
        >
          <ControlledContainer
            width={"45%"}
            height={"30%"}
            direction={"column"}
            color={theme.colors.neutrals.e2_F5F5F5}
            //  color="brown"
            justify={"center"}
            alignment={"center"}
          >
            <SVGIconComponent
              width={30}
              height={30}
              fill={theme.colors.buttons.s_142223C}
            />
            <Text text_variant="bold_text_14">{bill_title}</Text>
          </ControlledContainer>
          {/* <Spacer position="top" size="small" /> */}
        </ClickableControlledContainer>
        <ControlledContainer
          width={"100%"}
          height={"35%"}
          direction={"column"}
          color={theme.colors.ui.s_FFFFFF}
          //   color={theme.colors.neutrals.e2_F5F5F5}
          justify={"flex-start"}
          alignment={"center"}
        >
          {/* <Text text_variant="regular_text_14">You pay</Text> */}
          <Spacer position="top" size="small" />
          <Text text_variant="bold_text_14">{payment_due_date}</Text>
          <Spacer position="top" size="small" />
          <Text text_variant="green_bold_text_14">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(bill_amount)}
          </Text>
          {/* </Spacer> */}
        </ControlledContainer>
      </ControlledContainer>
    </>
  );
};
