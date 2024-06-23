import React, { useContext } from "react";

import { FlexibleContainer } from "../../global_components/containers/flexible_container";
import { theme } from "../../infrastructure/theme";
import { Text } from "../../infrastructure/typography/text.component";
import { Spacer } from "../../global_components/optimized.spacer.component";
import { GeneralFlexContainer } from "../../global_components/containers/general_flex_container";
import { InfoDetailsTile } from "../../global_components/organisms/tiles/info_details_tile";
import { ControlledContainer } from "../../global_components/containers/controlled_container";
import { RegularCTAButton } from "../../global_components/buttons/cta_btn";
import { DoneHeaderComponent } from "../../global_components/organisms/headers/done_heaer.component";
import { SafeArea } from "../../global_components/safe-area.component";

import { RealIncomeContext } from "../../infrastructure/services/real_income/real_income.context";

export const IncomeConfirmationView = ({ navigation }) => {
  // ****************LOGIC FROM HOOK ********

  const { realIncomeForRequest, isLoading, setIsLoading, cleaningState } =
    useContext(RealIncomeContext);

  console.log(
    "REAL INCOME FOR REQUEST AT INCOME DETAILS VIEW:",
    realIncomeForRequest
  );

  const { week_name, earned_amount, month_year, app_name, logo_path } =
    realIncomeForRequest;

  const goingHome = () => {
    cleaningState();
    navigation.reset({
      index: 0,
      routes: [{ name: "Home" }],
    });
  };

  return (
    <SafeArea background_color={theme.colors.bg.p_FFFFFF}>
      <GeneralFlexContainer color={theme.colors.bg.p_FFFFFF}>
        <DoneHeaderComponent
          action={() => goingHome(navigation)}
          direction={"row"}
          color={theme.colors.bg.p_FFFFFF}
          flexibility={0.1}
          //   color={"#FAD"}
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
              <Text text_variant="bold_text_20">Income summary</Text>
            </Spacer>
          </ControlledContainer>
        </ControlledContainer>

        <FlexibleContainer
          color={theme.colors.bg.e_F4F4F4}
          // color={"lightblue"}
          direction="column"
          flexibility={0.4}
          justify={"center"}
          isBordered={false}
        >
          <InfoDetailsTile
            caption={"Amount:"}
            caption2={`$${earned_amount}`}
            navigation={navigation}
            icon_name={"EditIcon"}
            active_icon={false}
            action={() => {
              navigation.navigate("Enter_amount_view", {
                comingFrom: "income_details_view",
              });
            }}
            icon_width={0}
            icon_height={0}
          />
          <InfoDetailsTile
            caption={"Desc:"}
            caption2="New real income"
            navigation={navigation}
            icon_name={"EditIcon"}
            active_icon={true}
            action={() => null}
            icon_width={0}
            icon_height={0}
          />
          <InfoDetailsTile
            caption={"For:"}
            // caption2={"JUN 2024 - Week 3"}
            caption2={`${month_year} - ${week_name}`}
            navigation={navigation}
            icon_name={"CalendarIcon"}
            active_icon={true}
            icon_width={0}
            icon_height={0}
            action={() => null}
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
          />
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
            caption="Done"
            width={290}
            height={60}
            color={theme.colors.buttons.t_E5E5E5}
            borderRadius={0}
            action={goingHome}
            text_variant="bold_text_16"
          />
        </FlexibleContainer>
      </GeneralFlexContainer>
    </SafeArea>
  );
};
