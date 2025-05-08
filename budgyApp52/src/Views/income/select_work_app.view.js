import React, { useContext } from "react";
import { FlatList } from "react-native";

import { theme } from "../../infrastructure/theme";
import { GeneralFlexContainer } from "../../global_components/containers/general_flex_container";
import { FlexibleContainer } from "../../global_components/containers/flexible_container";
import { SafeArea } from "../../global_components/safe-area.component";
import { BackHeaderWithLabelComponent } from "../../global_components/organisms/headers/back_header_withLabel.component";
import { WorkAppTile } from "../../global_components/organisms/tiles/work_app_tile";
import { TotalAmountTile } from "../../global_components/organisms/tiles/total_amount_tile";

import { RealIncomeContext } from "../../infrastructure/services/real_income/real_income.context";

export const SelectWorkAppView = ({ navigation, route }) => {
  const { realIncomeOnDemand } = route.params;
  const { work_apps, total_amount, month_year } = realIncomeOnDemand;
  console.log(
    "REAL INCOME ON DEMAND AT SELECT WORK APP VIEW:",
    realIncomeOnDemand
  );
  // console.log("REAL INCOME WORK APPS AT SELECT WORK APPS VIEW:", work_apps);

  const { setRealIncomeForRequest, realIncomeForRequest } =
    useContext(RealIncomeContext);
  const goingBack = (navigation) => {
    navigation.goBack();
  };

  const selectingAppForRealIncome = (item) => {
    console.log("ITEM:", JSON.stringify(item, null, 2));
    if (item.app_name !== "Cash") {
      setRealIncomeForRequest({
        ...realIncomeForRequest,
        app_id: item.app_id,
        app_name: item.app_name,
        logo_path: item.logo_path,
        month_year: month_year,
      });
      navigation.navigate("Select_week_view", {
        real_income_selected: item,
      });
    }
    if (item.app_name === "Cash") {
      setRealIncomeForRequest({
        ...realIncomeForRequest,
        app_id: item.app_id,
        app_name: item.app_name,
        logo_path: item.logo_path,
        earned_amount: item.collected_money,
      });
      navigation.navigate("Enter_amount_view", {
        real_income_selected: item,
        comingFrom: "comingFromCash",
      });
    }
    // setRealIncomeForRequest({
    //   ...realIncomeForRequest,
    //   app_id: item.app_id,
    //   app_name: item.app_name,
    //   logo_path: item.logo_path,
    // });
  };

  const renderWorkAppItem =
    (navigation) =>
    ({ item }) => {
      const { logo_path, app_name, collected_money, icon_color } = item;
      return (
        <WorkAppTile
          app_name={app_name}
          icon_name={logo_path}
          isSelected={true}
          action={() => selectingAppForRealIncome(item)}
          collected_money={collected_money}
          icon_color={icon_color}
        />
      );
    };

  return (
    <SafeArea background_color={theme.colors.bg.p_FFFFFF}>
      <GeneralFlexContainer color={theme.colors.bg.p_FFFFFF}>
        <BackHeaderWithLabelComponent
          navigation={navigation}
          caption="Select app"
          direction={"row"}
          // color={theme.colors.bg.p_FFFFFF}
          // color={"#FAD"}
          flexibility={0.3}
          action={() => goingBack(navigation)}
          align="flex-end"
          caption_margin_left={"0%"}
        />
        <FlexibleContainer
          direction={"column"}
          // color={theme.colors.bg.e_F4F4F4}
          color={theme.colors.bg.p_FFFFFF}
          // color="lightgray"
          flexibility={1.8}
          justify={"flex-start"}
        >
          <FlatList
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            data={work_apps}
            renderItem={renderWorkAppItem(navigation)}
            keyExtractor={(item, id) => {
              return item.app_id;
            }}
          />
        </FlexibleContainer>
        <FlexibleContainer
          direction={"column"}
          // color={"lightblue"}
          color={theme.colors.bg.p_FFFFFF}
          flexibility={0.6}
          justify={"flex-start"}
          // isBordered={true}
        >
          <TotalAmountTile
            caption="Total:"
            real_income_total_amount={total_amount}
          />
        </FlexibleContainer>
      </GeneralFlexContainer>
    </SafeArea>
  );
};
