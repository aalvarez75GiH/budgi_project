import React, { useContext } from "react";
import { FlatList, StyleSheet } from "react-native";

import { ExitHeaderComponent } from "../../global_components/organisms/headers/exit_header.component";
import { FlexibleContainer } from "../../global_components/containers/flexible_container";
import { theme } from "../../infrastructure/theme";
import { Text } from "../../infrastructure/typography/text.component";
import { GeneralFlexContainer } from "../../global_components/containers/general_flex_container";
import { Spacer } from "../../global_components/optimized.spacer.component";
import { BillToPayTile } from "../../global_components/organisms/tiles/bill_to_pay_tile";
import { TwoIconsHeaderComponent } from "../../global_components/organisms/headers/two_icons.header";

import { HomeContext } from "../../infrastructure/services/Home services/home.context";
import { AuthenticationContext } from "../../infrastructure/services/authentication/authentication.context";

export const BillsToPayListView = ({ navigation }) => {
  const {
    bills_by_user,
    setUpdateBillName,
    setUpdateBillInfoForRequest,
    updateBillInfoForRequest,
    setActionToDo,
  } = useContext(HomeContext);
  const { user } = useContext(AuthenticationContext);
  const { user_id } = user;
  // const { bills_by_user } = billToPayList;

  const movingForwardToSetBillNameView = (item) => {
    setActionToDo("update_bill");
    const {
      bill_id,
      bill_amount,
      bill_title,
      bill_short_name,
      type,
      icon_name,
      status,
      payment_date,
    } = item;
    console.log("BILL TITLE AT BILLS TO PAY LIST VIEW:", bill_title);
    setUpdateBillName(bill_title);

    setUpdateBillInfoForRequest((prevState) => ({
      ...prevState,
      user_id: user_id,
      icon_name: icon_name,
      updated_on: new Date(),
      status: status,
      bill_title: bill_title,
      bill_short_name: bill_short_name,
      bill_id: bill_id,
      type: type,
      bill_amount: bill_amount,
      payment_date: payment_date,
    }));

    navigation.navigate("bill_name_view");
    // navigation.navigate("bill_name_view", {
    //   action_to_do: "set_bill_name",
    // });
  };

  return (
    <GeneralFlexContainer color={theme.colors.bg.p_FFFFFF}>
      {/* <ExitHeaderComponent
        navigation={navigation}
        direction={"column"}
        color={theme.colors.bg.p_FFFFFF}
        // color={"#FAA"}
        flexibility={0.1}
        justify={"center"}
        icon_left={"80%"}
        icon_top={"30%"}
      /> */}
      <TwoIconsHeaderComponent
        navigation={navigation}
        direction={"row"}
        color={theme.colors.bg.p_FFFFFF}
        // color={"#FAA"}
        flexibility={0.17}
        action_icon_right={() => null}
        action_icon_left={() => navigation.goBack()}
        icon_name_left={"ExitIcon"}
        icon_name_right={"PlusIcon"}
        icon_top_left={"1%"}
        icon_left_left={"2%"}
        icon_top_right={"2%"}
        icon_left_right={"80%"}
        status={"active"}
        icon_left_size={20}
        icon_right_size={30}
      />

      <FlexibleContainer
        // color={"#898989"}
        color={theme.colors.bg.p_FFFFFF}
        direction="row"
        flexibility={0.03}
        justify={"flex-start"}
        isBordered={false}
      ></FlexibleContainer>
      <FlexibleContainer
        color={theme.colors.bg.p_FFFFFF}
        // color={"#FAD"}
        direction="row"
        flexibility={0.1}
        justify={"flex-start"}
        isBordered={false}
      >
        {/* <Spacer position="left" size="large" /> */}
        <GeneralFlexContainer color={theme.colors.bg.p_FFFFFF}>
          <Spacer position="left" size="extraLarge">
            <Spacer position="left" size="medium">
              <Text text_variant="bold_text_24">Monthly bills</Text>
            </Spacer>
          </Spacer>
        </GeneralFlexContainer>
      </FlexibleContainer>

      <FlexibleContainer
        // color={theme.colors.bg.p_FFFFFF}
        // color={"lightblue"}
        direction="column"
        flexibility={1}
        justify={"center"}
        isBordered={false}
      >
        <FlatList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={bills_by_user}
          // renderItem={renderItem(navigation, comingFrom)}
          renderItem={({ item }) => (
            <BillToPayTile
              icon_name={item.icon_name}
              bill_title={item.bill_short_name}
              bill_amount={item.bill_amount}
              payment_due_date={item.payment_date}
              action={() => movingForwardToSetBillNameView(item)}
            />
          )}
          keyExtractor={(item, id) => {
            return item.bill_id;
          }}
        />
      </FlexibleContainer>
    </GeneralFlexContainer>
  );
};

const styles = StyleSheet.create({
  flatListContent: {
    // backgroundColor: "red",
    width: 400,
    paddingHorizontal: 3,
    height: "100%",
  },
  itemSeparator: {
    height: 0.5,
  },
  columnWrapper: {
    justifyContent: "space-evenly",
    paddingVertical: 1,
  },
});
