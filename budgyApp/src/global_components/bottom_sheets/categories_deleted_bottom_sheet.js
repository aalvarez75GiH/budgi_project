import React, { useContext, useRef, useEffect } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

import { Text } from "../../infrastructure/typography/text.component";
import { ControlledContainer } from "../containers/controlled_container";
import { SVGComponent } from "../image_components/svg.component";
import { theme } from "../../infrastructure/theme";
import { FlexibleContainer } from "../containers/flexible_container";
import { RegularCTAButton } from "../buttons/cta_btn";

import { CategoryListContext } from "../../infrastructure/services/category_list/category_list.context";

export const CategoryDeletedBottomSheet = ({
  navigation,
  movingBackToHome,
}) => {
  const { categoryDeleted, categorySuspended, modalActive, setModalActive } =
    useContext(CategoryListContext);
  console.log("CATEGORY SUSPENDED:", categorySuspended);
  console.log("CATEGORY DELETED:", categoryDeleted);
  console.log("MODAL ACTIVE AT COMPONENT:", modalActive);

  const bottomSheetModalRef = useRef(null);
  const snapPoints = ["35%", "50%", "75%"];

  useEffect(() => {
    if (modalActive) {
      bottomSheetModalRef.current?.present();
    } else {
      bottomSheetModalRef.current?.dismiss();
    }
  }, [modalActive]);

  useEffect(() => {
    if (categorySuspended || categoryDeleted) {
      setModalActive(true);
    }
  }, [categorySuspended, categoryDeleted, modalActive]);

  return (
    <>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={2}
        snapPoints={snapPoints}
        backgroundStyle={{
          backgroundColor: "#FFFFFF",
          borderRadius: 50,
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
        }}
      >
        <FlexibleContainer
          // color={"lightblue"}
          color={"transparent"}
          direction="column"
          flexibility={0.5}
          justify={"center"}
          isBordered={false}
          alignment={"center"}
        >
          <SVGComponent
            icon_width={100}
            icon_height={100}
            position={"static"}
            justify={"center"}
            icon_name={"RemoveIcon"}
            icon_color={theme.colors.buttons.s_142223C}
          />
        </FlexibleContainer>
        <FlexibleContainer
          color={"transparent"}
          // color={"lightgray"}
          direction="column"
          flexibility={0.1}
          justify={"center"}
          isBordered={false}
          alignment={"center"}
        >
          <ControlledContainer
            color={"transparent"}
            width={"100%"}
            height={"40px"}
            justify="flex-start"
            alignment="flex-start"
            direction="column"
            style={{ paddingLeft: 20 }}
          >
            <Text text_variant="bold_text_16">
              The category has been deleted successfully
            </Text>
          </ControlledContainer>
          <ControlledContainer
            color={"white"}
            width={"100%"}
            height={"40px"}
            justify="flex-start"
            alignment="flex-start"
            direction="column"
            style={{ paddingLeft: 20 }}
          >
            <Text text_variant="regular_text_14">
              Press button to finish and come back home...
            </Text>
          </ControlledContainer>
        </FlexibleContainer>
        <FlexibleContainer
          color={"transparent"}
          // color={"gray"}
          direction="column"
          flexibility={0.2}
          justify={"center"}
          isBordered={false}
          alignment={"center"}
        ></FlexibleContainer>
        <FlexibleContainer
          color={"transparent"}
          // color={"red"}
          direction="column"
          flexibility={0.1}
          justify={"center"}
          isBordered={false}
          alignment={"center"}
        >
          <RegularCTAButton
            caption="Done"
            width={310}
            height={50}
            color={theme.colors.ui.t_FC9827}
            borderRadius={50}
            action={() => movingBackToHome(navigation)}
            text_variant="bold_text_20"
            isLoading={false}
          />
        </FlexibleContainer>
      </BottomSheetModal>
    </>
  );
};
