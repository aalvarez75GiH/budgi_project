import React from "react";
import { Platform } from "react-native";

import { SafeArea } from "../../global_components/safe-area.component";
import { RegularCTAButton } from "../../global_components/buttons/cta_btn";
import { theme } from "../../infrastructure/theme";
import { FlexibleContainer } from "../../global_components/containers/flexible_container";
import { useTransactionConfirmationLogic } from "../../hooks/useTransactionConfirmationLogic";
import { Text } from "../../infrastructure/typography/text.component";
import { SVGComponent } from "../../global_components/image_components/svg.component";
import { AccordionComponent } from "../../global_components/organisms/animated components/accordion.component";

export const TransactionConfirmationView = ({ navigation, route }) => {
  const {
    goingHome,
    transaction_date,
    short_name,
    stringedAmount,
    transaction_date_updated,
    short_name_updated,
    stringedAmountUpdated,
  } = useTransactionConfirmationLogic();
  const { action_to_do } = route.params;

  return (
    <SafeArea background_color={theme.colors.bg.p_FFFFFF}>
      {action_to_do === "new_transaction" && (
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
              stringedAmount={stringedAmount}
              short_name={short_name}
              transaction_date={transaction_date}
            />
          </FlexibleContainer>

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
              action={() => goingHome(navigation)}
              text_variant="white_bold_text_16"
            />
          </FlexibleContainer>
        </>
      )}
      {action_to_do === "update_transaction" && (
        <>
          <FlexibleContainer
            color={theme.colors.bg.p_FFFFFF}
            // color={"lightblue"}
            direction="column"
            flexibility={Platform.OS === "android" ? 0.15 : 0.15}
            justify={"flex-end"}
            isBordered={false}
          >
            <Text text_variant="bold_text_20">Transaction update done!</Text>
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
              stringedAmount={stringedAmountUpdated}
              short_name={short_name_updated}
              transaction_date={transaction_date_updated}
            />
          </FlexibleContainer>

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
              action={() => goingHome(navigation)}
              text_variant="white_bold_text_16"
            />
          </FlexibleContainer>
        </>
      )}
      {action_to_do === "delete_transaction" && (
        <>
          <FlexibleContainer
            color={theme.colors.bg.p_FFFFFF}
            // color={"lightblue"}
            direction="column"
            flexibility={Platform.OS === "android" ? 0.15 : 0.15}
            justify={"flex-end"}
            isBordered={false}
          >
            <Text text_variant="bold_text_20">Transaction delete done!</Text>
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
              stringedAmount={stringedAmountUpdated}
              short_name={short_name_updated}
              transaction_date={transaction_date_updated}
            />
          </FlexibleContainer>

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
              action={() => goingHome(navigation)}
              text_variant="white_bold_text_16"
            />
          </FlexibleContainer>
        </>
      )}
    </SafeArea>
  );
};
