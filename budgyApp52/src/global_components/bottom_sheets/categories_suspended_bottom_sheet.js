import React, { useContext, useRef, useEffect } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

import { Text } from "../../infrastructure/typography/text.component";
import { ControlledContainer } from "../containers/controlled_container";
import { SVGComponent } from "../image_components/svg.component";
import { theme } from "../../infrastructure/theme";
import { FlexibleContainer } from "../containers/flexible_container";
import { RegularCTAButton } from "../buttons/cta_btn";
import { Spacer } from "../optimized.spacer.component";

import { CategoryListContext } from "../../infrastructure/services/category_list/category_list.context";

export const CategorySuspendedBottomSheet = ({
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
          //   color={"lightblue"}
          color={"transparent"}
          direction="column"
          flexibility={0.3}
          justify={"center"}
          isBordered={false}
          alignment={"center"}
        >
          <SVGComponent
            icon_width={70}
            icon_height={70}
            position={"static"}
            justify={"center"}
            icon_name={"DescriptionIcon"}
            // icon_color={theme.colors.buttons.s_142223C}
            icon_color={"#000000"}
          />
        </FlexibleContainer>
        <FlexibleContainer
          color={"transparent"}
          //   color={"lightgray"}
          direction="column"
          flexibility={0.6}
          justify={"flex-start"}
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
            <Spacer position="bottom" size="medium" />
            <Text text_variant="bold_text_16">
              This category has been suspended
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
              due to this category has transactions related to it
            </Text>
            <Text text_variant="regular_text_14"> so it can't be deleted.</Text>
            <Spacer position="bottom" size="medium" />
            <Spacer position="bottom" size="medium" />
            <Text text_variant="regular_text_14">
              You will see it in the "Suspended categories" option
            </Text>
            <Text text_variant="regular_text_14">
              at "Budget" section. If you want to delete it, fallow the
            </Text>
            <Text text_variant="regular_text_14">next steps:</Text>
            <Spacer position="bottom" size="medium" />
            <Spacer position="bottom" size="medium" />
            <Spacer position="bottom" size="medium" />
            <Spacer position="bottom" size="medium" />
            <Text text_variant="regular_text_14">
              1. Activate this category.
            </Text>
            <Spacer position="bottom" size="medium" />
            <Spacer position="bottom" size="medium" />
            <Spacer position="bottom" size="medium" />
            <Text text_variant="regular_text_14">
              2. Delete the transactions related to this category.
            </Text>
            <Spacer position="bottom" size="medium" />
            <Spacer position="bottom" size="medium" />
            <Spacer position="bottom" size="medium" />
            <Text text_variant="regular_text_14">
              3. Try to delete this category again.
            </Text>
            {/* <Spacer position="bottom" size="medium" />
            <Spacer position="bottom" size="medium" />
            <Text text_variant="regular_text_14">
              Press "Done" button to continue.
            </Text> */}
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
          //   color={"red"}
          direction="column"
          flexibility={0.3}
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
