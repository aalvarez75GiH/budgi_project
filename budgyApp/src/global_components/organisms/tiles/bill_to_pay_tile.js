import React, { useState } from "react";
import { StyleSheet } from "react-native";

import { Text } from "../../../infrastructure/typography/text.component";

import { theme } from "../../../infrastructure/theme";
import { ControlledContainer } from "../../containers/controlled_container";
import { ClickableControlledContainer } from "../../containers/clickable_controlled_container";
import { Spacer } from "../../optimized.spacer.component";

// import { SVGIconComponent } from "../../image_components/svg_icon.component";
import { useSVGComponent } from "../../../util/system_icons.hook";
import { PaidOrUnpaidButton } from "../../buttons/paid_unpaid_button";

export const BillToPayTile = ({
  bill_title,
  icon_name,
  bill_amount,
  payment_due_date,
  action,
}) => {
  const { SVGIconComponent } = useSVGComponent(icon_name);
  const [tapped, setTapped] = useState(false);
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
        //color="brown"
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
        direction={"column"}
        color={theme.colors.ui.s_FFFFFF}
        //color={"blue"}
        justify={"center"}
        alignment={"center"}
      >
        {/* <Spacer position="left" size="large">
          <PaidOrUnpaidButton
            color={
              tapped
                ? theme.colors.ui.s_FFFFFF
                : theme.colors.neutrals.e2_F5F5F5
            }
            action={() => setTapped(!tapped)}
            width={"70px"}
            height={"40px"}
            borderRadius={12}
            caption={tapped ? "Paid" : "Unpaid"}
            type={tapped ? "green_option_button" : "grey_option_button"}
          />
        </Spacer> */}
      </ControlledContainer>
    </ClickableControlledContainer>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: "center",
  },
  label: {
    margin: 8,
  },
});
