import React, { useEffect, useState, useContext } from "react";

import { theme } from "../../infrastructure/theme";
import { GeneralFlexContainer } from "../../global_components/containers/general_flex_container";
import { ExitHeaderComponent } from "../../global_components/organisms/headers/exit_header.component";
import { AccountAndThingsTile } from "../../global_components/organisms/tiles/account_and_things_tile";
import { FlexibleContainer } from "../../global_components/containers/flexible_container";
import { Icon_Label_Icon_Tile } from "../../global_components/organisms/tiles/icon+label+icon_tile";
import { SafeArea } from "../../global_components/safe-area.component";
import { getRealIncomes_By_UserIDRequest } from "../../infrastructure/services/real_income/real_income.services";
import { AuthenticationContext } from "../../infrastructure/services/authentication/authentication.context";
import { IsLoadingContainer } from "../../global_components/containers/isLoading_container";

export const IncomeView = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [realIncomes, setRealIncomes] = useState([]);

  const { user } = useContext(AuthenticationContext);
  const { user_id } = user;

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const real_incomes = await getRealIncomes_By_UserIDRequest(user_id);
        if (real_incomes.status === 404) {
          console.log("REAL INCOMES STATUS 404");
          setRealIncomes([]);
          return;
        } else {
          setRealIncomes(real_incomes.data);
        }
      } catch (error) {
        console.log("HERE IS THE ERROR:", error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);
  console.log("REAL INCOMES AT INCOME VIEW:", realIncomes);

  return (
    <SafeArea background_color={theme.colors.bg.p_FFFFFF}>
      {isLoading ? (
        <FlexibleContainer
          color={theme.colors.bg.p_FFFFFF}
          // color={"#FAD"}
          direction="row"
          flexibility={1}
          justify={"center"}
          isBordered={false}
          alignment={"center"}
        >
          <IsLoadingContainer
            size="large"
            color={theme.colors.brand.primary}
            caption="Loading incomes... "
          />
        </FlexibleContainer>
      ) : (
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
              action={() =>
                navigation.navigate("Amounts_months_pad_view", {
                  realIncomes: realIncomes,
                })
              }
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
      )}
    </SafeArea>
  );
};
//   return (
//     <SafeArea background_color={theme.colors.bg.p_FFFFFF}>
//       <GeneralFlexContainer>
//         <ExitHeaderComponent
//           navigation={navigation}
//           direction={"column"}
//           color={theme.colors.bg.p_FFFFFF}
//           //   color={"#FAA"}
//           flexibility={0.13}
//           justify={"center"}
//         />
//         <FlexibleContainer
//           color={theme.colors.bg.p_FFFFFF}
//           // color={"#FAD"}
//           direction="column"
//           flexibility={0.9}
//           justify={"flex-start"}
//           isBordered={false}
//         >
//           <Icon_Label_Icon_Tile
//             caption="Add expected income"
//             navigation={navigation}
//             icon_name={"DollarMoneySignIcon"}
//             active_icon={true}
//             width={"100%"}
//             svg_icon_size={40}
//             border_top_width={4}
//             border_bottom_width={2}
//           />

//           <Icon_Label_Icon_Tile
//             caption="Add apps/cash income"
//             navigation={navigation}
//             icon_name={"AddIncomeIcon"}
//             active_icon={true}
//             width={"100%"}
//             svg_icon_size={35}
//             border_top_width={2}
//             border_bottom_width={2}
//             action={() => navigation.navigate("Amounts_months_pad_view")}
//           />
//           <Icon_Label_Icon_Tile
//             caption="Income stats"
//             navigation={navigation}
//             icon_name={"StatsIcon"}
//             active_icon={true}
//             width={"100%"}
//             svg_icon_size={36}
//             border_top_width={2}
//             border_bottom_width={4}
//           />
//         </FlexibleContainer>
//       </GeneralFlexContainer>
//     </SafeArea>
//   );
// };
