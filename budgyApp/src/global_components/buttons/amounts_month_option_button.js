import React, { useContext, useEffect, useState } from "react";

import { OPTButton } from "./buttons.styles";
import { Text } from "../../infrastructure/typography/text.component";
import { OptionButtonTextIconContainer } from "../buttons/buttons.styles";
import { Spacer } from "../optimized.spacer.component";
import { SVGComponent } from "../image_components/svg.component";
import { ControlledContainer } from "../containers/controlled_container";

import { DateOperationsContext } from "../../infrastructure/services/date_operations/date_operations.context";

export const AmountMonthOptionButton = ({
  action,
  caption,
  color1,
  color2,
  width,
  height,
  borderRadius,
  isDisabled,
  isChosen,
  realIncomes,
  month_name,
}) => {
  console.log("realIncomes AT AMOUNT OPTION BUTTON:", realIncomes);
  const { gettingAcronym, setMonthSelected, month_selected, month } =
    useContext(DateOperationsContext);

  const [realIncomeAmount, setRealIncomeAmount] = useState(0);

  useEffect(() => {
    const month_year_by_each_button = gettingAcronym(month_name);
    console.log("MONTH YEAR AT BUTTON:", month_year_by_each_button);
    const index = realIncomes.findIndex(
      (real_income) => real_income.month_year === month_year_by_each_button
    );
    if (index === -1) {
      console.log("NO REAL INCOME FOR THAT MONTH");
    } else {
      console.log("INDEX AT BUTTON:", index);
      console.log("REAL INCOME AT BUTTON:", realIncomes[index].total_amount);
      setRealIncomeAmount(realIncomes[index].total_amount);
    }
  }, []);

  return (
    <OPTButton
      color1={color1}
      color2={color2}
      //   onPress={action}
      //   onPress={selectingMonth}
      onPress={action}
      width={width}
      height={height}
      borderRadius={borderRadius}
      isActive={isChosen}
    >
      <OptionButtonTextIconContainer
        width={"70%"}
        justify="center"
        align={"center"}
        direction="column"
      >
        {/* <Spacer position="left" size="large"> */}
        <ControlledContainer
          //   color="red"
          width={"100%"}
          height={"50%"}
          justify="center"
          alignment="center"
          direction="row"
        >
          <Text
            text_variant={
              isChosen
                ? "white_bold_text_20"
                : isDisabled
                ? "neutral_bold_text_20"
                : "bold_text_20"
            }
          >
            {caption}
          </Text>
          {isChosen && (
            <>
              <Spacer position="left" size="medium" />
              <SVGComponent
                icon_name="SuccessIcon"
                icon_width={15}
                icon_height={15}
                position={"static"}
                left={"0%"}
                top={"0%"}
                justify={"center"}
              />
            </>
          )}
        </ControlledContainer>
        <ControlledContainer
          //   color="lightblue"
          width={"100%"}
          height={"25%"}
          justify="center"
          alignment="center"
          direction="column"
        >
          <Text
            text_variant={
              isChosen
                ? "white_bold_text_12"
                : isDisabled
                ? "neutral_bold_text_12"
                : "bold_text_12"
            }
          >
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(realIncomeAmount)}
            {/* {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(amount_caption)} */}
          </Text>
        </ControlledContainer>
      </OptionButtonTextIconContainer>
    </OPTButton>
  );
};
