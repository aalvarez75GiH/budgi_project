import React, { useContext } from "react";
import { View } from "react-native";

import { ExitHeaderComponent } from "../../global_components/organisms/headers/exit_header.component";
import { FlexibleContainer } from "../../global_components/containers/flexible_container";
import { theme } from "../../infrastructure/theme";
import { Text } from "../../infrastructure/typography/text.component";
import { Spacer } from "../../global_components/optimized.spacer.component";
import { GeneralFlexContainer } from "../../global_components/containers/general_flex_container";
import { AccountAndThingsTile } from "../../global_components/organisms/tiles/account_and_things_tile";

import { AuthenticationContext } from "../../infrastructure/services/authentication/authentication.context";

export const AccountAndThingsView = ({ navigation }) => {
  //   ****** DATA FROM AUTHENTICATION CONTEXT ************
  const { user } = useContext(AuthenticationContext);
  const { first_name, last_name } = user;
  const fullName = first_name + " " + last_name;

  const movingToMyTransactions = () => {
    navigation.navigate("My transactions");
  };
  const movingToHowYourMonthIsGoing = () => {
    navigation.navigate("How month is going");
  };

  return (
    <GeneralFlexContainer color={theme.colors.bg.p_FFFFFF}>
      <ExitHeaderComponent
        navigation={navigation}
        direction={"column"}
        color={theme.colors.bg.p_FFFFFF}
        // color={"#FAA"}
        flexibility={0.1}
      />

      {/* ********* */}
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
        flexibility={0.12}
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
          caption={user.email}
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
        color={theme.colors.bg.e_F4F4F4}
        // color={"lightblue"}
        direction="column"
        flexibility={0.23}
        justify={"center"}
        isBordered={false}
      >
        <AccountAndThingsTile
          caption={"My transactions"}
          navigation={navigation}
          icon_name={"TransactionsIcon"}
          active_icon={true}
          action={movingToMyTransactions}
        />
        <AccountAndThingsTile
          caption={"Check how your month is going"}
          navigation={navigation}
          icon_name={"SpendingIcon"}
          active_icon={true}
          //action={movingToHowYourMonthIsGoing}
          action={() => null}
        />
        <AccountAndThingsTile
          caption={"App preference"}
          navigation={navigation}
          icon_name={"PreferencesIcon"}
          active_icon={true}
        />
      </FlexibleContainer>
    </GeneralFlexContainer>
  );
};
