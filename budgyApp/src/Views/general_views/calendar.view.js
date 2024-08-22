import React from "react";
import { Platform } from "react-native";
import CalendarPicker from "react-native-calendar-picker-scrollable-fix";

import { theme } from "../../infrastructure/theme";
import { GeneralFlexContainer } from "../../global_components/containers/general_flex_container";
import { BackHeaderComponent } from "../../global_components/organisms/headers/back_header.component";
import { FlexibleContainer } from "../../global_components/containers/flexible_container";
import { RegularCTAButton } from "../../global_components/buttons/cta_btn";
import { Spacer } from "../../global_components/optimized.spacer.component";
import { useCalendarLogic } from "../../hooks/useCalendarLogic";

export const GeneralCalendarView = ({ navigation, route }) => {
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
    <GeneralFlexContainer color={"white"}>
      <BackHeaderComponent
        navigation={navigation}
        flexibility={1}
        width={"50%"}
        height={"15%"}
        direction={"column"}
        color={theme.colors.bg.p_FFFFFF}
        action={() =>
          backHeaderAction(
            navigation,
            setButton1Pressed,
            setButton2Pressed,
            comingFrom
          )
        }
        // color={"#FAD"}
      />
      <FlexibleContainer
        //   color={theme.colors.bg.e_F4F4F4}
        color={"white"}
        direction="row"
        flexibility={1.2}
        justify={"center"}
        isBordered={false}
      >
        <CalendarPicker
          maxDate={new Date()}
          onDateChange={(date) => onDateChange(date, comingFrom)}
          todayTextStyle={{
            color: "#14223C",
            fontFamily: theme.fonts.bold,
            textDecorationLine: "underline",
          }}
          todayBackgroundColor="#FFFFFF"
          selectedDayColor="#14223C"
          selectedDayTextColor="#FFFFFF"
          textStyle={{ fontFamily: theme.fonts.bold, fontSize: 14 }}
          width={410}
          height={410}
          scrollable={Platform.OS === "android" ? false : true}
          dayLabelsWrapper={{ borderBottomColor: "#FFFFFF" }}
          monthTitleStyle={{
            fontSize: 20,
            color: theme.colors.neutrals.p_B7B7B7,
          }}
          yearTitleStyle={{
            fontSize: 20,
            color: theme.colors.neutrals.p_B7B7B7,
          }}
        />
      </FlexibleContainer>
      <Spacer position="top" size="extraLarge" />
      <Spacer position="top" size="extraLarge" />
      <Spacer position="top" size="extraLarge" />
      <FlexibleContainer
        color={theme.colors.bg.p_FFFFFF}
        // color={"red"}
        direction="column"
        flexibility={1.7}
        justify={"space-evenly"}
        isBordered={false}
      >
        <Spacer position="top" size="xxl" />
        {selected ? (
          <RegularCTAButton
            caption="Set new date"
            width={310}
            height={50}
            color={theme.colors.buttons.p_FC9827}
            borderRadius={50}
            action={
              comingFrom === "TransactionSummaryView"
                ? () =>
                    comingBackToSummary(
                      navigation,
                      setButton1Pressed,
                      setButton2Pressed
                    )
                : () => movingBackToTransactionDetails(navigation)
              // () =>
              //   navigation.navigate("Transaction_details_view", {
              //     comingFrom: "AnyTransactionDetailsView",
              //   })
            }
            text_variant="bold_text_20"
          />
        ) : null}
      </FlexibleContainer>
    </GeneralFlexContainer>
  );
};
