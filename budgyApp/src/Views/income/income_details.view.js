import React, { useContext } from "react";

import { TwoIconsHeaderComponent } from "../../global_components/organisms/headers/two_icons.header";
import { BackHeaderWithLabelComponent } from "../../global_components/organisms/headers/back_header_withLabel.component";
import { FlexibleContainer } from "../../global_components/containers/flexible_container";
import { theme } from "../../infrastructure/theme";
import { Text } from "../../infrastructure/typography/text.component";
import { Spacer } from "../../global_components/optimized.spacer.component";
import { GeneralFlexContainer } from "../../global_components/containers/general_flex_container";
import { InfoDetailsTile } from "../../global_components/organisms/tiles/info_details_tile";
import { ControlledContainer } from "../../global_components/containers/controlled_container";
import { RegularCTAButton } from "../../global_components/buttons/cta_btn";
import { SafeArea } from "../../global_components/safe-area.component";

import { RealIncomeContext } from "../../infrastructure/services/real_income/real_income.context";
import { ExpectedIncomeContext } from "../../infrastructure/services/expected _income/expected_income.context";

export const IncomeDetailsView = ({ navigation, route }) => {
  const { comingFrom } = route.params;
  console.log("COMING FROM AT INCOME DETAILS VIEW:", comingFrom);
  // ****************LOGIC FROM HOOK ********

  const {
    realIncomeForRequest,
    isLoading,
    registeringRealIncomeTransaction,
    registeringCashIncomeTransaction,
  } = useContext(RealIncomeContext);

  console.log(
    "REAL INCOME FOR REQUEST AT INCOME DETAILS VIEW:",
    realIncomeForRequest
  );

  const { week_name, earned_amount, month_year, app_name, logo_path } =
    realIncomeForRequest;

  const {
    expectedIncomeForRequest,
    isLoading: isLoadingForExpectedIncome,
    registeringExpectedIncomeTransaction,
  } = useContext(ExpectedIncomeContext);
  console.log(
    "EXPECTED INCOME FOR REQUEST AT INCOME DETAILS VIEW:",
    expectedIncomeForRequest
  );
  const { new_expected_income } = expectedIncomeForRequest;
  const { amount, month_year: month_year_expected } = new_expected_income;

  if (comingFrom === "Select_week_view") {
    return (
      <SafeArea background_color={theme.colors.bg.p_FFFFFF}>
        <GeneralFlexContainer color={theme.colors.bg.p_FFFFFF}>
          <BackHeaderWithLabelComponent
            navigation={navigation}
            caption=""
            direction={"row"}
            color={theme.colors.bg.p_FFFFFF}
            // color={"#FAD"}
            flexibility={0.1}
            action={() => navigation.goBack()}
            align="flex-end"
            caption_margin_left={"0%"}
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
              caption="Register"
              width={310}
              height={50}
              color={theme.colors.buttons.p_FC9827}
              borderRadius={50}
              //   action={() => postingTransactionProcess(navigation)}
              // action={() =>
              //   registeringRealIncomeTransaction(navigation, realIncomeForRequest)
              // }
              action={() =>
                comingFrom !== "comingFromCash"
                  ? registeringRealIncomeTransaction(
                      navigation,
                      realIncomeForRequest
                    )
                  : registeringCashIncomeTransaction(
                      navigation,
                      realIncomeForRequest
                    )
              }
              text_variant="bold_text_20"
              isLoading={isLoading}
            />
          </FlexibleContainer>
        </GeneralFlexContainer>
      </SafeArea>
    );
  }
  if (comingFrom === "comingFromCash") {
    return (
      <SafeArea background_color={theme.colors.bg.p_FFFFFF}>
        <GeneralFlexContainer color={theme.colors.bg.p_FFFFFF}>
          <BackHeaderWithLabelComponent
            navigation={navigation}
            caption=""
            direction={"row"}
            color={theme.colors.bg.p_FFFFFF}
            // color={"#FAD"}
            flexibility={0.1}
            action={() => navigation.goBack()}
            align="flex-end"
            caption_margin_left={"0%"}
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
              caption="Register"
              width={310}
              height={50}
              color={theme.colors.buttons.p_FC9827}
              borderRadius={50}
              //   action={() => postingTransactionProcess(navigation)}
              // action={() =>
              //   registeringRealIncomeTransaction(navigation, realIncomeForRequest)
              // }
              action={() =>
                comingFrom !== "comingFromCash"
                  ? registeringRealIncomeTransaction(
                      navigation,
                      realIncomeForRequest
                    )
                  : registeringCashIncomeTransaction(
                      navigation,
                      realIncomeForRequest
                    )
              }
              text_variant="bold_text_20"
              isLoading={isLoading}
            />
          </FlexibleContainer>
        </GeneralFlexContainer>
      </SafeArea>
    );
  }
  if (comingFrom === "addExpectedIncomeTile") {
    return (
      <SafeArea background_color={theme.colors.bg.p_FFFFFF}>
        <GeneralFlexContainer color={theme.colors.bg.p_FFFFFF}>
          <BackHeaderWithLabelComponent
            navigation={navigation}
            caption=""
            direction={"row"}
            color={theme.colors.bg.p_FFFFFF}
            // color={"#FAD"}
            flexibility={0.1}
            action={() => navigation.goBack()}
            align="flex-end"
            caption_margin_left={"0%"}
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
                <Text text_variant="bold_text_20">Summary</Text>
              </Spacer>
            </ControlledContainer>
          </ControlledContainer>

          <FlexibleContainer
            color={theme.colors.bg.e_F4F4F4}
            // color={"lightblue"}
            direction="column"
            // flexibility={description ? 0.46 : 0.53}
            flexibility={0.3}
            justify={"center"}
            isBordered={false}
          >
            <InfoDetailsTile
              caption={"Amount:"}
              // caption2={`$${amount}`}
              caption2={new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(amount)}
              // caption2={`$3,900.00`}
              navigation={navigation}
              icon_name={"EditIcon"}
              active_icon={true}
              action={() => null}
              icon_width={0}
              icon_height={0}
            />
            {/* <InfoDetailsTile
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
            icon_width={0}
            icon_height={0}
          /> */}
            <InfoDetailsTile
              caption={"Desc:"}
              caption2="Expected income"
              navigation={navigation}
              icon_name={"EditIcon"}
              active_icon={true}
              action={() => null}
              icon_width={0}
              icon_height={0}
            />
            <InfoDetailsTile
              caption={"For:"}
              caption2={`${month_year_expected}`}
              navigation={navigation}
              icon_name={"CalendarIcon"}
              active_icon={true}
              icon_width={0}
              icon_height={0}
              action={() => null}
            />
            {/* <InfoDetailsTile
            caption={"For:"}
            // caption2={"JUN 2024 - Week 3"}
            caption2={`${month_year} - ${week_name}`}
            navigation={navigation}
            icon_name={"CalendarIcon"}
            active_icon={true}
            icon_width={0}
            icon_height={0}
            action={() => null}
          /> */}
            {/* <InfoDetailsTile
            caption={"App:"}
            // caption2={"Uber"}
            caption2={app_name}
            navigation={navigation}
            icon_name={logo_path}
            active_icon={false}
            icon_width={25}
            icon_height={25}
            action={() => null}
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
              caption="Register"
              width={310}
              height={50}
              color={theme.colors.buttons.p_FC9827}
              borderRadius={50}
              //   action={() => postingTransactionProcess(navigation)}
              action={() =>
                registeringExpectedIncomeTransaction(
                  navigation,
                  expectedIncomeForRequest
                )
              }
              // action={() => null}
              text_variant="bold_text_20"
              isLoading={isLoadingForExpectedIncome}
            />
            {/* <RegularCTAButton
            caption="Register"
            width={310}
            height={50}
            color={theme.colors.buttons.p_FC9827}
            borderRadius={50}
            //   action={() => postingTransactionProcess(navigation)}
            // action={() =>
            //   registeringRealIncomeTransaction(navigation, realIncomeForRequest)
            // }
            action={() =>
              comingFrom !== "comingFromCash"
                ? registeringRealIncomeTransaction(
                    navigation,
                    realIncomeForRequest
                  )
                : registeringCashIncomeTransaction(
                    navigation,
                    realIncomeForRequest
                  )
            }
            text_variant="bold_text_20"
            isLoading={isLoading}
          /> */}
          </FlexibleContainer>
        </GeneralFlexContainer>
      </SafeArea>
    );
  }
};
