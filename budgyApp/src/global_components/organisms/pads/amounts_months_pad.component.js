import React from "react";

import { AmountMonthOptionButton } from "../../buttons/amounts_month_option_button";
import { theme } from "../../../infrastructure/theme";
import { MonthPadContainer, Month_Row } from "./num_pad.styles";

export const AmountsMonthsPadComponent = ({
  selectingMonth,
  isChosen,
  comingFrom,
  confirmingIfMonthIsEnabled,
}) => {
  console.log("IS CHOSEN AT AMOUNTS MONTHS PAD COMPONENT:", isChosen);
  return (
    <>
      <MonthPadContainer width={"350px"} height={"365px"} bg_color={"#FFFFFF"}>
        <Month_Row>
          <AmountMonthOptionButton
            width={115}
            height={80}
            caption="Jan"
            color1={theme.colors.bg.s_142223C}
            color2={theme.colors.neutrals.t_F9F9FA}
            borderRadius={20}
            isChosen={
              isChosen.month_selected === "January" ? isChosen.isActive : false
            }
            // action={() => selectingMonth("January")}
            action={
              !confirmingIfMonthIsEnabled("January")
                ? null
                : () => selectingMonth("January")
            }
            // isDisabled={false}
            isDisabled={!confirmingIfMonthIsEnabled("January")}
            // realIncomes={realIncomes}
            month_name="January"
            comingFrom={comingFrom}
          />
          <AmountMonthOptionButton
            width={115}
            height={80}
            caption="Feb"
            color1={theme.colors.bg.s_142223C}
            color2={theme.colors.neutrals.t_F9F9FA}
            borderRadius={20}
            isChosen={
              isChosen.month_selected === "February" ? isChosen.isActive : false
            }
            // action={() => selectingMonth("February")}
            action={
              !confirmingIfMonthIsEnabled("February")
                ? null
                : () => selectingMonth("February")
            }
            // isDisabled={false}
            isDisabled={!confirmingIfMonthIsEnabled("February")}
            // realIncomes={realIncomes}
            month_name="February"
            comingFrom={comingFrom}
          />
          <AmountMonthOptionButton
            width={115}
            height={80}
            caption="Mar"
            color1={theme.colors.bg.s_142223C}
            color2={theme.colors.neutrals.t_F9F9FA}
            borderRadius={20}
            isChosen={
              isChosen.month_selected === "March" ? isChosen.isActive : false
            }
            // action={() => selectingMonth("March")}
            action={
              !confirmingIfMonthIsEnabled("March")
                ? null
                : () => selectingMonth("March")
            }
            // isDisabled={false}
            isDisabled={!confirmingIfMonthIsEnabled("March")}
            // realIncomes={realIncomes}
            month_name="March"
            comingFrom={comingFrom}
          />
        </Month_Row>
        <Month_Row>
          <AmountMonthOptionButton
            width={115}
            height={80}
            caption="Apr"
            color1={theme.colors.bg.s_142223C}
            color2={theme.colors.neutrals.t_F9F9FA}
            borderRadius={20}
            isChosen={
              isChosen.month_selected === "April" ? isChosen.isActive : false
            }
            // action={() => selectingMonth("April")}
            action={
              !confirmingIfMonthIsEnabled("April")
                ? null
                : () => selectingMonth("April")
            }
            // isDisabled={false}
            isDisabled={!confirmingIfMonthIsEnabled("April")}
            // realIncomes={realIncomes}
            month_name="April"
            comingFrom={comingFrom}
          />
          <AmountMonthOptionButton
            width={115}
            height={80}
            caption="May"
            color1={theme.colors.bg.s_142223C}
            color2={theme.colors.neutrals.t_F9F9FA}
            borderRadius={20}
            isChosen={
              isChosen.month_selected === "May" ? isChosen.isActive : false
            }
            // action={() => selectingMonth("May")}
            action={
              !confirmingIfMonthIsEnabled("May")
                ? null
                : () => selectingMonth("May")
            }
            // isDisabled={false}
            isDisabled={!confirmingIfMonthIsEnabled("May")}
            // realIncomes={realIncomes}
            month_name="May"
            comingFrom={comingFrom}
          />
          <AmountMonthOptionButton
            width={115}
            height={80}
            caption="Jun"
            color1={theme.colors.bg.s_142223C}
            color2={theme.colors.neutrals.t_F9F9FA}
            borderRadius={20}
            isChosen={
              isChosen.month_selected === "June" ? isChosen.isActive : false
            }
            isActive={false}
            // action={() => selectingMonth("June")}
            action={
              !confirmingIfMonthIsEnabled("June")
                ? null
                : () => selectingMonth("June")
            }
            // isDisabled={false}
            isDisabled={!confirmingIfMonthIsEnabled("June")}
            // realIncomes={realIncomes}
            month_name="June"
            comingFrom={comingFrom}
          />
        </Month_Row>
        <Month_Row>
          <AmountMonthOptionButton
            width={115}
            height={80}
            caption="Jul"
            color1={theme.colors.bg.s_142223C}
            color2={theme.colors.neutrals.t_F9F9FA}
            borderRadius={20}
            isChosen={
              isChosen.month_selected === "July" ? isChosen.isActive : false
            }
            isActive={false}
            // action={() => selectingMonth("July")}
            action={
              !confirmingIfMonthIsEnabled("July")
                ? null
                : () => selectingMonth("July")
            }
            // isDisabled={true}
            isDisabled={!confirmingIfMonthIsEnabled("July")}
            // realIncomes={realIncomes}
            month_name="July"
            comingFrom={comingFrom}
          />
          <AmountMonthOptionButton
            width={115}
            height={80}
            caption="Aug"
            color1={theme.colors.bg.s_142223C}
            color2={theme.colors.neutrals.t_F9F9FA}
            borderRadius={20}
            isChosen={
              isChosen.month_selected === "August" ? isChosen.isActive : false
            }
            isActive={false}
            // action={() => selectingMonth("August")}
            action={
              !confirmingIfMonthIsEnabled("August")
                ? null
                : () => selectingMonth("August")
            }
            // isDisabled={true}
            isDisabled={!confirmingIfMonthIsEnabled("August")}
            // realIncomes={realIncomes}
            month_name="August"
            comingFrom={comingFrom}
          />
          <AmountMonthOptionButton
            width={115}
            height={80}
            caption="Sep"
            color1={theme.colors.bg.s_142223C}
            color2={theme.colors.neutrals.t_F9F9FA}
            borderRadius={20}
            isChosen={
              isChosen.month_selected === "September"
                ? isChosen.isActive
                : false
            }
            isActive={false}
            // action={() => selectingMonth("September")}
            action={
              !confirmingIfMonthIsEnabled("September")
                ? null
                : () => selectingMonth("September")
            }
            // isDisabled={true}
            isDisabled={!confirmingIfMonthIsEnabled("September")}
            // realIncomes={realIncomes}
            month_name="September"
            comingFrom={comingFrom}
          />
        </Month_Row>
        <Month_Row>
          <AmountMonthOptionButton
            width={115}
            height={80}
            caption="Oct"
            color1={theme.colors.bg.s_142223C}
            color2={theme.colors.neutrals.t_F9F9FA}
            borderRadius={20}
            isChosen={
              isChosen.month_selected === "October" ? isChosen.isActive : false
            }
            isActive={false}
            // action={() => selectingMonth("October")}
            action={
              !confirmingIfMonthIsEnabled("October")
                ? null
                : () => selectingMonth("October")
            }
            // isDisabled={true}
            isDisabled={!confirmingIfMonthIsEnabled("October")}
            // realIncomes={realIncomes}
            month_name="October"
            comingFrom={comingFrom}
          />
          <AmountMonthOptionButton
            width={115}
            height={80}
            caption="Nov"
            color1={theme.colors.bg.s_142223C}
            color2={theme.colors.neutrals.t_F9F9FA}
            borderRadius={20}
            isChosen={
              isChosen.month_selected === "November" ? isChosen.isActive : false
            }
            isActive={false}
            // action={() => selectingMonth("November")}
            action={
              !confirmingIfMonthIsEnabled("November")
                ? null
                : () => selectingMonth("November")
            }
            // isDisabled={true}
            isDisabled={!confirmingIfMonthIsEnabled("November")}
            // realIncomes={realIncomes}
            month_name="November"
            comingFrom={comingFrom}
          />
          <AmountMonthOptionButton
            width={115}
            height={80}
            caption="Dec"
            color1={theme.colors.bg.s_142223C}
            color2={theme.colors.neutrals.t_F9F9FA}
            borderRadius={20}
            isChosen={
              isChosen.month_selected === "December" ? isChosen.isActive : false
            }
            isActive={false}
            // action={() => selectingMonth("December")}
            action={
              !confirmingIfMonthIsEnabled("December")
                ? null
                : () => selectingMonth("December")
            }
            // isDisabled={true}
            isDisabled={!confirmingIfMonthIsEnabled("December")}
            // realIncomes={realIncomes}
            month_name="December"
            comingFrom={comingFrom}
          />
        </Month_Row>
      </MonthPadContainer>
    </>
  );
};
