import React, { useContext, useEffect } from "react";
import { FlatList, StyleSheet } from "react-native";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

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
import { ActivatingBillBottomSheet } from "../../global_components/bottom_sheets/activating_bill_bottom_sheet";
import { se } from "date-fns/locale";

export const PausedBillsListView = ({ navigation }) => {
  const {
    bills_by_user,
    setUpdateBillName,
    setUpdateBillInfoForRequest,
    updateBillInfoForRequest,
    setActionToDo,
    isLoadingBillRequest,
    fetchingBillsByUser,
    bills_list_by_user,
    setDeleteBillInfo,
    billsPaused,
    setModalActive,
    setActivatedBill,
    modalActive,
    activatingBillFromBillsListByUserIdAndBillID,
  } = useContext(HomeContext);
  //   console.log(
  //     "BILLS LIST BY USER AT BILLS TO PAY LIST VIEW:",
  //     JSON.stringify(bills_list_by_user, null, 2)
  //   );
  //   const { bills_total_amount } = bills_list_by_user;
  const { user } = useContext(AuthenticationContext);
  const { user_id } = user;

  useEffect(() => {
    return () => {
      setModalActive(false);
      setActivatedBill(false);
    };
  }, []);

  const movingForwardToUnPausedBill = async (item) => {
    setActionToDo("UnPause_bill");
    setModalActive(true);
    setActivatedBill(true);

    await activatingBillFromBillsListByUserIdAndBillID(user_id, item.bill_id);
  };

  const renderPausedBillsItem = ({ item }) => {
    const { status } = item;
    return (
      <BillToPayTile
        icon_name={item.icon_name}
        bill_title={item.bill_short_name}
        bill_amount={item.bill_amount}
        payment_due_date={item.payment_date}
        type={item.type}
        action={() => null}
        action_for_deletion={() => movingForwardToDeleteBill(item)}
        action_for_pausing={() => null}
        action_for_unpausing={() => movingForwardToUnPausedBill(item)}
        bill_status={status}
      />
    );
  };

  return (
    <GestureHandlerRootView>
      <GeneralFlexContainer color={theme.colors.bg.p_FFFFFF}>
        <BottomSheetModalProvider>
          <ExitHeaderComponent
            navigation={navigation}
            direction={"column"}
            color={theme.colors.bg.p_FFFFFF}
            // color={"#FAA"}
            flexibility={0.13}
            justify={"center"}
            icon_left={"80%"}
            icon_top={"30%"}
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
                  <Text text_variant="bold_text_24">Paused bills</Text>
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
              data={billsPaused}
              renderItem={renderPausedBillsItem}
              keyExtractor={(item, id) => {
                return item.bill_id;
              }}
            />
          </FlexibleContainer>
          {modalActive && (
            <ActivatingBillBottomSheet
              navigation={navigation}
              movingBackToHome={() => null}
            />
          )}
        </BottomSheetModalProvider>
      </GeneralFlexContainer>
    </GestureHandlerRootView>
  );
};

// return isLoadingBillRequest ? (
//     <FlexibleContainer
//       color={theme.colors.bg.p_FFFFFF}
//       direction="row"
//       flexibility={1}
//       justify={"center"}
//       isBordered={false}
//       alignment={"center"}
//     >
//       <IsLoadingContainer
//         size="large"
//         color={theme.colors.brand.primary}
//         caption="Loading transactions..."
//       />
//     </FlexibleContainer>
//   ) : (
//     <GestureHandlerRootView>
//       <GeneralFlexContainer color={theme.colors.bg.p_FFFFFF}>
//         <BottomSheetModalProvider>
//           <ExitHeaderComponent
//             navigation={navigation}
//             direction={"column"}
//             color={theme.colors.bg.p_FFFFFF}
//             // color={"#FAA"}
//             flexibility={0.13}
//             justify={"center"}
//             icon_left={"80%"}
//             icon_top={"30%"}
//           />

//           <FlexibleContainer
//             //color={"#F5F5F5"}
//             color={theme.colors.bg.p_FFFFFF}
//             direction="row"
//             flexibility={0.05}
//             justify={"flex-start"}
//             isBordered={false}
//           ></FlexibleContainer>
//           <FlexibleContainer
//             color={theme.colors.bg.p_FFFFFF}
//             // color={"#FAD"}
//             direction="row"
//             flexibility={0.1}
//             justify={"flex-start"}
//             isBordered={false}
//           >
//             {/* <Spacer position="left" size="large" /> */}
//             <GeneralFlexContainer color={theme.colors.bg.p_FFFFFF}>
//               <Spacer position="left" size="extraLarge">
//                 <Spacer position="left" size="medium">
//                   <Text text_variant="bold_text_24">Paused bills</Text>
//                 </Spacer>
//               </Spacer>
//             </GeneralFlexContainer>
//           </FlexibleContainer>

//           <FlexibleContainer
//             // color={theme.colors.bg.p_FFFFFF}
//             // color={"lightblue"}
//             direction="column"
//             flexibility={1}
//             justify={"center"}
//             isBordered={false}
//           >
//             <FlatList
//               showsHorizontalScrollIndicator={false}
//               showsVerticalScrollIndicator={false}
//               data={billsPaused}
//               renderItem={renderPausedBillsItem}
//               keyExtractor={(item, id) => {
//                 return item.bill_id;
//               }}
//             />
//           </FlexibleContainer>
//           {modalActive && (
//             <ActivatingBillBottomSheet
//               navigation={navigation}
//               movingBackToHome={() => null}
//             />
//           )}
//         </BottomSheetModalProvider>
//       </GeneralFlexContainer>
//     </GestureHandlerRootView>
//   );
