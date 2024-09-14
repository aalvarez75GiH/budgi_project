import React from "react";
import { View } from "react-native";

import { ExitHeaderComponent } from "../../global_components/organisms/headers/exit_header.component";
import { FlexibleContainer } from "../../global_components/containers/flexible_container";
import { theme } from "../../infrastructure/theme";
import { Text } from "../../infrastructure/typography/text.component";
import { Spacer } from "../../global_components/optimized.spacer.component";
import { GeneralFlexContainer } from "../../global_components/containers/general_flex_container";
import { AccountAndThingsTile } from "../../global_components/organisms/tiles/account_and_things_tile";
import { useAccountAndThingsLogic } from "../../hooks/useAccountAndThingsLogic";

export const AccountAndThingsView = ({ navigation }) => {
  const {
    movingToMyTransactions,
    movingToHowYourMonthIsGoing,
    fullName,
    email,
  } = useAccountAndThingsLogic();

  return (
    <GeneralFlexContainer color={theme.colors.bg.p_FFFFFF}>
      <ExitHeaderComponent
        navigation={navigation}
        direction={"column"}
        color={theme.colors.bg.p_FFFFFF}
        // color={"#FAA"}
        flexibility={0.1}
        justify={"center"}
        icon_left={"80%"}
        icon_top={"30%"}
      />

      <FlexibleContainer
        // color={theme.colors.bg.p_FFFFFF}
        // color={"#898989"}
        color={theme.colors.bg.p_FFFFFF}
        direction="row"
        flexibility={0.1}
        justify={"flex-start"}
        isBordered={false}
      >
        <Spacer position="left" size="large" />
        <View>
          <Text text_variant="bold_text_24">Account</Text>
        </View>
      </FlexibleContainer>
      {/* ********* */}

      <FlexibleContainer
        color={theme.colors.bg.p_FFFFFF}
        // color={"#FAD"}
        direction="column"
        // flexibility={0.12}
        flexibility={0.2}
        justify={"center"}
        isBordered={false}
      >
        <AccountAndThingsTile
          caption={fullName}
          navigation={navigation}
          icon_name={"UserIcon"}
          active_icon={false}
        />

        <AccountAndThingsTile
          caption={email}
          navigation={navigation}
          icon_name={"EmailIcon"}
          active_icon={false}
        />
      </FlexibleContainer>
      {/* ********* */}

      <FlexibleContainer
        // color={"#898989"}
        color={theme.colors.bg.p_FFFFFF}
        direction="row"
        flexibility={0.03}
        justify={"flex-start"}
        isBordered={false}
      ></FlexibleContainer>
      <FlexibleContainer
        color={theme.colors.bg.p_FFFFFF}
        // color={"#898989"}
        direction="row"
        flexibility={0.1}
        justify={"flex-start"}
        isBordered={false}
      >
        <Spacer position="left" size="large" />
        <GeneralFlexContainer color={theme.colors.bg.p_FFFFFF}>
          <Text text_variant="bold_text_24">Things of your interest</Text>
        </GeneralFlexContainer>
      </FlexibleContainer>
      {/* ********* */}

      <FlexibleContainer
        // color={theme.colors.bg.e_F4F4F4}
        color={theme.colors.bg.p_FFFFFF}
        // color={"lightblue"}
        direction="column"
        flexibility={0.38}
        justify={"center"}
        isBordered={false}
      >
        <AccountAndThingsTile
          caption={"My transactions"}
          navigation={navigation}
          icon_name={"TransactionsIcon"}
          active_icon={true}
          action={() => movingToMyTransactions(navigation)}
          borderTopWidth={"2px"}
          borderBottomWidth={"1px"}
        />
        <AccountAndThingsTile
          caption={"Check how your month is going"}
          navigation={navigation}
          icon_name={"SpendingIcon"}
          active_icon={true}
          action={() => movingToHowYourMonthIsGoing(navigation)}
          borderTopWidth={"1px"}
          borderBottomWidth={"1px"}
        />
        <AccountAndThingsTile
          caption={"App preference"}
          navigation={navigation}
          icon_name={"PreferencesIcon"}
          active_icon={true}
          borderTopWidth={"1px"}
          borderBottomWidth={"2px"}
        />
        <AccountAndThingsTile
          caption={"Bills to pay"}
          navigation={navigation}
          icon_name={"RealIncomeIcon"}
          active_icon={true}
          borderTopWidth={"1px"}
          borderBottomWidth={"2px"}
        />
      </FlexibleContainer>
    </GeneralFlexContainer>
  );
};
