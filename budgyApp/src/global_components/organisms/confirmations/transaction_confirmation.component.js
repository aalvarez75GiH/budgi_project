import React, { useContext } from "react";

import { Text } from "../../../infrastructure/typography/text.component";
import { UnderlinedRegularCaption } from "../../special text components/underlined.text.component";
import {
  ConfirmationInfoContainer,
  ConfirmationTitleContainer,
  ConfirmationTextContainer,
  Text1Container,
  Text2Container,
} from "./confirmation_component.styles";
import { Spacer } from "../../optimized.spacer.component";
import { CheckIconComponent } from "../../check_icon_component";
import { SVGComponent } from "../../image_components/svg.component";

export const ConfirmationInfoComponent = ({
  isConfirmed,
  amount,
  transaction_date,
  short_name,
}) => {
  console.log("EXPENSE DATE FORMARTTED:", transaction_date);

  return (
    <ConfirmationInfoContainer isConfirmed={isConfirmed}>
      <Spacer position="left" size="medium">
        <ConfirmationTitleContainer>
          <SVGComponent
            icon_name={"FileIcon"}
            icon_width={25}
            icon_height={25}
            position={"static"}
            left={"0%"}
            top={"0%"}
            justify={"center"}
          />
          <Text text_variant="bold_text_20">Transaction info:</Text>
        </ConfirmationTitleContainer>
      </Spacer>
      <Spacer />
      <Spacer />

      <Spacer position="left" size="large">
        <ConfirmationTextContainer color={"#E5E5E5"}>
          <Text1Container>
            <Text text_variant="bold_text_16">Amount:</Text>
          </Text1Container>
          <Text2Container>
            <Text text_variant="regular_text_16">${amount.toString()}</Text>
          </Text2Container>
        </ConfirmationTextContainer>
      </Spacer>

      <Spacer position="left" size="large">
        <ConfirmationTextContainer color={"#FFFFFF"}>
          <Text1Container>
            <Text text_variant="bold_text_16">Category:</Text>
          </Text1Container>

          <Text2Container>
            <Text text_variant="regular_text_16">{short_name}</Text>
          </Text2Container>
          {isConfirmed && <CheckIconComponent width={30} height={30} />}
        </ConfirmationTextContainer>
      </Spacer>

      <Spacer position="left" size="large">
        <ConfirmationTextContainer color={"#FFFFFF"}>
          <Text1Container>
            <Text text_variant="bold_text_16">Expense date:</Text>
          </Text1Container>

          <Text2Container>
            {/* <UnderlinedRegularCaption>Mar 17, 2023</UnderlinedRegularCaption> */}
            <UnderlinedRegularCaption size={16}>
              {transaction_date}
            </UnderlinedRegularCaption>
          </Text2Container>
        </ConfirmationTextContainer>
      </Spacer>
    </ConfirmationInfoContainer>
  );
};
