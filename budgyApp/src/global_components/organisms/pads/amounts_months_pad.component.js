import React from "react";

import { AmountMonthOptionButton } from "../../buttons/amounts_month_option_button";
import { theme } from "../../../infrastructure/theme";
import { MonthPadContainer, Month_Row } from "./num_pad.styles";

export const AmountsMonthsPadComponent = ({
  selectingMonth,
  isChosen,
  comingFrom,
  //   realIncomes,
}) => {
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
            action={() => selectingMonth("January")}
            isDisabled={false}
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
            action={() => selectingMonth("February")}
            isDisabled={false}
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
            action={() => selectingMonth("March")}
            isDisabled={false}
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
            action={() => selectingMonth("April")}
            isDisabled={false}
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
            action={() => selectingMonth("May")}
            isDisabled={false}
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
            action={() => selectingMonth("June")}
            isDisabled={false}
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
            isActive={false}
            action={() => selectingMonth("July")}
            isDisabled={true}
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
            isActive={false}
            action={() => selectingMonth("August")}
            isDisabled={true}
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
            isActive={false}
            action={() => selectingMonth("September")}
            isDisabled={true}
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
            isActive={false}
            action={() => selectingMonth("October")}
            isDisabled={true}
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
            isActive={false}
            action={() => selectingMonth("November")}
            isDisabled={true}
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
            isActive={false}
            action={() => selectingMonth("December")}
            isDisabled={true}
            // realIncomes={realIncomes}
            month_name="December"
            comingFrom={comingFrom}
          />
        </Month_Row>
      </MonthPadContainer>
    </>
  );
};
