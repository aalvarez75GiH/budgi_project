import React, { useContext, useEffect } from "react";

import { theme } from "../../infrastructure/theme";
import { NumPadComponent } from "../../global_components/organisms/pads/num_pad";
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
import { SafeArea } from "../../global_components/safe-area.component";

export const Home = ({ navigation }) => {
  //   ****** DATA FROM NUMPAD CONTEXT ************
  const { number } = useContext(NumPadContext);

  //   ****** DATA FROM TRANSACTIONS CONTEXT ************
  const {
    transactionInfoForRequest,
    setTransactionInfoForRequest,
    fixingANumberToTwoDecimalsAndString,
  } = useContext(TransactionsContext);

  const movingToSelectCategory = () => {
    setTransactionInfoForRequest({
      ...transactionInfoForRequest,
      amount: fixingANumberToTwoDecimalsAndString(number),
    });
    // navigation.navigate("Categories");
    navigation.navigate("General_select_category_view", {
      comingFrom: "Home_View",
    });
  };

  // console.log(
  //   "TRANSACTION INFO FOR REQUEST AT HOME:",
  //   JSON.stringify(transactionInfoForRequest, null, 2)
  // );

  return (
    // <SafeArea background_color={theme.colors.bg.s_142223C}>
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
            <Text
              text_variant="gold_bold_text_14"
              // style={{ fontFamily: "DMSans_700Bold", fontWeight: 700 }}
            >
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
            text_variant="bold_text_20"
            top_position={640}
            icon_align={"center"}
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
    // </SafeArea>
  );
};
