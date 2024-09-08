import React from "react";
import { Platform } from "react-native";

import { SafeArea } from "../../global_components/safe-area.component";
import { RegularCTAButton } from "../../global_components/buttons/cta_btn";
import { theme } from "../../infrastructure/theme";
import { FlexibleContainer } from "../../global_components/containers/flexible_container";
import { useTransactionConfirmationLogic } from "../../hooks/useTransactionConfirmationLogic";
import { Text } from "../../infrastructure/typography/text.component";
import { InfoDetailsTile } from "../../global_components/organisms/tiles/info_details_tile";
import { SVGComponent } from "../../global_components/image_components/svg.component";

export const TransactionConfirmationView = ({ navigation }) => {
  const {
    goingHome,
    isConfirmed,
    transaction_date,
    short_name,
    stringedAmount,
  } = useTransactionConfirmationLogic();

  return (
    <SafeArea background_color={theme.colors.bg.p_FFFFFF}>
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
            icon_name={"AchievementIcon"}
            icon_color={theme.colors.buttons.s_142223C}
          />
        </FlexibleContainer>
        <FlexibleContainer
          color={theme.colors.bg.e_F4F4F4}
          //color={"lightblue"}
          direction="column"
          flexibility={Platform.OS === "android" ? 0.39 : 0.32}
          justify={"center"}
          isBordered={false}
        >
          <InfoDetailsTile
            caption={"Amount:"}
            caption2={stringedAmount}
            navigation={navigation}
            icon_name={"EditIcon"}
            active_icon={true}
            action={() => null}
            icon_width={0}
            icon_height={0}
          />
          <InfoDetailsTile
            caption={"Category:"}
            //   caption2={category_name}
            caption2={short_name}
            navigation={navigation}
            icon_name={"EditIcon"}
            active_icon={true}
            action={() => null}
            icon_width={0}
            icon_height={0}
          />
          <InfoDetailsTile
            caption={"Date:"}
            caption2={transaction_date}
            navigation={navigation}
            icon_name={"CalendarIcon"}
            active_icon={true}
            icon_width={0}
            icon_height={0}
            action={() => null}
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
    </SafeArea>
  );
};
