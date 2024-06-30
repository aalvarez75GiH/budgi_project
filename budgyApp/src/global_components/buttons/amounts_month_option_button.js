import React, { useContext, useEffect, useState } from "react";

import { OPTButton } from "./buttons.styles";
import { Text } from "../../infrastructure/typography/text.component";
import { OptionButtonTextIconContainer } from "../buttons/buttons.styles";
import { Spacer } from "../optimized.spacer.component";
import { SVGComponent } from "../image_components/svg.component";
import { ControlledContainer } from "../containers/controlled_container";

import { DateOperationsContext } from "../../infrastructure/services/date_operations/date_operations.context";
import { RealIncomeContext } from "../../infrastructure/services/real_income/real_income.context";
import { ExpectedIncomeContext } from "../../infrastructure/services/expected _income/expected_income.context";

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
  month_name,
  comingFrom,
}) => {
  //   console.log("realIncomes AT AMOUNT OPTION BUTTON:", realIncomes);
  const { gettingAcronym, setMonthSelected, month_selected, month } =
    useContext(DateOperationsContext);

  const { gettingRealIncomeForEachButton } = useContext(RealIncomeContext);
  const { gettingExpectedIncomeForEachButton } = useContext(
    ExpectedIncomeContext
  );
  const [realIncomeAmount, setRealIncomeAmount] = useState(0);
  const [expectedIncomeAmount, setExpectedIncomeAmount] = useState(0);
  const [amountToRender, setAmountToRender] = useState(0);

  useEffect(() => {
    const gettingAmountByMonth = async () => {
      if (comingFrom === "appsCashIncomeTile") {
        const real_income_by_button = await gettingRealIncomeForEachButton(
          month_name
        );
        console.log(
          "REAL INCOME BY BUTTON:",
          JSON.stringify(real_income_by_button, null, 2)
        );
        // setRealIncomeAmount(real_income_by_button.total_amount);
        setAmountToRender(real_income_by_button.total_amount);
      }
      if (comingFrom === "addExpectedIncomeTile") {
        const expected_income_by_button =
          await gettingExpectedIncomeForEachButton(month_name);
        console.log(
          "EXPECTED INCOME BY BUTTON:",
          JSON.stringify(expected_income_by_button, null, 2)
        );
        // setExpectedIncomeAmount(4200);
        setAmountToRender(expected_income_by_button.amount);
      }
    };
    gettingAmountByMonth();
  }, []);
  console.log(
    "EXPECTED INCOME BY BUTTON:",
    JSON.stringify(amountToRender, null, 2)
  );

  return (
    <OPTButton
      color1={color1}
      color2={color2}
      onPress={isDisabled ? null : action}
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
            }).format(amountToRender)}
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
