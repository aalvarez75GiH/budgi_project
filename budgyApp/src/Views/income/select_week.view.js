import React, { useContext } from "react";
import { FlatList } from "react-native";

import { theme } from "../../infrastructure/theme";
import { GeneralFlexContainer } from "../../global_components/containers/general_flex_container";
import { FlexibleContainer } from "../../global_components/containers/flexible_container";
import { SafeArea } from "../../global_components/safe-area.component";
import { BackHeaderWithLabelComponent } from "../../global_components/organisms/headers/back_header_withLabel.component";
import { IncomeWeekTile } from "../../global_components/organisms/tiles/income_week_tile";

import { RealIncomeContext } from "../../infrastructure/services/real_income/real_income.context";
export const SelectWeekView = ({ navigation, route }) => {
  const { real_income_selected } = route.params;
  const { weeks } = real_income_selected;

  console.log("WEEKS:", JSON.stringify(weeks, null, 2));
  console.log("EARNED AMOUNT:", weeks[0].earned_amount);
  console.log("WEEK NAME:", weeks[0].week_name);

  const { setRealIncomeForRequest, realIncomeForRequest } =
    useContext(RealIncomeContext);
  console.log(
    "REAL INCOME FOR REQUEST AT SELECT WEEK VIEW:",
    realIncomeForRequest
  );
  //   const { realIncomeOnDemand } = route.params;
  //   const { work_apps, total_amount } = realIncomeOnDemand;
  //   console.log(
  //     "REAL INCOME ON DEMAND AT REAL INCOME DETAILS:",
  //     realIncomeOnDemand
  //   );
  //   console.log("REAL INCOME WORK APPS AT SELECT WORK APPS VIEW:", work_apps);

  const goingBack = (navigation) => {
    navigation.goBack();
  };

  const selectingWeekForRealIncome = (item) => {
    console.log("Item:", item);
    console.log("Item:", item.week_name);
    setRealIncomeForRequest({
      ...realIncomeForRequest,
      week_name: item.week_name,
      earned_amount: item.earned_amount !== 0 ? item.earned_amount : 0,
    });
    console.log("REAL INCOME FOR REQUEST AT SELECTING:", realIncomeForRequest);
    navigation.navigate("Enter_amount_view", {
      comingFrom: "Select_week_view",
    });
  };
  const renderWeekItem =
    (navigation) =>
    ({ item }) => {
      const { earned_amount, week_name } = item;
      return (
        <IncomeWeekTile
          earned_amount={earned_amount}
          week_name={week_name}
          action={() => selectingWeekForRealIncome(item)}
        />
      );
    };

  return (
    <SafeArea background_color={theme.colors.bg.p_FFFFFF}>
      <GeneralFlexContainer color={theme.colors.bg.p_FFFFFF}>
        <BackHeaderWithLabelComponent
          navigation={navigation}
          caption="Select week"
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
          {/* <IncomeWeekTile
            earned_amount={weeks[0].earned_amount}
            week_name={weeks[0].week_name}
          /> */}
          <FlatList
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            data={weeks}
            renderItem={renderWeekItem(navigation)}
            keyExtractor={(item, id) => {
              return item.week_name;
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
          {/* <TotalAmountTile
            caption="Total:"
            real_income_total_amount={total_amount}
          /> */}
        </FlexibleContainer>
      </GeneralFlexContainer>
    </SafeArea>
  );
};
