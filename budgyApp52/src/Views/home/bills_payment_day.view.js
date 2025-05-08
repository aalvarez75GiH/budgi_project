import React, { useContext } from "react";
import { Platform } from "react-native";
import CalendarPicker from "react-native-calendar-picker-scrollable-fix";

import { theme } from "../../infrastructure/theme";
import { GeneralFlexContainer } from "../../global_components/containers/general_flex_container";
import { BackHeaderComponent } from "../../global_components/organisms/headers/back_header.component";
import { FlexibleContainer } from "../../global_components/containers/flexible_container";
import { RegularCTAButton } from "../../global_components/buttons/cta_btn";
import { Spacer } from "../../global_components/optimized.spacer.component";
import { useCalendarLogic } from "../../hooks/useCalendarLogic";
import { BackHeaderWithLabelAndCancelButton } from "../../global_components/organisms/headers/back_header+label+cancel.header";
import { BillPaymentDayNumPadComponent } from "../../global_components/organisms/pads/bill_payment_day_num_pad";
import { Text } from "../../infrastructure/typography/text.component";
import { SafeArea } from "../../global_components/safe-area.component";

import { HomeContext } from "../../infrastructure/services/Home services/home.context";

export const BillsPaymentDayView = ({ navigation, route }) => {
  const { exitingToRoot, billDayChosen } = useContext(HomeContext);
  const { setButton1Pressed, setButton2Pressed, comingFrom } = route.params;
  console.log("COMING FROM AT CALENDAR VIEW:", comingFrom);
  const {
    comingBackToSummary,
    movingBackToTransactionDetails,
    backHeaderAction,
    onDateChange,
    selected,
  } = useCalendarLogic();

  return (
    <SafeArea background_color={"#FFFFFF"}>
      <GeneralFlexContainer color={"white"}>
        <BackHeaderWithLabelAndCancelButton
          caption=""
          direction={"row"}
          color={theme.colors.bg.p_FFFFFF}
          //   color={"red"}
          flexibility={0.6}
          arrow_left_action={() => navigation.goBack()}
          // cancel_button_action={() => navigation.popToTop()}
          cancel_button_action={() => exitingToRoot(navigation)}
          align={"center"}
          // color={"#FAA"}
        />
        <FlexibleContainer
          //   color={"lightgreen"}
          color={"white"}
          direction="row"
          flexibility={0.8}
          justify={"center"}
          alignment={"center"}
          isBordered={true}
        >
          <Text text_variant={"bold_text_20"}>
            Day of the month that you pay this bill?
          </Text>
        </FlexibleContainer>
        <FlexibleContainer
          //   color={"brown"}
          color={theme.colors.bg.p_FFFFFF}
          direction="row"
          flexibility={3.4}
          justify={"center"}
          isBordered={false}
        >
          <BillPaymentDayNumPadComponent />
        </FlexibleContainer>
        <FlexibleContainer
          color={theme.colors.bg.p_FFFFFF}
          //   color={"lightblue"}
          direction="column"
          flexibility={0.8}
          justify={"space-evenly"}
          isBordered={false}
        >
          {/* <Spacer position="top" size="xxl" /> */}
          {billDayChosen.isActive ? (
            <RegularCTAButton
              caption="Next"
              width={310}
              height={50}
              color={theme.colors.buttons.p_FC9827}
              borderRadius={50}
              action={() => navigation.navigate("bill_summary_view")}
              //   action={
              //     comingFrom === "TransactionSummaryView"
              //       ? () =>
              //           comingBackToSummary(
              //             navigation,
              //             setButton1Pressed,
              //             setButton2Pressed
              //           )
              //       : () => movingBackToTransactionDetails(navigation)
              //     // () =>
              //     //   navigation.navigate("Transaction_details_view", {
              //     //     comingFrom: "AnyTransactionDetailsView",
              //     //   })
              //   }
              text_variant="bold_text_20"
            />
          ) : null}
        </FlexibleContainer>
      </GeneralFlexContainer>
    </SafeArea>
  );
};
