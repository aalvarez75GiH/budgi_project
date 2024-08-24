import React from "react";

import { SafeArea } from "../../global_components/safe-area.component";
import { RegularCTAButton } from "../../global_components/buttons/cta_btn";
import { BackHeaderComponent } from "../../global_components/organisms/headers/back_header.component";
import { OptionsButtonsComponent } from "../../global_components/buttons/optionsButtons.component";
import { ConfirmationInfoComponent } from "../../global_components/organisms/confirmations/transaction_confirmation.component";
import { LinkButton } from "../../global_components/buttons/link_button";
import { Spacer } from "../../global_components/optimized.spacer.component";
import { theme } from "../../infrastructure/theme";
import { FlexibleContainer } from "../../global_components/containers/flexible_container";
import { GeneralFlexContainer } from "../../global_components/containers/general_flex_container";
import { Text } from "../../infrastructure/typography/text.component";
import { ClickableControlledContainer } from "../../global_components/containers/clickable_controlled_container";
import { ControlledContainer } from "../../global_components/containers/controlled_container";
import { TextForDescription } from "../../global_components/special text components/text_for_descriptions";
import { useTransactionSummaryLogic } from "../../hooks/useTransactionSummaryLogic";

export const TransactionSummaryView = ({ navigation }) => {
  //  ******* LOGIC FROM HOOK ********
  const {
    registeringTransaction,
    isLoading,
    movingForwardToCalendar,
    movingForwardToAddDescription,
    button1Pressed,
    button2Pressed,
    backHeaderAction,
    settingTodayTransactionDate,
    packingExpenseDateForDifferentDay,
    isConfirmed,
    setIsConfirmed,
    transactionInfoForRequest,
    setTransactionInfoForRequest,
    fixingANumberToTwoDecimalsAndString,
    setTransactionsByMonthYear,
    setTransactionsTotalAmount,
    transaction_date,
    short_name,
    description,
    stringedAmount,
  } = useTransactionSummaryLogic();
  console.log(
    "TRANSACTION INFO FOR REQUEST AT SUMMARY VIEW:",
    transactionInfoForRequest
  );
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
          action={() =>
            backHeaderAction(
              navigation,
              transactionInfoForRequest,
              setTransactionInfoForRequest
            )
          }
          align="center"
        />
        <FlexibleContainer
          direction={"column"}
          color={theme.colors.bg.p_FFFFFF}
          // color={"red"}
          flexibility={1}
          justify={"center"}
        >
          <OptionsButtonsComponent
            action={() =>
              settingTodayTransactionDate(
                packingExpenseDateForDifferentDay,
                setTransactionInfoForRequest,
                transactionInfoForRequest,
                system_date
              )
            }
            action2={() => movingForwardToCalendar(navigation)}
            button1Pressed={button1Pressed}
            button2Pressed={button2Pressed}
          />
        </FlexibleContainer>
        <FlexibleContainer
          direction={"column"}
          justify={"flex-start"}
          color={theme.colors.bg.p_FFFFFF}
          // color={"lightblue"}
          flexibility={6}
        >
          <Spacer position="top" size="large" />

          <ConfirmationInfoComponent
            isConfirmed={isConfirmed}
            amount={stringedAmount}
            transaction_date={transaction_date}
            short_name={short_name}
          />
          <Spacer position="top" size="extraLarge" />

          {description ? (
            <>
              <ControlledContainer
                width={"100%"}
                height={"10%"}
                justify="center"
                alignment="flex-start"
                // color="red"
              >
                <Spacer position="left" size="extraLarge">
                  <Text text_variant="bold_text_16">Description:</Text>
                </Spacer>
              </ControlledContainer>
              <ClickableControlledContainer
                width={"85%"}
                height={"30%"}
                justify="flex-start"
                alignment="flex-start"
                // action={() => movingForwardToAddDescription(navigation)}
                // color={theme.colors.bg.e_F4F4F4}
                onPress={() => movingForwardToAddDescription(navigation)}
              >
                <TextForDescription size={16}>{description}</TextForDescription>
              </ClickableControlledContainer>
            </>
          ) : (
            <>
              <Spacer position="top" size="extraLarge" />
              <Spacer position="top" size="extraLarge" />
              <LinkButton
                caption="Add a description (optional)"
                action={() => movingForwardToAddDescription(navigation)}
              />
            </>
          )}
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
          <RegularCTAButton
            caption="Confirm"
            width={310}
            height={50}
            color={theme.colors.buttons.p_FC9827}
            borderRadius={50}
            action={() =>
              registeringTransaction(
                navigation,
                transactionInfoForRequest,
                setIsConfirmed,
                setTransactionsByMonthYear,
                setTransactionsTotalAmount
              )
            }
            text_variant="bold_text_20"
            isLoading={isLoading}
          />
        </FlexibleContainer>
      </GeneralFlexContainer>
    </SafeArea>
  );
};
