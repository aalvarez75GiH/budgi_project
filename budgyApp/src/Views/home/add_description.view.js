import React, { useState, useContext } from "react";
import { theme } from "../../infrastructure/theme";
import { GeneralFlexContainer } from "../../global_components/containers/general_flex_container";
import { FlexibleContainer } from "../../global_components/containers/flexible_container";
import { SafeArea } from "../../global_components/safe-area.component";
import { FormInput } from "../../global_components/inputs/form_input";
import { Spacer } from "../../global_components/optimized.spacer.component";
import { RegularCTAButton } from "../../global_components/buttons/cta_btn";
import { TransactionsContext } from "../../infrastructure/services/transactions/transactions.context";
import { BackHeaderWithLabelComponentButton } from "../../global_components/organisms/headers/back_header+label+done.component";

export const AddDescriptionView = ({ navigation }) => {
  const { transactionInfoForRequest, setTransactionInfoForRequest } =
    useContext(TransactionsContext);

  // const description_from_transaction = transactionInfoForRequest.description;

  console.log(
    "TRANSACTION INFO FOR REQUEST AT ADD DESCRIPTION:",
    JSON.stringify(transactionInfoForRequest, null, 2)
  );

  const [description, setDescription] = useState(
    transactionInfoForRequest.description
      ? transactionInfoForRequest.description
      : ""
  );
  const [isDoneActive, setIsDoneActive] = useState(
    transactionInfoForRequest.description ? true : false
  );
  console.log("INTERNAL DESCRIPTION:", JSON.stringify(description, null, 2));
  console.log("IS DONE ACTIVE:", isDoneActive);

  const goingBack = () => {
    setTransactionInfoForRequest({
      ...transactionInfoForRequest,
      description: description,
    });
    navigation.goBack();
  };

  const onChangeText = (value) => {
    console.log("RED FLAG...");
    setDescription(value);
    console.log("DESCRIPTION LENGTH:", description.length);
    setIsDoneActive(description.length > 1 ? true : false);
  };

  const cleaningDescription = () => {
    console.log("BLUE FLAG...");
    setDescription("");
    setIsDoneActive(false);
  };

  return (
    <SafeArea background_color={"#FFFFFF"}>
      <GeneralFlexContainer>
        <BackHeaderWithLabelComponentButton
          navigation={navigation}
          caption="Add a description"
          direction={"row"}
          color={theme.colors.bg.p_FFFFFF}
          // color={"red"}
          flexibility={0.7}
          arrow_left_action={goingBack}
          done_button_action={goingBack}
          isDoneActive={isDoneActive}
          description={description}
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
            theme={{ roundness: 10 }} // try this }} />
            onChangeText={(value) => onChangeText(value)}
            value={description}
          />
        </FlexibleContainer>
        <FlexibleContainer
          direction={"row"}
          color={theme.colors.bg.p_FFFFFF}
          // color={"brown"}
          flexibility={4.5}
          justify={"center"}
          alignment={"flex-start"}
        >
          <Spacer position="top" size="xxl" />
          <Spacer position="top" size="xxl" />
          {description.length !== 0 ? (
            <RegularCTAButton
              caption="Clear"
              width={310}
              height={50}
              color={theme.colors.buttons.e_F4F4F4}
              borderRadius={0}
              action={cleaningDescription}
              text_variant="cta_dark_caption_16"
            />
          ) : null}
        </FlexibleContainer>
      </GeneralFlexContainer>
    </SafeArea>
  );
};
