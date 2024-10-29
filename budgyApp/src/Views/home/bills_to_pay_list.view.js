import React, { useContext, useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";

import { ExitHeaderComponent } from "../../global_components/organisms/headers/exit_header.component";
import { FlexibleContainer } from "../../global_components/containers/flexible_container";
import { theme } from "../../infrastructure/theme";
import { Text } from "../../infrastructure/typography/text.component";
import { GeneralFlexContainer } from "../../global_components/containers/general_flex_container";
import { Spacer } from "../../global_components/optimized.spacer.component";
import { BillToPayTile } from "../../global_components/organisms/tiles/bill_to_pay_tile";
import { TwoIconsHeaderComponent } from "../../global_components/organisms/headers/two_icons.header";
import { IsLoadingContainer } from "../../global_components/containers/isLoading_container";
import { SVGComponent } from "../../global_components/image_components/svg.component";
import { RNPIconButton } from "../../global_components/buttons/RNP_icon_button";

import { HomeContext } from "../../infrastructure/services/Home services/home.context";
import { AuthenticationContext } from "../../infrastructure/services/authentication/authentication.context";
import { ControlledContainer } from "../../global_components/containers/controlled_container";
import { ClickableControlledContainer } from "../../global_components/containers/clickable_controlled_container";

export const BillsToPayListView = ({ navigation }) => {
  const {
    bills_by_user,
    setUpdateBillName,
    setUpdateBillInfoForRequest,
    setActionToDo,
    isLoadingBillRequest,
    fetchingBillsByUser,
    bills_list_by_user,
    setDeleteBillInfo,
    billsPaused,
  } = useContext(HomeContext);
  console.log(
    "BILLS LIST BY USER AT BILLS TO PAY LIST VIEW:",
    JSON.stringify(bills_list_by_user, null, 2)
  );
  const { bills_total_amount } = bills_list_by_user;
  const { user } = useContext(AuthenticationContext);
  const { user_id } = user;

  useEffect(() => {
    fetchingBillsByUser();
  }, []);

  const movingForwardToNewCategoryNameViewForUpdatingBill = (item) => {
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

  const movingForwardToNewCategoryNameViewForCreatingABill = () => {
    setActionToDo("create_bill");
    navigation.navigate("bill_name_view");
  };

  const movingForwardToDeleteBill = (item) => {
    setActionToDo("delete_bill");
    setDeleteBillInfo({
      bill_id: item.bill_id,
      bill_title: item.bill_title,
      bill_short_name: item.bill_short_name,
      bill_amount: item.bill_amount,
      payment_date: item.payment_date,
    });
    navigation.navigate("Delete_confirmation_view", {
      document_id: item.bill_id,
      comingFrom: "bills_to_pay_list_view",
    });
  };

  const movingForwardToPauseBill = (item) => {
    setActionToDo("pause_bill");
    setDeleteBillInfo({
      bill_id: item.bill_id,
      bill_title: item.bill_title,
      bill_short_name: item.bill_short_name,
      bill_amount: item.bill_amount,
      payment_date: item.payment_date,
    });
    navigation.navigate("Delete_confirmation_view", {
      document_id: item.bill_id,
      comingFrom: "bills_to_pay_list_view_pausing",
    });
  };

  const renderBillItem = ({ item }) => {
    const { status } = item;
    if (status === "Paused") {
      return null;
    }
    return (
      <BillToPayTile
        icon_name={item.icon_name}
        bill_title={item.bill_short_name}
        bill_amount={item.bill_amount}
        payment_due_date={item.payment_date}
        type={item.type}
        action={() => movingForwardToNewCategoryNameViewForUpdatingBill(item)}
        action_for_deletion={() => movingForwardToDeleteBill(item)}
        action_for_pausing={() => movingForwardToPauseBill(item)}
        bill_status={item.status}
      />
    );
  };

  return isLoadingBillRequest ? (
    <FlexibleContainer
      color={theme.colors.bg.p_FFFFFF}
      direction="row"
      flexibility={1}
      justify={"center"}
      isBordered={false}
      alignment={"center"}
    >
      <IsLoadingContainer
        size="large"
        color={theme.colors.brand.primary}
        caption="Loading transactions..."
      />
    </FlexibleContainer>
  ) : (
    <GeneralFlexContainer color={theme.colors.bg.p_FFFFFF}>
      <TwoIconsHeaderComponent
        navigation={navigation}
        direction={"row"}
        color={theme.colors.bg.p_FFFFFF}
        // color={"#FAA"}
        flexibility={0.17}
        action_icon_right={() =>
          movingForwardToNewCategoryNameViewForCreatingABill()
        }
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
        //color={"#F5F5F5"}
        color={theme.colors.bg.p_FFFFFF}
        direction="row"
        flexibility={0.05}
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
          renderItem={renderBillItem}
          keyExtractor={(item, id) => {
            return item.bill_id;
          }}
        />
      </FlexibleContainer>
      <FlexibleContainer
        color={theme.colors.neutrals.e3_D6D6D6}
        direction="row"
        flexibility={0.1}
        justify={"space-evenly"}
        isBordered={false}
      >
        <ControlledContainer
          color={theme.colors.neutrals.e3_D6D6D6}
          width={"30%"}
          height={"45px"}
          justify="center"
          alignment="flex-start"
        />
        <ControlledContainer
          color={theme.colors.neutrals.e3_D6D6D6}
          width={"50%"}
          height={"45px"}
          justify="center"
          alignment="flex-start"
        >
          <Text text_variant="bold_text_16">Bills total amount:</Text>
        </ControlledContainer>
        <ControlledContainer
          color={theme.colors.neutrals.e3_D6D6D6}
          width={"45%"}
          height={"45px"}
          justify="center"
          alignment="flex-start"
        >
          {/* <Text text_variant="bold_text_16">{bills_total_amount}</Text> */}
          <Text text_variant="bold_text_16">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(bills_total_amount)}
          </Text>
        </ControlledContainer>
      </FlexibleContainer>
      {billsPaused.length > 0 && (
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate("paused_bills_list_view")}
        >
          <FlexibleContainer
            color={theme.colors.neutrals.e3_D6D6D6}
            direction="row"
            flexibility={0.1}
            justify={"space-evenly"}
            isBordered={false}
          >
            <ControlledContainer
              color={"#FFF4C2"}
              // color={"red"}
              width={"15%"}
              height={"50px"}
              justify="center"
              alignment="flex-start"
            />
            <ControlledContainer
              // color={theme.colors.neutrals.e3_D6D6D6}
              color={"#FFF4C2"}
              // color={"brown"}
              width={"70%"}
              height={"50px"}
              justify="center"
              alignment="flex-start"
            >
              <Spacer position="left" size="medium">
                <Text text_variant="bold_text_16">
                  You have bills that are paused
                </Text>
              </Spacer>
            </ControlledContainer>
            <ControlledContainer
              // color={theme.colors.neutrals.e3_D6D6D6}
              color={"#FFF4C2"}
              // color={"blue"}
              width={"15%"}
              height={"50px"}
              justify="center"
              alignment="center"
            >
              <RNPIconButton
                action={() => navigation.navigate("paused_bills_list_view")}
                icon="chevron-right"
                width={"0%"}
                color={theme.colors.brand.primary}
                align={"center"}
              />
            </ControlledContainer>
          </FlexibleContainer>
        </TouchableWithoutFeedback>
      )}
    </GeneralFlexContainer>
  );
};
