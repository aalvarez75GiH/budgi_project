import React from "react";

import { SafeArea } from "../../global_components/safe-area.component";
import { RegularCTAButton } from "../../global_components/buttons/cta_btn";
import { theme } from "../../infrastructure/theme";
import { ConfirmationInfoComponent } from "../../global_components/organisms/confirmations/transaction_confirmation.component";
import { DoneHeaderComponent } from "../../global_components/organisms/headers/done_heaer.component";
import { Spacer } from "../../global_components/optimized.spacer.component";
import { FooterMenuContainer } from "../../global_components/organisms/menu-footers/menu_footer.container";
import { FlexibleContainer } from "../../global_components/containers/flexible_container";
import { useTransactionConfirmationLogic } from "../../hooks/useTransactionConfirmationLogic";

export const TransactionConfirmationView = ({ navigation }) => {
  const {
    goingHome,
    isConfirmed,
    transaction_date,
    short_name,
    stringedAmount,
  } = useTransactionConfirmationLogic();

  return (
    <SafeArea background_color={theme.colors.bg.p_FFFFFF}>
      <DoneHeaderComponent
        action={() => goingHome(navigation)}
        direction={"row"}
        color={theme.colors.bg.p_FFFFFF}
        flexibility={0.5}
        // color={"#FAD"}
      />

      <FlexibleContainer
        direction={"column"}
        color={theme.colors.bg.p_FFFFFF}
        // color={"red"}
        flexibility={1.5}
        justify={"center"}
      >
        <ConfirmationInfoComponent
          width={370}
          height={140}
          isConfirmed={isConfirmed}
          amount={stringedAmount}
          transaction_date={transaction_date}
          short_name={short_name}
        />
      </FlexibleContainer>
      <FlexibleContainer
        direction={"column"}
        color={theme.colors.bg.p_FFFFFF}
        // color={"lightblue"}
        flexibility={3}
        justify={"center"}
      >
        <Spacer position="top" size="xxl" />
        <Spacer position="top" size="xxl" />
        <Spacer position="top" size="xxl" />
        <Spacer position="top" size="xxl" />
        {/* <Spacer position="top" size="xxl" /> */}
        <RegularCTAButton
          caption="Done"
          width={290}
          height={60}
          color={theme.colors.buttons.t_E5E5E5}
          borderRadius={0}
          action={() => goingHome(navigation)}
          text_variant="bold_text_16"
        />
      </FlexibleContainer>
      <FlexibleContainer
        direction={"row"}
        color={theme.colors.bg.p_FFFFFF}
        // color={"brown"}
        flexibility={1}
        justify={"center"}
      >
        <FooterMenuContainer color={theme.colors.neutrals.e2_F5F5F5} />
      </FlexibleContainer>
    </SafeArea>
  );
};
