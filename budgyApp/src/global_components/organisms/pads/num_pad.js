import React, { useContext } from "react";

import { NumPadContainer } from "./num_pad.styles";
import { Row } from "./num_pad.styles";
import { NumPadButton } from "../../buttons/num_pad_button";
import { theme } from "../../../infrastructure/theme";
import { NumPadContext } from "../../../infrastructure/services/numPad/numPad.context";

export const NumPadComponent = () => {
  const { assemblingNumber, clean } = useContext(NumPadContext);

  return (
    <>
      <NumPadContainer>
        <Row>
          <NumPadButton
            text_variant={"white_bold_text_24"}
            color={theme.colors.buttons.e2_5B6477}
            caption={"1"}
            wide={false}
            action={assemblingNumber}
          />
          <NumPadButton
            text_variant={"white_bold_text_24"}
            color={theme.colors.buttons.e2_5B6477}
            caption={"2"}
            wide={false}
            action={assemblingNumber}
          />
          <NumPadButton
            text_variant={"white_bold_text_24"}
            color={theme.colors.buttons.e2_5B6477}
            caption={"3"}
            wide={false}
            action={assemblingNumber}
          />
        </Row>
        <Row>
          <NumPadButton
            text_variant={"white_bold_text_24"}
            color={theme.colors.buttons.e2_5B6477}
            caption={"4"}
            wide={false}
            action={assemblingNumber}
          />
          <NumPadButton
            text_variant={"white_bold_text_24"}
            color={theme.colors.buttons.e2_5B6477}
            caption={"5"}
            wide={false}
            action={assemblingNumber}
          />
          <NumPadButton
            text_variant={"white_bold_text_24"}
            color={theme.colors.buttons.e2_5B6477}
            caption={"6"}
            wide={false}
            action={assemblingNumber}
          />
        </Row>
        <Row>
          <NumPadButton
            text_variant={"white_bold_text_24"}
            color={theme.colors.buttons.e2_5B6477}
            caption={"7"}
            wide={false}
            action={assemblingNumber}
          />
          <NumPadButton
            text_variant={"white_bold_text_24"}
            color={theme.colors.buttons.e2_5B6477}
            caption={"8"}
            wide={false}
            action={assemblingNumber}
          />
          <NumPadButton
            text_variant={"white_bold_text_24"}
            color={theme.colors.buttons.e2_5B6477}
            caption={"9"}
            wide={false}
            action={assemblingNumber}
          />
        </Row>
        <Row>
          <NumPadButton
            text_variant={"white_bold_text_24"}
            color={theme.colors.buttons.e2_5B6477}
            caption={"clr"}
            wide={false}
            action={() => clean()}
          />
          <NumPadButton
            text_variant={"white_bold_text_24"}
            color={theme.colors.buttons.e2_5B6477}
            caption={"0"}
            wide={false}
            action={assemblingNumber}
          />
          <NumPadButton
            text_variant={"white_bold_text_24"}
            color={theme.colors.buttons.e2_5B6477}
            caption={"."}
            wide={false}
            action={assemblingNumber}
          />
        </Row>
      </NumPadContainer>
    </>
  );
};
