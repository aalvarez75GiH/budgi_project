import React, { useContext } from "react";
import { Platform } from "react-native";

import { SafeArea } from "../../global_components/safe-area.component";
import { RegularCTAButton } from "../../global_components/buttons/cta_btn";
import { theme } from "../../infrastructure/theme";
import { FlexibleContainer } from "../../global_components/containers/flexible_container";
import { useTransactionConfirmationLogic } from "../../hooks/useTransactionConfirmationLogic";
import { Text } from "../../infrastructure/typography/text.component";
import { SVGComponent } from "../../global_components/image_components/svg.component";
import { AccordionComponent } from "../../global_components/organisms/animated components/accordion.component";

import { HomeContext } from "../../infrastructure/services/Home services/home.context";
import { TransactionsContext } from "../../infrastructure/services/transactions/transactions.context";

export const NewOrUpdateBillConfirmationView = ({ navigation, route }) => {
  const {
    updateBillInfoForRequest,
    createBillInfoForRequest,
    action_to_do,
    exitingToRoot,
    deleteBillInfo,
  } = useContext(HomeContext);

  const {
    bill_amount: updated_bill_amount,
    bill_short_name: updated_bill_short_name,
    payment_date: updated_bill_payment_date,
  } = updateBillInfoForRequest;
  const {
    bill_amount: bill_deleted_amount,
    bill_short_name: bill_deleted_short_name,
    payment_date: bill_deleted_payment_date,
  } = deleteBillInfo;

  const {
    bill_amount: created_bill_amount,
    bill_short_name: created_bill_short_name,
    payment_date: created_bill_payment_date,
  } = createBillInfoForRequest;

  const { fixingANumberToTwoDecimalsAndString } =
    useContext(TransactionsContext);
  const stringedBillAmount =
    fixingANumberToTwoDecimalsAndString(updated_bill_amount);
  const stringedBillCreatedAmount =
    fixingANumberToTwoDecimalsAndString(created_bill_amount);
  const stringedBillDeletedAmount =
    fixingANumberToTwoDecimalsAndString(bill_deleted_amount);

  return (
    <SafeArea background_color={theme.colors.bg.p_FFFFFF}>
      {action_to_do === "create_bill" && (
        <>
          <FlexibleContainer
            color={theme.colors.bg.p_FFFFFF}
            // color={"lightblue"}
            direction="column"
            flexibility={Platform.OS === "android" ? 0.15 : 0.15}
            justify={"flex-end"}
            isBordered={false}
          >
            <Text text_variant="bold_text_20">
              Transaction registration done!
            </Text>
            {/* <Text text_variant="bold_text_20">Transaction update done!</Text> */}
          </FlexibleContainer>
          <FlexibleContainer
            color={theme.colors.bg.p_FFFFFF}
            // color={"brown"}
            direction="column"
            flexibility={Platform.OS === "android" ? 0.7 : 0.7}
            justify={"center"}
            align={"center"}
            isBordered={false}
          >
            <SVGComponent
              icon_width={220}
              icon_height={220}
              position={"static"}
              justify={"center"}
              icon_name={"AchievementIllustration"}
              icon_color={theme.colors.buttons.s_142223C}
            />
          </FlexibleContainer>

          <FlexibleContainer
            // color={theme.colors.bg.e_F4F4F4}
            color={theme.colors.bg.p_FFFFFF}
            direction="column"
            // flexibility={Platform.OS === "android" ? 0.1 : 0.1}
            flexibility={Platform.OS === "android" ? 0.25 : 0.25}
            justify={"center"}
            isBordered={false}
          >
            <AccordionComponent
              navigation={navigation}
              stringedAmount={stringedBillCreatedAmount}
              short_name={created_bill_short_name}
              transaction_date={created_bill_payment_date}
              caption1={"Amount:"}
              caption2={"Bill:"}
              caption3={"Due date:"}
            />
          </FlexibleContainer>
        </>
      )}
      {action_to_do === "update_bill" && (
        <>
          <FlexibleContainer
            color={theme.colors.bg.p_FFFFFF}
            // color={"lightblue"}
            direction="column"
            flexibility={Platform.OS === "android" ? 0.15 : 0.15}
            justify={"flex-end"}
            isBordered={false}
          >
            <Text text_variant="bold_text_20">Bill update done!</Text>
            {/* <Text text_variant="bold_text_20">Transaction update done!</Text> */}
          </FlexibleContainer>
          <FlexibleContainer
            color={theme.colors.bg.p_FFFFFF}
            // color={"lightblue"}
            direction="column"
            flexibility={Platform.OS === "android" ? 0.45 : 0.4}
            justify={"center"}
            isBordered={false}
          >
            <SVGComponent
              icon_width={180}
              icon_height={180}
              position={"static"}
              justify={"center"}
              icon_name={"SuccessIlustration"}
              icon_color={theme.colors.buttons.s_142223C}
            />
          </FlexibleContainer>
          <FlexibleContainer
            // color={theme.colors.bg.e_F4F4F4}
            color={theme.colors.bg.p_FFFFFF}
            direction="column"
            // flexibility={Platform.OS === "android" ? 0.1 : 0.1}
            flexibility={Platform.OS === "android" ? 0.25 : 0.25}
            justify={"center"}
            isBordered={false}
          >
            <AccordionComponent
              navigation={navigation}
              stringedAmount={stringedBillAmount}
              short_name={updated_bill_short_name}
              transaction_date={updated_bill_payment_date}
              caption1={"Amount:"}
              caption2={"Bill:"}
              caption3={"Due date:"}
            />
          </FlexibleContainer>
        </>
      )}
      {action_to_do === "delete_bill" && (
        <>
          <FlexibleContainer
            color={theme.colors.bg.p_FFFFFF}
            // color={"lightblue"}
            direction="column"
            flexibility={Platform.OS === "android" ? 0.15 : 0.15}
            justify={"flex-end"}
            isBordered={false}
          >
            <Text text_variant="bold_text_20">Bill deleted done!</Text>
            {/* <Text text_variant="bold_text_20">Transaction update done!</Text> */}
          </FlexibleContainer>
          <FlexibleContainer
            color={theme.colors.bg.p_FFFFFF}
            // color={"lightblue"}
            direction="column"
            flexibility={Platform.OS === "android" ? 0.45 : 0.4}
            justify={"center"}
            isBordered={false}
          >
            <SVGComponent
              icon_width={200}
              icon_height={200}
              position={"static"}
              justify={"center"}
              icon_name={"DeletedIllustration"}
              icon_color={theme.colors.buttons.s_142223C}
            />
          </FlexibleContainer>
          <FlexibleContainer
            // color={theme.colors.bg.e_F4F4F4}
            color={theme.colors.bg.p_FFFFFF}
            direction="column"
            // flexibility={Platform.OS === "android" ? 0.1 : 0.1}
            flexibility={Platform.OS === "android" ? 0.25 : 0.25}
            justify={"center"}
            isBordered={false}
          >
            <AccordionComponent
              navigation={navigation}
              stringedAmount={stringedBillDeletedAmount}
              short_name={bill_deleted_short_name}
              transaction_date={bill_deleted_payment_date}
              caption1={"Amount:"}
              caption2={"Category:"}
              caption3={"Date:"}
            />
          </FlexibleContainer>
        </>
      )}
      {action_to_do === "pause_bill" && (
        <>
          <FlexibleContainer
            color={theme.colors.bg.p_FFFFFF}
            // color={"lightblue"}
            direction="column"
            flexibility={Platform.OS === "android" ? 0.15 : 0.15}
            justify={"flex-end"}
            isBordered={false}
          >
            <Text text_variant="bold_text_20">Bill pausing done!</Text>
            {/* <Text text_variant="bold_text_20">Transaction update done!</Text> */}
          </FlexibleContainer>
          <FlexibleContainer
            color={theme.colors.bg.p_FFFFFF}
            // color={"lightblue"}
            direction="column"
            flexibility={Platform.OS === "android" ? 0.45 : 0.4}
            justify={"center"}
            isBordered={false}
          >
            <SVGComponent
              icon_width={150}
              icon_height={150}
              position={"static"}
              justify={"center"}
              icon_name={"PausedIcon"}
              icon_color={theme.colors.buttons.s_142223C}
            />
          </FlexibleContainer>
          <FlexibleContainer
            // color={theme.colors.bg.e_F4F4F4}
            color={theme.colors.bg.p_FFFFFF}
            direction="column"
            // flexibility={Platform.OS === "android" ? 0.1 : 0.1}
            flexibility={Platform.OS === "android" ? 0.25 : 0.25}
            justify={"center"}
            isBordered={false}
          >
            <AccordionComponent
              navigation={navigation}
              stringedAmount={stringedBillDeletedAmount}
              short_name={bill_deleted_short_name}
              transaction_date={bill_deleted_payment_date}
              caption1={"Amount:"}
              caption2={"Category:"}
              caption3={"Date:"}
            />
          </FlexibleContainer>
        </>
      )}
      <FlexibleContainer
        color={theme.colors.bg.p_FFFFFF}
        // color={"brown"}
        direction="column"
        flexibility={0.3}
        justify={"center"}
        isBordered={false}
      >
        <RegularCTAButton
          caption="Done"
          width={310}
          height={50}
          color={theme.colors.ui.success}
          borderRadius={50}
          action={() => exitingToRoot(navigation)}
          text_variant="white_bold_text_16"
        />
      </FlexibleContainer>
    </SafeArea>
  );
};
