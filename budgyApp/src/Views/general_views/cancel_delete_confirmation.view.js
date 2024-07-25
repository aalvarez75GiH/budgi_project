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
import { LinkButton } from "../../global_components/buttons/link_button";

export const CancelDeleteConfirmationView = ({ navigation, route }) => {
  const { transaction_id, comingFrom } = route.params;
  const { deletingTransactionProcess, isLoading } = useCancelDeleteLogic();

  return (
    <SafeArea background_color={"#FFFFFF"}>
      <GeneralFlexContainer color={theme.colors.bg.p_FFFFFF}>
        <ExitHeaderComponent
          navigation={navigation}
          direction={"column"}
          color={theme.colors.bg.p_FFFFFF}
          // color={"#FAA"}
          flexibility={0.18}
          icon_left={"80%"}
          icon_top={"30%"}
        />
        <FlexibleContainer
          color={theme.colors.bg.p_FFFFFF}
          //   color={"red"}
          direction="row"
          flexibility={0.8}
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
            direction="column"
          >
            {/* <Text text_variant="bold_text_20">Do you want to</Text> */}
            <Text text_variant="bold_text_20">Delete this transaction?</Text>
            {/* <Spacer position="top" size="large" /> */}
            {/* <Spacer position="top" size="large" /> */}
            <Spacer position="top" size="large" />
            <RegularCTAButton
              caption="Yes"
              width={310}
              height={50}
              color={theme.colors.ui.error_cancels}
              borderRadius={50}
              action={() =>
                deletingTransactionProcess(
                  navigation,
                  transaction_id,
                  comingFrom
                )
              }
              text_variant="white_bold_text_20"
              isLoading={isLoading}
            />
          </ControlledContainer>
        </FlexibleContainer>
        <FlexibleContainer
          color={theme.colors.bg.p_FFFFFF}
          // color={"red"}
          direction="column"
          flexibility={0.2}
          justify={"flex-start"}
          isBordered={false}
          alignment={"center"}
        >
          <Spacer position="top" size="large" />
          <Spacer position="top" size="large" />
          <LinkButton
            caption="No, i want to come back"
            action={() => navigation.goBack()}
          />
        </FlexibleContainer>
      </GeneralFlexContainer>
    </SafeArea>
  );
};
