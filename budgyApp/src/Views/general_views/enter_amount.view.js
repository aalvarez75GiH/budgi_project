import React, { useState, useContext, useEffect } from "react";
import { Platform } from "react-native";

import { SafeArea } from "../../global_components/safe-area.component";
import { ExitHeaderComponent } from "../../global_components/organisms/headers/exit_header.component";
import { BackHeaderWithLabelAndCancelButton } from "../../global_components/organisms/headers/back_header+label+cancel.header";
import { Spacer } from "../../global_components/optimized.spacer.component";
import { theme } from "../../infrastructure/theme";
import { FlexibleContainer } from "../../global_components/containers/flexible_container";
import { GeneralFlexContainer } from "../../global_components/containers/general_flex_container";

import { TransactionsContext } from "../../infrastructure/services/transactions/transactions.context";
import { Text } from "../../infrastructure/typography/text.component";
import { ControlledContainer } from "../../global_components/containers/controlled_container";
import { AmountFormInput } from "../../global_components/inputs/amount_formInput";
import { RegularCTAButton } from "../../global_components/buttons/cta_btn";

export const EnterAmountView = ({ navigation, route }) => {
  const { fixingANumberToTwoDecimalsAndString } =
    useContext(TransactionsContext);

  // ****** Here we are parsing amount to integer for request to transaction end point
  const { item } = route.params;
  const { amount } = item;
  const stringedAmount = fixingANumberToTwoDecimalsAndString(amount);
  const [amountToSet, setAmountToSet] = useState(String(`$${stringedAmount}`));

  const item_modified_at_enter_amount_view = {
    ...item,
    amount: amountToSet.slice(1),
  };

  console.log(
    "ITEM MODIFIED:",
    JSON.stringify(item_modified_at_enter_amount_view, null, 2)
  );

  // const {
  //   amount,
  //   category_name,
  //   category_id,
  //   creation_date,
  //   user_id,
  //   most_recent,
  //   transaction_date,
  //   icon_name,
  //   timeStamp,
  //   short_name,
  //   description,
  //   month_year,
  //   transaction_id,
  // } = item;

  const formatCurrency = (value) => {
    const digits = value.replace(/[^0-9]/g, "");
    console.log("DIGITS:", digits.length);

    if (!digits) {
      setAmountToSet("");
      return;
    }

    let formattedValue = "." + digits.padStart(1, "");
    if (digits.length > 5) {
      formattedValue =
        digits.slice(0, -5) +
        "," +
        digits.slice(-5, -2) +
        "." +
        digits.slice(-2);
    } else if (digits.length > 2) {
      formattedValue = digits.slice(0, -2) + "." + digits.slice(-2);
    }
    setAmountToSet("$" + formattedValue);
  };
  {
    /* <BackHeaderWithLabelComponentButton
          navigation={navigation}
          caption="Add a description"
          direction={"row"}
          color={theme.colors.bg.p_FFFFFF}
          // color={"red"}
          flexibility={Platform.OS === "ios" ? 1.2 : 1.2}
          arrow_left_action={goingBack}
          done_button_action={goingBack}
          isDoneActive={isDoneActive}
          description={description}
          align="flex-start"
        /> */
  }
  return (
    <SafeArea background_color={"#FFFFFF"}>
      <GeneralFlexContainer>
        <BackHeaderWithLabelAndCancelButton
          caption=""
          direction={"row"}
          // color={theme.colors.bg.p_FFFFFF}
          flexibility={0.08}
          arrow_left_action={() => navigation.goBack()}
          cancel_button_action={() => navigation.goBack()}
          align={"center"}
          // color={"#FAA"}
        />
        <FlexibleContainer
          direction={"column"}
          color={theme.colors.bg.p_FFFFFF}
          // color={"brown"}
          flexibility={Platform.OS === "ios" ? 0.25 : 0.4}
          justify={"center"}
        >
          <Spacer position="top" size="xxl" />
          <Spacer position="top" size="xxl" />
          <ControlledContainer
            width={"100%"}
            height={"12%"}
            justify="center"
            alignment="center"
            // color="red"
          >
            <Text text_variant="dark_bold_caption_20">Enter Amount</Text>
          </ControlledContainer>
          <ControlledContainer
            width={"100%"}
            height={"50%"}
            justify="center"
            alignment="center"
            // color="lightblue"
          >
            <AmountFormInput
              width={Platform.OS === "ios" ? "80%" : "85%"}
              height={"50px"}
              color={theme.colors.bg.p_FFFFFF}
              mode="flat"
              placeholder={"$0.00"}
              font_size={theme.fontSizes.text_32}
              onChangeText={(value) => formatCurrency(value)}
              value={amountToSet}
              style={{
                fontFamily: theme.fonts.bold,
                justifyContent: "center",
                alignItems: "center",
              }}
              underlineColor={theme.colors.neutrals.p_B7B7B7}
              activeUnderlineColor={theme.colors.neutrals.p_B7B7B7}
              keyboardType="number-pad"
              onFocus={() => setAmountToSet(`${amountToSet}`)}
              textBreakStrategy="simple"
            />
          </ControlledContainer>
        </FlexibleContainer>

        <FlexibleContainer
          direction={"row"}
          color={theme.colors.bg.p_FFFFFF}
          // color={"lightblue"}
          flexibility={0.5}
          justify={"center"}
        >
          {amountToSet.length > 0 ? (
            <RegularCTAButton
              caption="Next"
              width={310}
              height={50}
              color={theme.colors.buttons.p_FC9827}
              borderRadius={50}
              action={() => null}
              text_variant="cta_dark_caption"
            />
          ) : null}
        </FlexibleContainer>
      </GeneralFlexContainer>
    </SafeArea>
  );
};
