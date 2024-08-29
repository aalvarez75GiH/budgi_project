import React, { useContext, useRef, useEffect } from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

import { Text } from "../../infrastructure/typography/text.component";
import { ControlledContainer } from "../containers/controlled_container";
import { SVGComponent } from "../image_components/svg.component";
import { theme } from "../../infrastructure/theme";
import { FlexibleContainer } from "../containers/flexible_container";
import { RegularCTAButton } from "../buttons/cta_btn";
import { Spacer } from "../optimized.spacer.component";
import { ExitHeaderComponent } from "../organisms/headers/exit_header.component";
import { BackHeaderComponent } from "../organisms/headers/back_header.component";
import { BackHeaderWithLabelAndCancelButton } from "../organisms/headers/back_header+label+cancel.header";

import { CategoryListContext } from "../../infrastructure/services/category_list/category_list.context";
import { CategoryDataContext } from "../../infrastructure/services/category_data/category_data.context";

export const TransferMoneyExplanationBottomSheet = ({
  navigation,
  movingBackToHome,
}) => {
  const { modalActive, setModalActive } = useContext(CategoryDataContext);
  console.log("MODAL ACTIVE AT COMPONENT:", modalActive);

  const bottomSheetModalRef = useRef(null);
  const snapPoints = ["35%", "50%", "75%", "100%"];

  useEffect(() => {
    if (modalActive) {
      bottomSheetModalRef.current?.present();
    } else {
      bottomSheetModalRef.current?.dismiss();
    }
    return () => setModalActive(false);
  }, [modalActive]);

  return (
    <>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={3}
        snapPoints={snapPoints}
        backgroundStyle={{
          backgroundColor: "#FFFFFF",
          borderRadius: 50,
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
        }}
      >
        <BackHeaderWithLabelAndCancelButton
          caption=""
          direction={"row"}
          color={theme.colors.bg.p_FFFFFF}
          //   color={"#FAD"}
          flexibility={0.2}
          arrow_left_action={() => navigation.goBack()}
          cancel_button_action={() => navigation.navigate("BudgetView")}
          align={"center"}
        />
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
              Do you wanna transfer money?
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
              You can transfer money from another category
            </Text>
            <Text text_variant="regular_text_14">to this one.</Text>
            <Spacer position="bottom" size="medium" />
            <Text text_variant="regular_text_14">
              {" "}
              Doing this, you wouldn't need to modify your
            </Text>
            <Spacer position="bottom" size="medium" />
            <Text text_variant="regular_text_14"> original budget</Text>
            <Spacer position="bottom" size="medium" />
            <Spacer position="bottom" size="medium" />
            <Spacer position="bottom" size="medium" />
            <Text text_variant="bold_text_14">
              These are the steps you will need to do:
            </Text>

            <Spacer position="bottom" size="medium" />
            <Spacer position="bottom" size="medium" />
            <Spacer position="bottom" size="medium" />
            <Text text_variant="regular_text_14">
              1. Choose the category that has money availabe.
            </Text>
            <Spacer position="bottom" size="medium" />
            <Spacer position="bottom" size="medium" />
            <Spacer position="bottom" size="medium" />
            <Text text_variant="regular_text_14">
              2. Enter the amount of money that you wanna
            </Text>
            <Text text_variant="regular_text_14">transfer.</Text>
            <Spacer position="bottom" size="medium" />
            <Spacer position="bottom" size="medium" />
            <Spacer position="bottom" size="medium" />
            <Text text_variant="regular_text_14">
              3. Confirm the money transfer.
            </Text>
            <Spacer position="bottom" size="medium" />
            <Spacer position="bottom" size="medium" />
            <Spacer position="bottom" size="medium" />
            <Text text_variant="regular_text_14">
              Press "Next" button to continue.
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
          //   color={"red"}
          direction="column"
          flexibility={0.3}
          justify={"center"}
          isBordered={false}
          alignment={"center"}
        >
          <RegularCTAButton
            caption="Next"
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
