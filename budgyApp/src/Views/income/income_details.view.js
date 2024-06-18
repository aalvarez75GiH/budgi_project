import React, { useContext } from "react";

import { TwoIconsHeaderComponent } from "../../global_components/organisms/headers/two_icons.header";
import { FlexibleContainer } from "../../global_components/containers/flexible_container";
import { theme } from "../../infrastructure/theme";
import { Text } from "../../infrastructure/typography/text.component";
import { Spacer } from "../../global_components/optimized.spacer.component";
import { GeneralFlexContainer } from "../../global_components/containers/general_flex_container";
import { InfoDetailsTile } from "../../global_components/organisms/tiles/info_details_tile";
import { ControlledContainer } from "../../global_components/containers/controlled_container";
import { DescriptionTile } from "../../global_components/organisms/tiles/description_tile";
import { RegularCTAButton } from "../../global_components/buttons/cta_btn";
import { useAnyTransactionDetailsLogic } from "../../hooks/useAnyTransactionDetailsLogic";
import { useMonthPadLogic } from "../../hooks/useMonthPadLogic";
import { registerRealIncomeRequest } from "../../infrastructure/services/real_income/real_income.services";

import { RealIncomeContext } from "../../infrastructure/services/real_income/real_income.context";

export const IncomeDetailsView = ({ navigation, route }) => {
  // ****************LOGIC FROM HOOK ********

  const {
    realIncomeForRequest,
    registeringRealIncome,
    isLoading,
    setIsLoading,
  } = useContext(RealIncomeContext);

  console.log(
    "REAL INCOME FOR REQUEST AT INCOME DETAILS VIEW:",
    realIncomeForRequest
  );

  const { week_name, earned_amount, month_year, app_name, logo_path } =
    realIncomeForRequest;

  const closingMenu = (navigation) => {
    navigation.goBack();
  };

  const registeringTransaction = async (realIncomeForRequest) => {
    console.log("REAL INCOME FOR REQUEST BEFORE LIVING:", realIncomeForRequest);
    setIsLoading(true);
    setTimeout(async () => {
      try {
        const response = await registerRealIncomeRequest(realIncomeForRequest);
        // console.log("RESPONSE:", JSON.stringify(response, null, 2));
        response ? setIsLoading(false) : setIsLoading(true);

        // navigation.navigate("Transaction_confirmation");
      } catch (error) {
        console.log("THERE WAS AN ERROR:", error);
      }
    }, 3000);
  };
  return (
    <GeneralFlexContainer color={theme.colors.bg.p_FFFFFF}>
      <TwoIconsHeaderComponent
        navigation={navigation}
        direction={"row"}
        color={theme.colors.bg.p_FFFFFF}
        // color={"#FAA"}
        flexibility={0.12}
        action_icon_right={() =>
          movingForwardToDeleteConfirmationView(
            navigation,
            "Delete_confirmation_view"
            // transaction_id
          )
        }
        action_icon_left={() => closingMenu(navigation)}
        icon_name_right={"RemoveIcon"}
        icon_name_left={"ExitIcon"}
      />

      <ControlledContainer
        color={theme.colors.bg.p_FFFFFF}
        // color={"red"}
        width={"100%"}
        height={"100px"}
        justify="center"
        alignment="flex-start"
      >
        <ControlledContainer
          color={theme.colors.bg.p_FFFFFF}
          // color={"red"}
          width={"100%"}
          height={"100px"}
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
        // flexibility={description ? 0.46 : 0.53}
        flexibility={0.4}
        justify={"center"}
        isBordered={false}
      >
        <InfoDetailsTile
          caption={"Amount:"}
          //   caption2={`$${stringedAmount}`}
          caption2={`$${earned_amount}`}
          navigation={navigation}
          icon_name={"EditIcon"}
          active_icon={true}
          action={() => {
            navigation.navigate("Enter_amount_view", {
              comingFrom: "income_details_view",
            });
          }}
          icon_width={25}
          icon_height={25}
        />
        <InfoDetailsTile
          caption={"Desc:"}
          caption2="New real income"
          navigation={navigation}
          icon_name={"EditIcon"}
          active_icon={true}
          action={() => null}
          icon_width={25}
          icon_height={25}
        />
        <InfoDetailsTile
          caption={"For:"}
          // caption2={"JUN 2024 - Week 3"}
          caption2={`${month_year} - ${week_name}`}
          navigation={navigation}
          icon_name={"CalendarIcon"}
          active_icon={true}
          icon_width={25}
          icon_height={25}
          action={() => null}
          //   action={() =>
          //     movingForwardToGeneralCalendarView(
          //       navigation,
          //       "General_calendar_view",
          //       "AnyTransactionDetailsView"
          //     )
          //   }
        />
        <InfoDetailsTile
          caption={"App:"}
          // caption2={"Uber"}
          caption2={app_name}
          navigation={navigation}
          icon_name={logo_path}
          active_icon={false}
          icon_width={25}
          icon_height={25}
          action={() => null}
          //   action={() =>
          //     movingForwardToGeneralCalendarView(
          //       navigation,
          //       "General_calendar_view",
          //       "AnyTransactionDetailsView"
          //     )
          //   }
        />

        {/* <DescriptionTile
          width="100%"
          heigh="50%"
          description={description}
          action={() =>
            movingForwardToAddDescription(
              navigation,
              "General_AddDescription_view",
              "AnyTransactionDetailsView"
            )
          }
        /> */}
      </FlexibleContainer>
      <FlexibleContainer
        color={theme.colors.bg.p_FFFFFF}
        // color={"brown"}
        direction="column"
        // flexibility={description ? 0.46 : 0.53}
        flexibility={0.46}
        justify={"center"}
        isBordered={false}
      >
        <RegularCTAButton
          caption="Set real income"
          width={310}
          height={50}
          color={theme.colors.buttons.p_FC9827}
          borderRadius={50}
          //   action={() => postingTransactionProcess(navigation)}
          action={() => registeringTransaction(realIncomeForRequest)}
          text_variant="bold_text_20"
          isLoading={isLoading}
        />
      </FlexibleContainer>
    </GeneralFlexContainer>
  );
};
