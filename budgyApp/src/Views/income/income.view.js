import React from "react";

import { theme } from "../../infrastructure/theme";
import { GeneralFlexContainer } from "../../global_components/containers/general_flex_container";
import { ExitHeaderComponent } from "../../global_components/organisms/headers/exit_header.component";
import { AccountAndThingsTile } from "../../global_components/organisms/tiles/account_and_things_tile";
import { FlexibleContainer } from "../../global_components/containers/flexible_container";
import { Icon_Label_Icon_Tile } from "../../global_components/organisms/tiles/icon+label+icon_tile";
import { SafeArea } from "../../global_components/safe-area.component";

export const IncomeView = ({ navigation }) => {
  return (
    <SafeArea background_color={theme.colors.bg.p_FFFFFF}>
      <GeneralFlexContainer>
        <ExitHeaderComponent
          navigation={navigation}
          direction={"column"}
          color={theme.colors.bg.p_FFFFFF}
          //   color={"#FAA"}
          flexibility={0.13}
          justify={"center"}
        />
        <FlexibleContainer
          color={theme.colors.bg.p_FFFFFF}
          // color={"#FAD"}
          direction="column"
          flexibility={0.9}
          justify={"flex-start"}
          isBordered={false}
        >
          <Icon_Label_Icon_Tile
            caption="Add expected income"
            navigation={navigation}
            icon_name={"DollarMoneySignIcon"}
            active_icon={true}
            width={"100%"}
            svg_icon_size={40}
            border_top_width={4}
            border_bottom_width={2}
          />

          <Icon_Label_Icon_Tile
            caption="Add apps/cash income"
            navigation={navigation}
            icon_name={"AddIncomeIcon"}
            active_icon={true}
            width={"100%"}
            svg_icon_size={35}
            border_top_width={2}
            border_bottom_width={2}
            action={() => navigation.navigate("Amounts_months_pad_view")}
          />
          <Icon_Label_Icon_Tile
            caption="Income stats"
            navigation={navigation}
            icon_name={"StatsIcon"}
            active_icon={true}
            width={"100%"}
            svg_icon_size={36}
            border_top_width={2}
            border_bottom_width={4}
          />
        </FlexibleContainer>
      </GeneralFlexContainer>
    </SafeArea>
  );
};
