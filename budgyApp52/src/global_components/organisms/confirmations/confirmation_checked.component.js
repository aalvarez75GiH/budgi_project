import React from "react";
import { View } from "react-native";

import { Text } from "../../../infrastructure/typography/text.component";
import {
  ConfirmationInfoContainer,
  ConfirmationTitleContainer,
  ConfirmationTextContainer,
  Text1Container,
  Text2Container,
} from "./confirmation_component.styles";
import FileIcon from "../../../../assets/icons/svgs/file.svg";
import { Spacer } from "../../optimized.spacer.component";
import { CheckIconComponent } from "../../check_icon_component";

export const ConfirmationInfoCheckedComponent = ({
  width,
  height,
  dataIsConfirmed,
}) => {
  return (
    <ConfirmationInfoContainer isConfirmed={dataIsConfirmed}>
      <Spacer position="left" size="medium">
        <ConfirmationTitleContainer>
          <FileIcon />
          <Spacer position="left" size="large" />
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
            <Text text_variant="regular_text_16">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(amount)}
            </Text>
          </Text2Container>
        </ConfirmationTextContainer>
      </Spacer>

      <Spacer position="left" size="large">
        <ConfirmationTextContainer color={"#FFFFFF"}>
          <Text1Container>
            <Text text_variant="bold_text_16">Category:</Text>
          </Text1Container>

          <Text2Container>
            <Text text_variant="regular_text_16">Gas</Text>
          </Text2Container>
          {dataIsConfirmed && <CheckIconComponent width={30} height={30} />}
        </ConfirmationTextContainer>
      </Spacer>

      <Spacer position="left" size="large">
        <ConfirmationTextContainer color={"#FFFFFF"}>
          <Text1Container>
            <Text text_variant="bold_text_16">Expense date:</Text>
          </Text1Container>

          <Text2Container>
            <Text text_variant="regular_text_16">Mar 17, 2023</Text>
          </Text2Container>
        </ConfirmationTextContainer>
      </Spacer>
    </ConfirmationInfoContainer>
  );
};
