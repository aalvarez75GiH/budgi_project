import React from "react";

import { FlexibleContainer } from "../../global_components/containers/flexible_container";
import { theme } from "../../infrastructure/theme";
import { SafeArea } from "../../global_components/safe-area.component";
import { GeneralFlexContainer } from "../../global_components/containers/general_flex_container";
import { ExitHeaderComponent } from "../../global_components/organisms/headers/exit_header.component";
import { ControlledContainer } from "../../global_components/containers/controlled_container";
import { RegularCTAButton } from "../../global_components/buttons/cta_btn";
import { Text } from "../../infrastructure/typography/text.component";
import { Spacer } from "../../global_components/optimized.spacer.component";
import { useCancelDeleteLogic } from "../../hooks/useCancelDeleteLogic";

export const CancelDeleteConfirmationView = ({ navigation, route }) => {
  const { transaction_id } = route.params;
  console.log("TRANSACTION ID AT CANCEL DELETE CONFIRMATION:", transaction_id);
  const { deletingTransactionProcess, isLoading } = useCancelDeleteLogic();

  return (
    <SafeArea background_color={"#FFFFFF"}>
      <GeneralFlexContainer color={theme.colors.bg.s_142223C}>
        <ExitHeaderComponent
          navigation={navigation}
          direction={"column"}
          color={theme.colors.bg.p_FFFFFF}
          // color={"#FAA"}
          flexibility={0.1}
        />
        <FlexibleContainer
          color={theme.colors.bg.p_FFFFFF}
          //   color={"red"}
          direction="row"
          flexibility={1.4}
          justify={"flex-start"}
          isBordered={false}
          alignment={"center"}
        >
          <ControlledContainer
            color={theme.colors.bg.p_FFFFFF}
            // color={"orange"}
            width={"100%"}
            height={"300px"}
            justify="center"
            alignment="center"
          >
            <Text text_variant="bold_text_16">
              Do you really want to delete this transaction?
            </Text>
            <Spacer position="top" size="large" />
            <RegularCTAButton
              caption="Yes, delete"
              width={310}
              height={50}
              color={theme.colors.ui.error_cancels}
              borderRadius={50}
              action={() =>
                deletingTransactionProcess(navigation, transaction_id)
              }
              text_variant="white_bold_text_20"
              isLoading={isLoading}
            />
          </ControlledContainer>
        </FlexibleContainer>
      </GeneralFlexContainer>
    </SafeArea>
  );
};
