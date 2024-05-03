import React, { useState, useContext } from "react";
import { Platform } from "react-native";
import { theme } from "../../infrastructure/theme";

import { GeneralFlexContainer } from "../../global_components/containers/general_flex_container";
import { FlexibleContainer } from "../../global_components/containers/flexible_container";
import { SafeArea } from "../../global_components/safe-area.component";
import { FormInput } from "../../global_components/inputs/form_input";
import { Spacer } from "../../global_components/optimized.spacer.component";
import { TransactionsContext } from "../../infrastructure/services/transactions/transactions.context";
import { BackHeaderWithLabelComponentButton } from "../../global_components/organisms/headers/back_header+label+done.component";
import { LinkButton } from "../../global_components/buttons/link_button";

export const GeneralAddDescriptionView = ({ navigation, route }) => {
  const { comingFrom } = route.params;

  //   ****** DATA FROM TRANSACTIONS CONTEXT ************
  const {
    transactionInfoForRequest,
    setTransactionInfoForRequest,
    transactionInfoForUpdate,
    setTransactionInfoForUpdate,
  } = useContext(TransactionsContext);

  console.log(
    "TRANSACTION INFO FOR REQUEST AT ADD DESCRIPTION:",
    JSON.stringify(transactionInfoForRequest, null, 2)
  );
  console.log(
    "TRANSACTION INFO FOR UPDATE AT ADD DESCRIPTION:",
    JSON.stringify(transactionInfoForUpdate, null, 2)
  );

  const [description, setDescription] = useState(
    transactionInfoForRequest.description
      ? transactionInfoForRequest.description
      : ""
  );
  const [descriptionToUpdate, setDescriptionToUpdate] = useState(
    transactionInfoForUpdate.description
      ? transactionInfoForUpdate.description
      : ""
  );

  const [isDoneActive, setIsDoneActive] = useState(
    transactionInfoForRequest.description ? true : false
  );
  console.log("INTERNAL DESCRIPTION:", JSON.stringify(description, null, 2));
  console.log(
    "INTERNAL DESCRIPTION TO UPDATE:",
    JSON.stringify(descriptionToUpdate, null, 2)
  );
  console.log("IS DONE ACTIVE:", isDoneActive);

  const goingBack = () => {
    {
      comingFrom === "AnyTransactionDetailsView"
        ? setTransactionInfoForUpdate({
            ...transactionInfoForUpdate,
            description: descriptionToUpdate,
          })
        : setTransactionInfoForRequest({
            ...transactionInfoForRequest,
            description: description,
          });
    }

    navigation.goBack();
  };

  const onChangeText = (value) => {
    {
      comingFrom === "AnyTransactionDetailsView"
        ? setDescriptionToUpdate(value)
        : setDescription(value);
    }
    {
      comingFrom === "TransactionSummaryView"
        ? setDescription(value)
        : setDescriptionToUpdate(value);
    }

    console.log("DESCRIPTION TO UPDATE :", descriptionToUpdate);
    console.log("DESCRIPTION TO UPDATE LENGTH:", descriptionToUpdate.length);
    console.log("DESCRIPTION:", description);
    console.log("DESCRIPTION LENGHT:", description.length);
    setIsDoneActive(
      comingFrom === "AnyTransactionDetailsView"
        ? descriptionToUpdate.length > 1
          ? true
          : false
        : description.length > 1
        ? true
        : false
    );
  };

  const cleaningDescription = () => {
    {
      comingFrom === "AnyTransactionDetailsView"
        ? setDescriptionToUpdate("")
        : setDescription("");
    }
    setIsDoneActive(false);
  };

  return (
    <SafeArea background_color={"#FFFFFF"}>
      <GeneralFlexContainer>
        <BackHeaderWithLabelComponentButton
          navigation={navigation}
          caption="Add a G description"
          direction={"row"}
          color={theme.colors.bg.p_FFFFFF}
          // color={"red"}
          flexibility={Platform.OS === "ios" ? 1.2 : 1.2}
          arrow_left_action={goingBack}
          done_button_action={goingBack}
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
            onChangeText={(value) => onChangeText(value)}
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
              action={cleaningDescription}
            />
          ) : null}
        </FlexibleContainer>
      </GeneralFlexContainer>
    </SafeArea>
  );
};
