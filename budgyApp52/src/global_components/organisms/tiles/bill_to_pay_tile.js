import React, { useState } from "react";
import { StyleSheet } from "react-native";

import { Text } from "../../../infrastructure/typography/text.component";

import { theme } from "../../../infrastructure/theme";
import { ControlledContainer } from "../../containers/controlled_container";
import { ClickableControlledContainer } from "../../containers/clickable_controlled_container";
import { Spacer } from "../../optimized.spacer.component";

import { useSVGComponent } from "../../../util/system_icons.hook";
import { PaidOrUnpaidButton } from "../../buttons/paid_unpaid_button";
import { SVGComponent } from "../../image_components/svg.component";

export const BillToPayTile = ({
  bill_title,
  icon_name,
  bill_amount,
  payment_due_date,
  action,
  type,
  action_for_deletion,
  action_for_pausing,
  action_for_unpausing,
  bill_status,
}) => {
  const { SVGIconComponent } = useSVGComponent(icon_name);
  return (
    <ClickableControlledContainer
      width={"370px"}
      height={"100px"}
      justify="space-between"
      alignment="center"
      direction="row"
      color={theme.colors.ui.s_FFFFFF}
      onPress={action}
      borderBottomWidth={4}
      borderColor={theme.colors.neutrals.e2_F5F5F5}
    >
      <ControlledContainer
        width={"15%"}
        height={"100%"}
        direction={"column"}
        color={theme.colors.ui.s_FFFFFF}
        justify={"center"}
        alignment={"center"}
      >
        <SVGIconComponent
          width={30}
          height={30}
          fill={theme.colors.buttons.s_142223C}
        />
      </ControlledContainer>
      <ControlledContainer
        width={"35%"}
        height={"100%"}
        direction={"column"}
        color={theme.colors.ui.s_FFFFFF}
        //color="blue"
        justify={"center"}
        alignment={"flex-start"}
      >
        <Spacer position="left" size="small">
          <Text text_variant="bold_text_16">{bill_title}</Text>
          <Text text_variant="neutral_bold_text_14">Due date: </Text>
        </Spacer>
      </ControlledContainer>
      <ControlledContainer
        width={"25%"}
        height={"100%"}
        direction={"column"}
        color={theme.colors.ui.s_FFFFFF}
        //color="yellow"
        justify={"center"}
        alignment={"flex-start"}
      >
        <Text text_variant="neutral_bold_text_14">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(bill_amount)}
        </Text>
        <Text text_variant="regular_text_14">{payment_due_date}</Text>
      </ControlledContainer>

      <ControlledContainer
        width={"25%"}
        height={"100%"}
        direction={"row"}
        color={theme.colors.ui.s_FFFFFF}
        // color={"blue"}
        justify={"center"}
        alignment={"center"}
        //onPress={() => null}
      >
        {type === "by_user" && bill_status === "Paused" && (
          <>
            <ClickableControlledContainer
              width={"50%"}
              height={"50%"}
              direction={"column"}
              color={theme.colors.ui.s_FFFFFF}
              // color={"blue"}
              justify={"center"}
              alignment={"center"}
              onPress={action_for_deletion}
            >
              <SVGComponent
                icon_width={25}
                icon_height={25}
                position={"static"}
                left={0}
                top={0}
                justify={"center"}
                icon_name={"RemoveIcon"}
              />
            </ClickableControlledContainer>
            <ClickableControlledContainer
              width={"50%"}
              height={"50%"}
              direction={"column"}
              color={theme.colors.ui.s_FFFFFF}
              // color={"yellow"}
              justify={"center"}
              alignment={"center"}
              onPress={action_for_unpausing}
            >
              <SVGComponent
                icon_width={30}
                icon_height={30}
                position={"static"}
                left={0}
                top={0}
                justify={"center"}
                icon_name={"UnPausedIcon"}
              />
            </ClickableControlledContainer>
          </>
        )}
        {type === "by_user" && bill_status !== "Paused" && (
          <>
            <ClickableControlledContainer
              width={"50%"}
              height={"50%"}
              direction={"column"}
              color={theme.colors.ui.s_FFFFFF}
              // color={"blue"}
              justify={"center"}
              alignment={"center"}
              onPress={action_for_deletion}
            >
              <SVGComponent
                icon_width={25}
                icon_height={25}
                position={"static"}
                left={0}
                top={0}
                justify={"center"}
                icon_name={"RemoveIcon"}
              />
            </ClickableControlledContainer>
            <ClickableControlledContainer
              width={"50%"}
              height={"50%"}
              direction={"column"}
              color={theme.colors.ui.s_FFFFFF}
              // color={"yellow"}
              justify={"center"}
              alignment={"center"}
              onPress={action_for_pausing}
            >
              <SVGComponent
                icon_width={25}
                icon_height={25}
                position={"static"}
                left={0}
                top={0}
                justify={"center"}
                icon_name={"PausedIcon"}
              />
            </ClickableControlledContainer>
          </>
        )}
        {type === "Default" && bill_status === "Paused" && (
          <>
            <ClickableControlledContainer
              width={"50%"}
              height={"50%"}
              direction={"column"}
              color={theme.colors.ui.s_FFFFFF}
              // color={"blue"}
              justify={"center"}
              alignment={"center"}
              onPress={() => null}
            ></ClickableControlledContainer>
            <ClickableControlledContainer
              width={"50%"}
              height={"50%"}
              direction={"column"}
              color={theme.colors.ui.s_FFFFFF}
              justify={"center"}
              alignment={"center"}
              onPress={action_for_unpausing}
            >
              <SVGComponent
                icon_width={30}
                icon_height={30}
                position={"static"}
                left={0}
                top={0}
                justify={"center"}
                icon_name={"UnPausedIcon"}
              />
            </ClickableControlledContainer>
          </>
        )}

        {type === "Default" && bill_status !== "Paused" && (
          <>
            <ClickableControlledContainer
              width={"50%"}
              height={"50%"}
              direction={"column"}
              color={theme.colors.ui.s_FFFFFF}
              // color={"blue"}
              justify={"center"}
              alignment={"center"}
              onPress={action_for_deletion}
            ></ClickableControlledContainer>
            <ClickableControlledContainer
              width={"50%"}
              height={"50%"}
              direction={"column"}
              color={theme.colors.ui.s_FFFFFF}
              // color={"yellow"}
              justify={"center"}
              alignment={"center"}
              onPress={action_for_pausing}
            >
              <SVGComponent
                icon_width={25}
                icon_height={25}
                position={"static"}
                left={0}
                top={0}
                justify={"center"}
                icon_name={"PausedIcon"}
              />
            </ClickableControlledContainer>
          </>
        )}
      </ControlledContainer>
    </ClickableControlledContainer>
  );
};
