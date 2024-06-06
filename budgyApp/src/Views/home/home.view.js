import React from "react";

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
import { useHomeLogic } from "../../hooks/useHomeLogic";

export const Home = ({ navigation }) => {
  const { movingToSelectCategory, number } = useHomeLogic();

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
            action={() => movingToSelectCategory(navigation)}
            text_variant="bold_text_20"
            top_position={640}
            icon_align={"center"}
          />
        )}
      </FlexibleContainer>
      {/* <FlexibleContainer
        direction={"row"}
        // color={"yellow"}
        color={theme.colors.bg.s_142223C}
        flexibility={0.5}
        justify={"center"}
      >
        <FooterMenuContainer color={theme.colors.brand.quaternary} />
      </FlexibleContainer> */}
    </GeneralFlexContainer>
  );
};
