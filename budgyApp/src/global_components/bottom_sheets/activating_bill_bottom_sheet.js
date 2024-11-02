import React, { useContext, useRef, useEffect } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

import { Text } from "../../infrastructure/typography/text.component";
import { ControlledContainer } from "../containers/controlled_container";
import { SVGComponent } from "../image_components/svg.component";
import { FlexibleContainer } from "../containers/flexible_container";
import { RegularCTAButton } from "../buttons/cta_btn";
import { Spacer } from "../optimized.spacer.component";
import { theme } from "../../infrastructure/theme";

import { HomeContext } from "../../infrastructure/services/Home services/home.context";
import { AuthenticationContext } from "../../infrastructure/services/authentication/authentication.context";

export const ActivatingBillBottomSheet = ({ navigation, movingBackToHome }) => {
  const {
    activatedBill,
    modalActive,
    setModalActive,
    activatingBillFromBillsListByUserIdAndBillID,
    isLoadingBillRequest,
    billToActivate,
  } = useContext(HomeContext);
  console.log("ACTIVATED BILL:", activatedBill);
  console.log("MODAL ACTIVE AT ACTIVATING BILL BOTTOM SHEET:", modalActive);
  const { user } = useContext(AuthenticationContext);
  const { user_id } = user;
  const bottomSheetModalRef = useRef(null);
  const snapPoints = ["32%", "50%", "75%"];

  useEffect(() => {
    if (modalActive) {
      bottomSheetModalRef.current?.present();
    } else {
      bottomSheetModalRef.current?.dismiss();
    }
  }, [modalActive]);

  useEffect(() => {
    if (activatedBill) {
      setModalActive(true);
    }
  }, [activatedBill]);

  return (
    <>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        backgroundStyle={{
          //   backgroundColor: "#FFFFFF",
          //   backgroundColor: theme.colors.neutrals.e3_D6D6D6,
          backgroundColor: "#F5F5F5",
          borderRadius: 50,
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
        }}
        enablePanDownToClose={false}
        dismissOnBackdropPress={false}
      >
        <FlexibleContainer
          color={"transparent"}
          //   color={"lightgray"}
          direction="column"
          flexibility={0.1}
          justify={"flex-start"}
          isBordered={false}
          alignment={"center"}
        >
          <ControlledContainer
            color={"transparent"}
            //color={"blue"}
            width={"60%"}
            height={"55px"}
            justify="center"
            alignment="center"
            direction="column"
            style={{ paddingLeft: 20 }}
          >
            <Spacer position="bottom" size="medium" />
            <Text text_variant="bold_text_20">Activate this bill?</Text>
          </ControlledContainer>
        </FlexibleContainer>

        <FlexibleContainer
          color={"transparent"}
          //   color={"red"}
          direction="column"
          flexibility={0.2}
          justify={"center"}
          isBordered={false}
          alignment={"center"}
        >
          <RegularCTAButton
            caption="Yes, activate it"
            width={310}
            height={50}
            color={theme.colors.ui.t_FC9827}
            borderRadius={50}
            action={() =>
              activatingBillFromBillsListByUserIdAndBillID(
                navigation,
                user_id,
                billToActivate
              )
            }
            // action={() =>
            //   activatingBillFromBillsListByUserIdAndBillID(
            //     navigation,
            //     user_id,
            //     "867ab07c-d0e3-4292-9dd4-f7b5dd5de5cb"
            //   )
            // }
            text_variant="bold_text_20"
            isLoading={isLoadingBillRequest}
          />
        </FlexibleContainer>
      </BottomSheetModal>
    </>
  );
};
