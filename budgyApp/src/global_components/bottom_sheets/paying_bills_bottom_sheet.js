import React, { useContext, useRef, useEffect, useState } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { FlatList } from "react-native-gesture-handler";

import { Text } from "../../infrastructure/typography/text.component";
import { ControlledContainer } from "../containers/controlled_container";
import { FlexibleContainer } from "../containers/flexible_container";
import { LinkButton } from "../buttons/link_button";
import { Spacer } from "../optimized.spacer.component";
import { theme } from "../../infrastructure/theme";
import { SquaredRoundedOptionComponent } from "../organisms/clickables options/squared_rounded_option.component";

import { HomeContext } from "../../infrastructure/services/Home services/home.context";
import { DateOperationsContext } from "../../infrastructure/services/date_operations/date_operations.context";

export const PayingBillsBottomSheet = () => {
  const { bills_by_user, setModalActive, modalActive } =
    useContext(HomeContext);

  console.log("MODAL ACTIVE AT ACTIVATING BILL BOTTOM SHEET:", modalActive);

  const bottomSheetModalRef = useRef(null);
  const snapPoints = ["47%"];

  const [sortedBills, setSortedBills] = useState([]);

  const { billCurrentDate } = useContext(DateOperationsContext);

  useEffect(() => {
    if (modalActive) {
      bottomSheetModalRef.current?.present();
    } else {
      bottomSheetModalRef.current?.dismiss();
    }
  }, [modalActive]);

  useEffect(() => {
    const sortBillsByTimestamp = (bills_by_user) => {
      return bills_by_user.sort(
        (a, b) =>
          a.payment_date_timeStamp._seconds - b.payment_date_timeStamp._seconds
      );
    };

    const sortedBills = sortBillsByTimestamp(bills_by_user);
    setSortedBills(sortedBills);
  }, [bills_by_user]);

  const renderUnPaidBillItem = ({ item }) => {
    const { status, bill_id } = item;
    if (status === "Paused") {
      return null;
    }
    return <SquaredRoundedOptionComponent item={item} bill_id={bill_id} />;
  };

  return (
    <>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        backgroundStyle={{
          backgroundColor: "#ebebeb",
          borderRadius: 50,
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
          borderWidth: 2,
          borderColor: "#ebebeb",
        }}
        enablePanDownToClose={false}
        dismissOnBackdropPress={false}
      >
        <FlexibleContainer
          //   color={"lightblue"}
          direction="column"
          flexibility={0.8}
          justify={"center"}
          isBordered={false}
          alignment={"center"}
        >
          <ControlledContainer
            width={"95%"}
            height={"100%"}
            justify="center"
            alignment="center"
            color={"transparent"}
            // color={"lightblue"}
            direction="column"
          >
            <ControlledContainer
              width={"95%"}
              height={"30%"}
              justify="center"
              alignment="center"
              color={"transparent"}
              //color={"red"}
              direction="column"
            >
              <Spacer position="left" size="large">
                <Text text_variant="bold_text_16">
                  Select bills you have paid till today
                </Text>
              </Spacer>
              <Spacer position="left" size="small">
                <Text text_variant="bold_text_16">{billCurrentDate}</Text>
              </Spacer>
            </ControlledContainer>
            <ControlledContainer
              width={"95%"}
              height={"15%"}
              justify="center"
              alignment="center"
              color={"transparent"}
              //color={"red"}
              direction="column"
            />
            <ControlledContainer
              width={"95%"}
              height={"45%"}
              justify="center"
              alignment="center"
              color={"transparent"}
              //   color={"green"}
              direction="row"
            >
              <FlatList
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={sortedBills}
                renderItem={renderUnPaidBillItem}
                keyExtractor={(item) => item.bill_id}
                style={{ flex: 1 }}
                contentContainerStyle={{ flexGrow: 1 }}
              />
            </ControlledContainer>
          </ControlledContainer>
        </FlexibleContainer>

        <FlexibleContainer
          //   color={"brown"}
          direction="column"
          flexibility={0.4}
          justify={"center"}
          isBordered={false}
          alignment={"center"}
        >
          <LinkButton
            caption={"Close"}
            action={() => setModalActive(false)}
            color={theme.colors.ui.t_FC9827}
          />
        </FlexibleContainer>
      </BottomSheetModal>
    </>
  );
};
