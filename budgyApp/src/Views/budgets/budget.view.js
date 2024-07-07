import React from "react";

import { theme } from "../../infrastructure/theme";
// import { NumPadComponent } from "../../global_components/organisms/pads/num_pad";
// import { HomeDisplayComponent } from "../../global_components/organisms/displays/home_display.component";
// import { Text } from "../../infrastructure/typography/text.component";
// import { TextContainer } from "./home.styles";
// import { RegularCTAButtonPlusIcon } from "../../global_components/buttons/cta_btn+icon";
// import { MenuHeaderComponent } from "../../global_components/organisms/headers/menu_header.component";
// import { FlexibleContainer } from "../../global_components/containers/flexible_container";
// import { FooterMenuContainer } from "../../global_components/organisms/menu-footers/menu_footer.container";
import { GeneralFlexContainer } from "../../global_components/containers/general_flex_container";
// import { useHomeLogic } from "../../hooks/useHomeLogic";
import { ExitHeaderComponent } from "../../global_components/organisms/headers/exit_header.component";
import { SafeArea } from "../../global_components/safe-area.component";

export const BudgetView = ({ navigation }) => {
  return (
    <SafeArea background_color="#FFFFFF">
      <GeneralFlexContainer color={theme.colors.bg.p_FFFFFF}>
        <ExitHeaderComponent
          navigation={navigation}
          direction={"column"}
          //   color={theme.colors.bg.p_FFFFFF}
          color={"#FAA"}
          flexibility={0.1}
        />

        {/* <FlexibleContainer
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
      </FlexibleContainer> */}
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
    </SafeArea>
  );
};
