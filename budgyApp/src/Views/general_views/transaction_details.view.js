import React, { useState, useContext, useEffect } from "react";
// import { Text } from "react-native";

import { SafeArea } from "../../global_components/safe-area.component";
import { BackHeaderComponent } from "../../global_components/organisms/headers/back_header.component";
import { OptionsButtonsComponent } from "../../global_components/buttons/optionsButtons.component";
import { ConfirmationInfoComponent } from "../../global_components/organisms/confirmations/transaction_confirmation.component";
import { LinkButton } from "../../global_components/buttons/link_button";
import { Spacer } from "../../global_components/optimized.spacer.component";
import { theme } from "../../infrastructure/theme";
import { FlexibleContainer } from "../../global_components/containers/flexible_container";
import { GeneralFlexContainer } from "../../global_components/containers/general_flex_container";

import { AuthenticationContext } from "../../infrastructure/services/authentication/authentication.context";
import { TransactionsContext } from "../../infrastructure/services/transactions/transactions.context";
import { DateOperationsContext } from "../../infrastructure/services/date_operations/date_operations.context";
import { Text } from "../../infrastructure/typography/text.component";
import { ControlledContainer } from "../../global_components/containers/controlled_container";
import { ClickableControlledContainer } from "../../global_components/containers/clickable_controlled_container";
import { TextForDescription } from "../../global_components/special text components/text_for_descriptions";

export const TransactionDetailsView = ({ navigation, route }) => {
  const { item } = route.params;
  const { amount, transaction_date, short_name, description } = item;

  //   ***** Transactions context consumption
  const { fixingANumberToTwoDecimalsAndString } =
    useContext(TransactionsContext);

  // ****** Here we are parsing amount to integer for request to transaction end point
  const stringedAmount = fixingANumberToTwoDecimalsAndString(amount);

  const backHeaderAction = () => {
    navigation.goBack();
  };

  return (
    <SafeArea background_color={"#FFFFFF"}>
      <GeneralFlexContainer>
        <BackHeaderComponent
          navigation={navigation}
          width={"100%"}
          height={"15%"}
          direction={"row"}
          color={theme.colors.bg.p_FFFFFF}
          // color={"#FAD"}
          action={backHeaderAction}
          align="center"
        />

        <FlexibleContainer
          direction={"column"}
          justify={"flex-start"}
          color={theme.colors.bg.p_FFFFFF}
          // color={"lightblue"}
          flexibility={6}
        >
          <Spacer position="top" size="large" />

          <ConfirmationInfoComponent
            width={200}
            height={140}
            isConfirmed={false}
            amount={stringedAmount}
            transaction_date={transaction_date}
            short_name={short_name}
          />
          <Spacer position="top" size="extraLarge" />

          {description ? (
            <>
              <ControlledContainer
                width={"100%"}
                height={"50px"}
                justify="center"
                alignment="flex-start"
                // color="red"
              >
                <Spacer position="left" size="extraLarge">
                  <Text text_variant="cta_dark_caption_16">Description:</Text>
                </Spacer>
              </ControlledContainer>
              <ClickableControlledContainer
                width={"85%"}
                height={"150px"}
                justify="flex-start"
                alignment="flex-start"
                action={() => null}
                // color={theme.colors.bg.e_F4F4F4}
                onPress={() => null}
              >
                <TextForDescription size={16}>{description}</TextForDescription>
              </ClickableControlledContainer>
            </>
          ) : null}
        </FlexibleContainer>
        <FlexibleContainer
          direction={"row"}
          color={theme.colors.bg.p_FFFFFF}
          // color={"brown"}
          flexibility={2}
          justify={"center"}
        >
          <Spacer position="top" size="xxl" />
          <Spacer position="top" size="xxl" />

          <LinkButton
            caption="Edit"
            action={() => {
              navigation.navigate("Enter_amount_view", {
                item,
              });
            }}
          />
        </FlexibleContainer>
      </GeneralFlexContainer>
    </SafeArea>
  );
};
