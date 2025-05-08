import React, { useContext } from "react";

import {
  NumPadContainer,
  BillsPaymentDayNumPadContainer,
} from "./num_pad.styles";
import { BillsPadRow } from "./num_pad.styles";
import { NumPadButton } from "../../buttons/num_pad_button";
import { BillsNumPadButton } from "../../buttons/bills_num_pad_button";
import { theme } from "../../../infrastructure/theme";

import { DateOperationsContext } from "../../../infrastructure/services/date_operations/date_operations.context";
import { HomeContext } from "../../../infrastructure/services/Home services/home.context";

export const BillPaymentDayNumPadComponent = () => {
  const { settingPaymentDueDateForRequest, billDayChosen } =
    useContext(HomeContext);

  return (
    <>
      <BillsPaymentDayNumPadContainer>
        <BillsPadRow>
          <BillsNumPadButton
            // text_variant={isActive ? "white_bold_text_24" : "bold_text_24"}
            color={theme.colors.buttons.e_F4F4F4}
            caption={"1"}
            wide={false}
            action={settingPaymentDueDateForRequest}
            billDayChosen={billDayChosen}
          />
          <BillsNumPadButton
            // text_variant={isActive ? "white_bold_text_24" : "bold_text_24"}
            color={theme.colors.buttons.e_F4F4F4}
            caption={"2"}
            wide={false}
            action={settingPaymentDueDateForRequest}
            billDayChosen={billDayChosen}
          />
          <BillsNumPadButton
            // text_variant={isActive ? "white_bold_text_24" : "bold_text_24"}
            color={theme.colors.buttons.e_F4F4F4}
            caption={"3"}
            wide={false}
            action={settingPaymentDueDateForRequest}
            billDayChosen={billDayChosen}
          />
          <BillsNumPadButton
            // text_variant={isActive ? "white_bold_text_24" : "bold_text_24"}
            color={theme.colors.buttons.e_F4F4F4}
            caption={"4"}
            wide={false}
            action={settingPaymentDueDateForRequest}
            billDayChosen={billDayChosen}
          />
          <BillsNumPadButton
            // text_variant={isActive ? "white_bold_text_24" : "bold_text_24"}
            color={theme.colors.buttons.e_F4F4F4}
            caption={"5"}
            wide={false}
            action={settingPaymentDueDateForRequest}
            billDayChosen={billDayChosen}
          />
        </BillsPadRow>
        <BillsPadRow>
          <BillsNumPadButton
            // text_variant={isActive ? "white_bold_text_24" : "bold_text_24"}
            color={theme.colors.buttons.e_F4F4F4}
            caption={"6"}
            wide={false}
            action={settingPaymentDueDateForRequest}
            billDayChosen={billDayChosen}
          />
          <BillsNumPadButton
            // text_variant={isActive ? "white_bold_text_24" : "bold_text_24"}
            color={theme.colors.buttons.e_F4F4F4}
            caption={"7"}
            wide={false}
            action={settingPaymentDueDateForRequest}
            billDayChosen={billDayChosen}
          />
          <BillsNumPadButton
            // text_variant={isActive ? "white_bold_text_24" : "bold_text_24"}
            color={theme.colors.buttons.e_F4F4F4}
            caption={"8"}
            wide={false}
            action={settingPaymentDueDateForRequest}
            billDayChosen={billDayChosen}
          />
          <BillsNumPadButton
            // text_variant={isActive ? "white_bold_text_24" : "bold_text_24"}
            color={theme.colors.buttons.e_F4F4F4}
            caption={"9"}
            wide={false}
            action={settingPaymentDueDateForRequest}
            billDayChosen={billDayChosen}
          />
          <BillsNumPadButton
            // text_variant={isActive ? "white_bold_text_24" : "bold_text_24"}
            color={theme.colors.buttons.e_F4F4F4}
            caption={"10"}
            wide={false}
            action={settingPaymentDueDateForRequest}
            billDayChosen={billDayChosen}
          />
        </BillsPadRow>
        <BillsPadRow>
          <BillsNumPadButton
            // text_variant={isActive ? "white_bold_text_24" : "bold_text_24"}
            color={theme.colors.buttons.e_F4F4F4}
            caption={"11"}
            wide={false}
            action={settingPaymentDueDateForRequest}
            billDayChosen={billDayChosen}
          />
          <BillsNumPadButton
            // text_variant={isActive ? "white_bold_text_24" : "bold_text_24"}
            color={theme.colors.buttons.e_F4F4F4}
            caption={"12"}
            wide={false}
            action={settingPaymentDueDateForRequest}
            billDayChosen={billDayChosen}
          />
          <BillsNumPadButton
            // text_variant={isActive ? "white_bold_text_24" : "bold_text_24"}
            color={theme.colors.buttons.e_F4F4F4}
            caption={"13"}
            wide={false}
            action={settingPaymentDueDateForRequest}
            billDayChosen={billDayChosen}
          />
          <BillsNumPadButton
            // text_variant={isActive ? "white_bold_text_24" : "bold_text_24"}
            color={theme.colors.buttons.e_F4F4F4}
            caption={"14"}
            wide={false}
            action={settingPaymentDueDateForRequest}
            billDayChosen={billDayChosen}
          />
          <BillsNumPadButton
            // text_variant={isActive ? "white_bold_text_24" : "bold_text_24"}
            color={theme.colors.buttons.e_F4F4F4}
            caption={"15"}
            wide={false}
            action={settingPaymentDueDateForRequest}
            billDayChosen={billDayChosen}
          />
        </BillsPadRow>
        <BillsPadRow>
          <BillsNumPadButton
            // text_variant={isActive ? "white_bold_text_24" : "bold_text_24"}
            color={theme.colors.buttons.e_F4F4F4}
            caption={"16"}
            wide={false}
            action={settingPaymentDueDateForRequest}
            billDayChosen={billDayChosen}
          />
          <BillsNumPadButton
            // text_variant={isActive ? "white_bold_text_24" : "bold_text_24"}
            color={theme.colors.buttons.e_F4F4F4}
            caption={"17"}
            wide={false}
            action={settingPaymentDueDateForRequest}
            billDayChosen={billDayChosen}
          />
          <BillsNumPadButton
            // text_variant={isActive ? "white_bold_text_24" : "bold_text_24"}
            color={theme.colors.buttons.e_F4F4F4}
            caption={"18"}
            wide={false}
            action={settingPaymentDueDateForRequest}
            billDayChosen={billDayChosen}
          />
          <BillsNumPadButton
            // text_variant={isActive ? "white_bold_text_24" : "bold_text_24"}
            color={theme.colors.buttons.e_F4F4F4}
            caption={"19"}
            wide={false}
            action={settingPaymentDueDateForRequest}
            billDayChosen={billDayChosen}
          />
          <BillsNumPadButton
            // text_variant={isActive ? "white_bold_text_24" : "bold_text_24"}
            color={theme.colors.buttons.e_F4F4F4}
            caption={"20"}
            wide={false}
            action={settingPaymentDueDateForRequest}
            billDayChosen={billDayChosen}
          />
        </BillsPadRow>
        <BillsPadRow>
          <BillsNumPadButton
            // text_variant={isActive ? "white_bold_text_24" : "bold_text_24"}
            color={theme.colors.buttons.e_F4F4F4}
            caption={"21"}
            wide={false}
            action={settingPaymentDueDateForRequest}
            billDayChosen={billDayChosen}
          />
          <BillsNumPadButton
            // text_variant={isActive ? "white_bold_text_24" : "bold_text_24"}
            color={theme.colors.buttons.e_F4F4F4}
            caption={"22"}
            wide={false}
            action={settingPaymentDueDateForRequest}
            billDayChosen={billDayChosen}
          />
          <BillsNumPadButton
            // text_variant={isActive ? "white_bold_text_24" : "bold_text_24"}
            color={theme.colors.buttons.e_F4F4F4}
            caption={"23"}
            wide={false}
            action={settingPaymentDueDateForRequest}
            billDayChosen={billDayChosen}
          />
          <BillsNumPadButton
            // text_variant={isActive ? "white_bold_text_24" : "bold_text_24"}
            color={theme.colors.buttons.e_F4F4F4}
            caption={"24"}
            wide={false}
            action={settingPaymentDueDateForRequest}
            billDayChosen={billDayChosen}
          />
          <BillsNumPadButton
            // text_variant={isActive ? "white_bold_text_24" : "bold_text_24"}
            color={theme.colors.buttons.e_F4F4F4}
            caption={"25"}
            wide={false}
            action={settingPaymentDueDateForRequest}
            billDayChosen={billDayChosen}
          />
        </BillsPadRow>
        <BillsPadRow>
          <BillsNumPadButton
            // text_variant={isActive ? "white_bold_text_24" : "bold_text_24"}
            color={theme.colors.buttons.e_F4F4F4}
            caption={"26"}
            wide={false}
            action={settingPaymentDueDateForRequest}
            billDayChosen={billDayChosen}
          />
          <BillsNumPadButton
            // text_variant={isActive ? "white_bold_text_24" : "bold_text_24"}
            color={theme.colors.buttons.e_F4F4F4}
            caption={"27"}
            wide={false}
            action={settingPaymentDueDateForRequest}
            billDayChosen={billDayChosen}
          />
          <BillsNumPadButton
            // text_variant={isActive ? "white_bold_text_24" : "bold_text_24"}
            color={theme.colors.buttons.e_F4F4F4}
            caption={"28"}
            wide={false}
            action={settingPaymentDueDateForRequest}
            billDayChosen={billDayChosen}
          />
          <BillsNumPadButton
            // text_variant={isActive ? "white_bold_text_24" : "bold_text_24"}
            color={theme.colors.buttons.e_F4F4F4}
            caption={"29"}
            wide={false}
            action={settingPaymentDueDateForRequest}
            billDayChosen={billDayChosen}
          />
          <BillsNumPadButton
            // text_variant={isActive ? "white_bold_text_24" : "bold_text_24"}
            color={theme.colors.buttons.e_F4F4F4}
            caption={"30"}
            wide={false}
            action={settingPaymentDueDateForRequest}
            billDayChosen={billDayChosen}
          />
        </BillsPadRow>
        <BillsPadRow>
          <BillsNumPadButton
            // text_variant={isActive ? "white_bold_text_24" : "bold_text_24"}
            color={theme.colors.buttons.e_F4F4F4}
            caption={"31"}
            wide={false}
            action={settingPaymentDueDateForRequest}
            billDayChosen={billDayChosen}
          />
        </BillsPadRow>
      </BillsPaymentDayNumPadContainer>
    </>
  );
};
