import React from "react";
import { Platform } from "react-native";
import { theme } from "../../infrastructure/theme";

import { GeneralFlexContainer } from "../../global_components/containers/general_flex_container";
import { FlexibleContainer } from "../../global_components/containers/flexible_container";
import { SafeArea } from "../../global_components/safe-area.component";
import { FormInput } from "../../global_components/inputs/form_input";
import { Spacer } from "../../global_components/optimized.spacer.component";
import { BackHeaderWithLabelComponentButton } from "../../global_components/organisms/headers/back_header+label+done.component";
import { LinkButton } from "../../global_components/buttons/link_button";
import { useAddDescriptionLogic } from "../../hooks/useAddDescriptionLogic";

export const GeneralAddDescriptionView = ({ navigation, route }) => {
  const { comingFrom } = route.params;

  const {
    goingBack,
    onChangeText,
    cleaningDescription,
    isDoneActive,
    description,
    descriptionToUpdate,
  } = useAddDescriptionLogic();

  return (
    <SafeArea background_color={"#FFFFFF"}>
      <GeneralFlexContainer>
        <BackHeaderWithLabelComponentButton
          navigation={navigation}
          caption="Add a description"
          direction={"row"}
          color={theme.colors.bg.p_FFFFFF}
          // color={"red"}
          flexibility={Platform.OS === "ios" ? 1.2 : 1.2}
          arrow_left_action={() => goingBack(navigation, comingFrom)}
          done_button_action={() => goingBack(navigation, comingFrom)}
          isDoneActive={isDoneActive}
          description={description}
          align="flex-start"
        />
        <FlexibleContainer
          direction={"column"}
          color={theme.colors.bg.p_FFFFFF}
          // color={theme.colors.bg.e_F4F4F4}
          flexibility={4}
          justify={"flex-start"}
        >
          <Spacer position="top" size="large" />
          <FormInput
            width={"95%"}
            height={"200px"}
            color={theme.colors.bg.e_F4F4F4}
            mode="outlined"
            placeholder={description ? description : "Start typing here..."}
            multiline={true}
            outlineColor={"#F4F4F4"}
            activeOutlineColor={"#B7B7B7"}
            font_size={theme.fontSizes.text_16}
            border_radius={"30px"}
            theme={{
              roundness: 10,
              colors: { onSurfaceVariant: theme.colors.text.t_898989 },
            }}
            onChangeText={(value) => onChangeText(value, comingFrom)}
            value={
              comingFrom === "AnyTransactionDetailsView"
                ? descriptionToUpdate
                : description
            }
          />
        </FlexibleContainer>
        <FlexibleContainer
          direction={"row"}
          color={theme.colors.bg.p_FFFFFF}
          // color={"brown"}
          flexibility={Platform.OS === "ios" ? 7.5 : 2.5}
          justify={"center"}
          alignment={"flex-start"}
        >
          {description.length !== 0 || descriptionToUpdate.length !== 0 ? (
            <LinkButton
              caption="Clear description"
              action={() => cleaningDescription(comingFrom)}
            />
          ) : null}
        </FlexibleContainer>
      </GeneralFlexContainer>
    </SafeArea>
  );
};
