import React, { useContext, useEffect, useState } from "react";

import { NumPadContainer } from "./num_pad.styles";
import { Row } from "./num_pad.styles";
import { MonthOptionButton } from "../../buttons/month_option_button";
import { theme } from "../../../infrastructure/theme";
import { MonthPadContainer, Month_Row } from "./num_pad.styles";
import { DateOperationsContext } from "../../../infrastructure/services/date_operations/date_operations.context";
import { TransactionsContext } from "../../../infrastructure/services/transactions/transactions.context";

export const AmountsMonthsPadComponent = ({ selectingMonth, isChosen }) => {
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
            action={() => selectingMonth("January")}
            isDisabled={false}
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
            action={() => selectingMonth("February")}
            isDisabled={false}
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
            action={() => selectingMonth("March")}
            isDisabled={false}
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
            action={() => selectingMonth("April")}
            isDisabled={false}
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
            action={() => selectingMonth("May")}
            isDisabled={false}
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
            action={() => selectingMonth("June")}
            isDisabled={false}
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
            isActive={false}
            action={() => selectingMonth("July")}
            isDisabled={true}
          />
          <MonthOptionButton
            width={110}
            height={80}
            caption="Aug"
            color1={theme.colors.bg.s_142223C}
            color2={theme.colors.neutrals.t_F9F9FA}
            borderRadius={20}
            isActive={false}
            action={() => selectingMonth("August")}
            isDisabled={true}
          />
          <MonthOptionButton
            width={110}
            height={80}
            caption="Sep"
            color1={theme.colors.bg.s_142223C}
            color2={theme.colors.neutrals.t_F9F9FA}
            borderRadius={20}
            isActive={false}
            action={() => selectingMonth("September")}
            isDisabled={true}
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
            isActive={false}
            action={() => selectingMonth("October")}
            isDisabled={true}
          />
          <MonthOptionButton
            width={110}
            height={80}
            caption="Nov"
            color1={theme.colors.bg.s_142223C}
            color2={theme.colors.neutrals.t_F9F9FA}
            borderRadius={20}
            isActive={false}
            action={() => selectingMonth("November")}
            isDisabled={true}
          />
          <MonthOptionButton
            width={110}
            height={80}
            caption="Dec"
            color1={theme.colors.bg.s_142223C}
            color2={theme.colors.neutrals.t_F9F9FA}
            borderRadius={20}
            isActive={false}
            action={() => selectingMonth("December")}
            isDisabled={true}
          />
        </Month_Row>
      </MonthPadContainer>
    </>
  );
};
