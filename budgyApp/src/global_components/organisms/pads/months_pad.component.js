import React, { useContext } from "react";

import { NumPadContainer } from "./num_pad.styles";
import { Row } from "./num_pad.styles";
import { MonthOptionButton } from "../../buttons/month_option_button";
import { theme } from "../../../infrastructure/theme";
import { MonthPadContainer, Month_Row } from "./num_pad.styles";

export const MonthsPadComponent = () => {
  //   const { assemblingNumber, clean } = useContext(NumPadContext);

  return (
    <>
      <MonthPadContainer width={"350px"} height={"365px"} bg_color={"#FFFFFF"}>
        <Month_Row>
          <MonthOptionButton
            width={110}
            height={80}
            caption="Jan"
            color={theme.colors.bg.s_142223C}
            borderRadius={20}
            isActive={false}
            action={() => console.log("January")}
            isDisabled={false}
          />
          <MonthOptionButton
            width={110}
            height={80}
            caption="Feb"
            color={theme.colors.bg.s_142223C}
            borderRadius={20}
            isActive={false}
            action={() => console.log("February")}
            isDisabled={false}
          />
          <MonthOptionButton
            width={110}
            height={80}
            caption="Mar"
            color={theme.colors.bg.s_142223C}
            borderRadius={20}
            isActive={false}
            action={() => console.log("March")}
            isDisabled={true}
          />
        </Month_Row>
        <Month_Row>
          <MonthOptionButton
            width={110}
            height={80}
            caption="Apr"
            color={theme.colors.bg.s_142223C}
            borderRadius={20}
            isActive={false}
            action={() => console.log("April")}
            isDisabled={false}
          />
          <MonthOptionButton
            width={110}
            height={80}
            caption="May"
            color={theme.colors.bg.s_142223C}
            borderRadius={20}
            isActive={true}
            action={() => console.log("May")}
            isDisabled={false}
          />
          <MonthOptionButton
            width={110}
            height={80}
            caption="Jun"
            color={theme.colors.bg.s_142223C}
            borderRadius={20}
            isActive={false}
            action={() => console.log("June")}
            isDisabled={true}
          />
        </Month_Row>
        <Month_Row>
          <MonthOptionButton
            width={110}
            height={80}
            caption="Jul"
            color={theme.colors.bg.s_142223C}
            borderRadius={20}
            isActive={false}
            action={() => console.log("July")}
            isDisabled={true}
          />
          <MonthOptionButton
            width={110}
            height={80}
            caption="Aug"
            color={theme.colors.bg.s_142223C}
            borderRadius={20}
            isActive={false}
            action={() => console.log("August")}
            isDisabled={true}
          />
          <MonthOptionButton
            width={110}
            height={80}
            caption="Sep"
            color={theme.colors.bg.s_142223C}
            borderRadius={20}
            isActive={false}
            action={() => console.log("September")}
            isDisabled={true}
          />
        </Month_Row>
        <Month_Row>
          <MonthOptionButton
            width={110}
            height={80}
            caption="Oct"
            color={theme.colors.bg.s_142223C}
            borderRadius={20}
            isActive={false}
            action={() => console.log("October")}
            isDisabled={true}
          />
          <MonthOptionButton
            width={110}
            height={80}
            caption="Nov"
            color={theme.colors.bg.s_142223C}
            borderRadius={20}
            isActive={false}
            action={() => console.log("November")}
            isDisabled={true}
          />
          <MonthOptionButton
            width={110}
            height={80}
            caption="Dec"
            color={theme.colors.bg.s_142223C}
            borderRadius={20}
            isActive={false}
            action={() => console.log("December")}
            isDisabled={true}
          />
        </Month_Row>
      </MonthPadContainer>
    </>
  );
};
