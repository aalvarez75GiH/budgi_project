import React, { useContext, useEffect, useState } from "react";

import { NumPadContainer } from "./num_pad.styles";
import { Row } from "./num_pad.styles";
import { MonthOptionButton } from "../../buttons/month_option_button";
import { theme } from "../../../infrastructure/theme";
import { MonthPadContainer, Month_Row } from "./num_pad.styles";
import { DateOperationsContext } from "../../../infrastructure/services/date_operations/date_operations.context";
import { TransactionsContext } from "../../../infrastructure/services/transactions/transactions.context";

export const MonthsPadComponent = ({
  selectingMonth,
  isChosen,
  confirmingIfMonthIsEnabled,
}) => {
  return (
    <>
      <MonthPadContainer width={"350px"} height={"365px"} bg_color={"#FFFFFF"}>
        <Month_Row>
          <MonthOptionButton
            width={110}
            height={80}
            caption="Jan"
            color1={theme.colors.bg.s_142223C}
            color2={theme.colors.neutrals.t_F9F9FA}
            borderRadius={20}
            isChosen={
              isChosen.month_selected === "January" ? isChosen.isActive : false
            }
            action={
              !confirmingIfMonthIsEnabled("January")
                ? null
                : () => selectingMonth("January")
            }
            isDisabled={!confirmingIfMonthIsEnabled("January")}
          />
          <MonthOptionButton
            width={110}
            height={80}
            caption="Feb"
            color1={theme.colors.bg.s_142223C}
            color2={theme.colors.neutrals.t_F9F9FA}
            borderRadius={20}
            isChosen={
              isChosen.month_selected === "February" ? isChosen.isActive : false
            }
            action={
              !confirmingIfMonthIsEnabled("February")
                ? null
                : () => selectingMonth("February")
            }
            isDisabled={!confirmingIfMonthIsEnabled("February")}
          />
          <MonthOptionButton
            width={110}
            height={80}
            caption="Mar"
            color1={theme.colors.bg.s_142223C}
            color2={theme.colors.neutrals.t_F9F9FA}
            borderRadius={20}
            isChosen={
              isChosen.month_selected === "March" ? isChosen.isActive : false
            }
            action={
              !confirmingIfMonthIsEnabled("March")
                ? null
                : () => selectingMonth("March")
            }
            isDisabled={!confirmingIfMonthIsEnabled("March")}
          />
        </Month_Row>
        <Month_Row>
          <MonthOptionButton
            width={110}
            height={80}
            caption="Apr"
            color1={theme.colors.bg.s_142223C}
            color2={theme.colors.neutrals.t_F9F9FA}
            borderRadius={20}
            isChosen={
              isChosen.month_selected === "April" ? isChosen.isActive : false
            }
            action={
              !confirmingIfMonthIsEnabled("April")
                ? null
                : () => selectingMonth("April")
            }
            isDisabled={!confirmingIfMonthIsEnabled("April")}
          />
          <MonthOptionButton
            width={110}
            height={80}
            caption="May"
            color1={theme.colors.bg.s_142223C}
            color2={theme.colors.neutrals.t_F9F9FA}
            borderRadius={20}
            isChosen={
              isChosen.month_selected === "May" ? isChosen.isActive : false
            }
            action={
              !confirmingIfMonthIsEnabled("May")
                ? null
                : () => selectingMonth("May")
            }
            isDisabled={!confirmingIfMonthIsEnabled("May")}
          />
          <MonthOptionButton
            width={110}
            height={80}
            caption="Jun"
            color1={theme.colors.bg.s_142223C}
            color2={theme.colors.neutrals.t_F9F9FA}
            borderRadius={20}
            isChosen={
              isChosen.month_selected === "June" ? isChosen.isActive : false
            }
            isActive={false}
            action={
              !confirmingIfMonthIsEnabled("June")
                ? null
                : () => selectingMonth("June")
            }
            isDisabled={!confirmingIfMonthIsEnabled("June")}
          />
        </Month_Row>
        <Month_Row>
          <MonthOptionButton
            width={110}
            height={80}
            caption="Jul"
            color1={theme.colors.bg.s_142223C}
            color2={theme.colors.neutrals.t_F9F9FA}
            borderRadius={20}
            isChosen={
              isChosen.month_selected === "July" ? isChosen.isActive : false
            }
            isActive={false}
            action={
              !confirmingIfMonthIsEnabled("July")
                ? null
                : () => selectingMonth("July")
            }
            isDisabled={!confirmingIfMonthIsEnabled("July")}
          />
          <MonthOptionButton
            width={110}
            height={80}
            caption="Aug"
            color1={theme.colors.bg.s_142223C}
            color2={theme.colors.neutrals.t_F9F9FA}
            borderRadius={20}
            isChosen={
              isChosen.month_selected === "August" ? isChosen.isActive : false
            }
            isActive={false}
            action={
              !confirmingIfMonthIsEnabled("August")
                ? null
                : () => selectingMonth("August")
            }
            isDisabled={!confirmingIfMonthIsEnabled("August")}
          />
          <MonthOptionButton
            width={110}
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
            action={
              !confirmingIfMonthIsEnabled("September")
                ? null
                : () => selectingMonth("September")
            }
            isDisabled={!confirmingIfMonthIsEnabled("September")}
          />
        </Month_Row>
        <Month_Row>
          <MonthOptionButton
            width={110}
            height={80}
            caption="Oct"
            color1={theme.colors.bg.s_142223C}
            color2={theme.colors.neutrals.t_F9F9FA}
            borderRadius={20}
            isChosen={
              isChosen.month_selected === "October" ? isChosen.isActive : false
            }
            isActive={false}
            action={
              !confirmingIfMonthIsEnabled("October")
                ? null
                : () => selectingMonth("October")
            }
            isDisabled={!confirmingIfMonthIsEnabled("October")}
          />
          <MonthOptionButton
            width={110}
            height={80}
            caption="Nov"
            color1={theme.colors.bg.s_142223C}
            color2={theme.colors.neutrals.t_F9F9FA}
            borderRadius={20}
            isChosen={
              isChosen.month_selected === "November" ? isChosen.isActive : false
            }
            isActive={false}
            action={
              !confirmingIfMonthIsEnabled("November")
                ? null
                : () => selectingMonth("November")
            }
            isDisabled={!confirmingIfMonthIsEnabled("November")}
          />
          <MonthOptionButton
            width={110}
            height={80}
            caption="Dec"
            color1={theme.colors.bg.s_142223C}
            color2={theme.colors.neutrals.t_F9F9FA}
            borderRadius={20}
            isChosen={
              isChosen.month_selected === "December" ? isChosen.isActive : false
            }
            isActive={false}
            action={
              !confirmingIfMonthIsEnabled("December")
                ? null
                : () => selectingMonth("December")
            }
            isDisabled={!confirmingIfMonthIsEnabled("December")}
          />
        </Month_Row>
      </MonthPadContainer>
    </>
  );
};
