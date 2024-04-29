import React, { useContext, useEffect, useState } from "react";

import { ExitHeaderComponent } from "../../global_components/organisms/headers/exit_header.component";
import { FlexibleContainer } from "../../global_components/containers/flexible_container";
import { theme } from "../../infrastructure/theme";
import { Text } from "../../infrastructure/typography/text.component";
import { Spacer } from "../../global_components/optimized.spacer.component";
import { GeneralFlexContainer } from "../../global_components/containers/general_flex_container";
import { InfoDetailsTile } from "../../global_components/organisms/tiles/info_details_tile";
import { ControlledContainer } from "../../global_components/containers/controlled_container";
import { DescriptionTile } from "../../global_components/organisms/tiles/description_tile";
import { RegularCTAButton } from "../../global_components/buttons/cta_btn";

import { TransactionsContext } from "../../infrastructure/services/transactions/transactions.context";
import { AuthenticationContext } from "../../infrastructure/services/authentication/authentication.context";

export const AnyTransactionDetailsView = ({ navigation, route }) => {
  const { user } = useContext(AuthenticationContext);
  const { user_id } = user;

  //  ***** Transactions context consumption
  const {
    fixingANumberToTwoDecimalsAndString,
    transactionInfoForUpdate,
    updatingTransaction,
    isLoading,
  } = useContext(TransactionsContext);

  console.log(
    "TRANSACTION FOR UPDATE AT DETAILS:",
    JSON.stringify(transactionInfoForUpdate, null, 2)
  );

  const { amount, transaction_date, short_name, description, month_year } =
    transactionInfoForUpdate;

  console.log("USER ID AT ANY TRANSACTION DETAILS:", user_id);
  console.log("MONTH YEAR AT ANY TRANSACTION DETAILS:", month_year);

  // ****** Here we are parsing amount to integer for request to transaction end point
  const stringedAmount = fixingANumberToTwoDecimalsAndString(amount);

  const movingForwardToAddDescription = () => {
    navigation.navigate("AddDescription_view");
  };

  const updatingTransactionProcess = async () => {
    const response = await updatingTransaction();
    console.log(
      "RESPONSE FROM UPDATING TRANSACTION:",
      JSON.stringify(response, null, 2)
    );
    // response ? listenForNewChangesAtDB() : null;
    response ? navigation.navigate("My transactions") : null;
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

      <FlexibleContainer
        // color={"#898989"}
        color={theme.colors.bg.p_FFFFFF}
        direction="row"
        flexibility={0.008}
        justify={"flex-start"}
        isBordered={false}
      ></FlexibleContainer>
      <ControlledContainer
        color={theme.colors.bg.p_FFFFFF}
        // color={"red"}
        width={"100%"}
        height={"100px"}
        justify="center"
        alignment="flex-start"
      >
        <ControlledContainer
          // color={theme.colors.bg.p_FFFFFF}
          // color={"red"}
          width={"100%"}
          height={"50px"}
          justify="center"
          alignment="flex-start"
        >
          <Spacer position="left" size="extraLarge">
            <Text text_variant="bold_text_20">Transaction info</Text>
          </Spacer>
        </ControlledContainer>
      </ControlledContainer>

      <FlexibleContainer
        color={theme.colors.bg.e_F4F4F4}
        // color={"lightblue"}
        direction="column"
        flexibility={description ? 0.46 : 0.53}
        justify={"center"}
        isBordered={false}
      >
        <InfoDetailsTile
          caption={"Amount:"}
          caption2={`$${stringedAmount}`}
          navigation={navigation}
          icon_name={"EditIcon"}
          active_icon={true}
          action={() => {
            navigation.navigate("Enter_amount_view");
          }}
          icon_width={25}
          icon_height={25}
        />
        <InfoDetailsTile
          caption={"Category:"}
          caption2={short_name}
          navigation={navigation}
          icon_name={"EditIcon"}
          active_icon={true}
          action={() => null}
          icon_width={25}
          icon_height={25}
        />
        <InfoDetailsTile
          caption={"Exp. date:"}
          caption2={transaction_date}
          navigation={navigation}
          icon_name={"CalendarIcon"}
          active_icon={true}
          icon_width={25}
          icon_height={25}
          action={() => null}
        />

        <DescriptionTile
          width="100%"
          heigh="50%"
          description={description}
          action={movingForwardToAddDescription}
        />
      </FlexibleContainer>
      <FlexibleContainer
        color={theme.colors.bg.p_FFFFFF}
        // color={"lightblue"}
        direction="column"
        flexibility={description ? 0.46 : 0.53}
        justify={"center"}
        isBordered={false}
      >
        <RegularCTAButton
          caption="Update"
          width={310}
          height={50}
          color={theme.colors.buttons.p_FC9827}
          borderRadius={50}
          action={updatingTransactionProcess}
          // action={() => null}
          text_variant="bold_text_20"
          isLoading={isLoading}
        />
      </FlexibleContainer>
    </GeneralFlexContainer>
  );
};
