import React, { useContext } from "react";
import { Platform } from "react-native";

import { FlexibleContainer } from "../../global_components/containers/flexible_container";
import { theme } from "../../infrastructure/theme";
import { Text } from "../../infrastructure/typography/text.component";
import { RegularCTAButton } from "../../global_components/buttons/cta_btn";
import { SafeArea } from "../../global_components/safe-area.component";
import { IncomeAccordionComponent } from "../../global_components/organisms/animated components/income_accordion_component";
import { SVGComponent } from "../../global_components/image_components/svg.component";

import { RealIncomeContext } from "../../infrastructure/services/real_income/real_income.context";
import { ExpectedIncomeContext } from "../../infrastructure/services/expected _income/expected_income.context";
import { DateOperationsContext } from "../../infrastructure/services/date_operations/date_operations.context";

export const IncomeConfirmationView = ({ navigation, route }) => {
  // ****************LOGIC FROM HOOK ********
  const { comingFrom } = route.params;
  const { realIncomeForRequest, cleaningState } = useContext(RealIncomeContext);

  const { week_name, earned_amount, month_year, app_name, logo_path } =
    realIncomeForRequest;

  const { expectedIncomeForRequest } = useContext(ExpectedIncomeContext);
  const { new_expected_income } = expectedIncomeForRequest;
  const { amount, month_year: month_year_expected } = new_expected_income;

  const stringedEarnedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(earned_amount);

  const stringedExpectedIncomeAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);

  const {
    month_year: month_year_to_restablish,
    setMonthSelected,
    month_selected,
    month_name,
  } = useContext(DateOperationsContext);

  const goingHome = () => {
    setMonthSelected(month_name);
    cleaningState();
    navigation.reset({
      index: 0,
      routes: [{ name: "Home" }],
    });
  };

  return (
    <SafeArea background_color={theme.colors.bg.p_FFFFFF}>
      {comingFrom === "addExpectedIncomeTile" && (
        <>
          <FlexibleContainer
            color={theme.colors.bg.p_FFFFFF}
            // color={"lightblue"}
            direction="column"
            flexibility={Platform.OS === "android" ? 0.15 : 0.15}
            justify={"flex-end"}
            isBordered={false}
          >
            <Text text_variant="bold_text_20">Expected income done!</Text>
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
              icon_name={"RealIncomeIcon"}
              icon_color={"#000000"}
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
            <IncomeAccordionComponent
              navigation={navigation}
              stringedAmount={stringedExpectedIncomeAmount}
              month_year_and_week={month_year_expected}
              type={"expected_income"}
              //transaction_date={transaction_date}
            />
          </FlexibleContainer>
        </>
      )}
      {comingFrom === "Select_week_view" && (
        <>
          <FlexibleContainer
            color={theme.colors.bg.p_FFFFFF}
            // color={"lightblue"}
            direction="column"
            flexibility={Platform.OS === "android" ? 0.15 : 0.15}
            justify={"flex-end"}
            isBordered={false}
          >
            <Text text_variant="bold_text_20">New Real Income done!</Text>
            {/* <Text text_variant="bold_text_20">Transaction update done!</Text> */}
          </FlexibleContainer>
          <FlexibleContainer
            color={theme.colors.bg.p_FFFFFF}
            // color={"lightblue"}
            direction="column"
            flexibility={Platform.OS === "android" ? 0.7 : 0.7}
            justify={"center"}
            isBordered={false}
          >
            <SVGComponent
              icon_width={220}
              icon_height={220}
              position={"static"}
              justify={"center"}
              icon_name={"RealIncomeIcon"}
              icon_color={"#000000"}
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
            <IncomeAccordionComponent
              navigation={navigation}
              stringedAmount={stringedEarnedAmount}
              month_year_and_week={`${month_year} - ${week_name}`}
              app={app_name}
              type="real_income"
            />
          </FlexibleContainer>
        </>
      )}
      {comingFrom === "comingFromCash" && (
        <>
          <FlexibleContainer
            color={theme.colors.bg.p_FFFFFF}
            // color={"lightblue"}
            direction="column"
            flexibility={Platform.OS === "android" ? 0.15 : 0.15}
            justify={"flex-end"}
            isBordered={false}
          >
            <Text text_variant="bold_text_20">New cash income done!</Text>
            {/* <Text text_variant="bold_text_20">Transaction update done!</Text> */}
          </FlexibleContainer>
          <FlexibleContainer
            color={theme.colors.bg.p_FFFFFF}
            // color={"lightblue"}
            direction="column"
            flexibility={Platform.OS === "android" ? 0.7 : 0.7}
            justify={"center"}
            isBordered={false}
          >
            <SVGComponent
              icon_width={220}
              icon_height={220}
              position={"static"}
              justify={"center"}
              icon_name={"RealIncomeIcon"}
              icon_color={"#000000"}
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
            <IncomeAccordionComponent
              navigation={navigation}
              stringedAmount={stringedEarnedAmount}
              month_year_and_week={`${month_year}`}
              app={app_name}
              type="cash"
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
          action={() => goingHome(navigation)}
          text_variant="white_bold_text_16"
        />
      </FlexibleContainer>
    </SafeArea>
  );
};
