import React, { useContext } from "react";

import { theme } from "../../infrastructure/theme";
import { NumPadComponent } from "../../global_components/organisms/num pads/num_pad";
import { HomeDisplayComponent } from "../../global_components/organisms/displays/home_display.component";
import { Text } from "../../infrastructure/typography/text.component";
import { TextContainer } from "./home.styles";
import { RegularCTAButtonPlusIcon } from "../../global_components/buttons/cta_btn+icon";
import { MenuHeaderComponent } from "../../global_components/organisms/headers/menu_header.component";
import { FlexibleContainer } from "../../global_components/containers/flexible_container";
import { FooterMenuContainer } from "../../global_components/organisms/menu-footers/menu_footer.container";
import { GeneralFlexContainer } from "../../global_components/containers/general_flex_container";

import { NumPadContext } from "../../infrastructure/services/numPad/numPad.context";
import { TransactionsContext } from "../../infrastructure/services/transactions/transactions.context";

export const Home = ({ navigation }) => {
  // ******** NumPad context consumption *************
  const { number } = useContext(NumPadContext);

  const {
    transactionInfoForRequest,
    setTransactionInfoForRequest,
    fixingANumberToTwoDecimalsAndString,
  } = useContext(TransactionsContext);

  // ******** Transactions context consumption *************
  const movingToSelectCategory = () => {
    setTransactionInfoForRequest({
      ...transactionInfoForRequest,
      amount: fixingANumberToTwoDecimalsAndString(number),
    });
    navigation.navigate("Categories");
  };

  // console.log(
  //   "TRANSACTION INFO FOR REQUEST AT HOME:",
  //   JSON.stringify(transactionInfoForRequest, null, 2)
  // );

  return (
    <GeneralFlexContainer color={theme.colors.bg.s_142223C}>
      <MenuHeaderComponent
        navigation={navigation}
        width={"100%"}
        height={"15%"}
        direction={"row"}
        color={theme.colors.bg.s_142223C}
        // color={"#FAD"}
      />

      <FlexibleContainer
        direction={"column"}
        color={theme.colors.bg.s_142223C}
        // color={"red"}
        flexibility={0.8}
        justify={"center"}
        alignment={"center"}
      >
        <HomeDisplayComponent number={number} />
      </FlexibleContainer>

      <FlexibleContainer
        direction={"column"}
        color={theme.colors.bg.s_142223C}
        // color={"lightblue"}
        flexibility={2}
        justify={"center"}
        alignment={"center"}
      >
        <NumPadComponent />
      </FlexibleContainer>
      <FlexibleContainer
        direction={"column"}
        color={theme.colors.bg.s_142223C}
        // color={"brown"}
        flexibility={0.6}
        justify={"center"}
        alignment={"center"}
      >
        {number === "0" ? (
          <TextContainer>
            <Text text_variant="gold_flow_text">
              Use numb pad to enter transaction
            </Text>
          </TextContainer>
        ) : (
          <RegularCTAButtonPlusIcon
            caption="GO"
            width={310}
            height={50}
            color={theme.colors.buttons.p_FC9827}
            borderRadius={50}
            action={movingToSelectCategory}
            text_variant="cta_dark_caption"
            top_position={640}
          />
        )}
      </FlexibleContainer>
      <FlexibleContainer
        direction={"row"}
        // color={"yellow"}
        color={theme.colors.bg.s_142223C}
        flexibility={0.5}
        justify={"center"}
      >
        <FooterMenuContainer color={theme.colors.brand.quaternary} />
      </FlexibleContainer>
    </GeneralFlexContainer>
  );
};
