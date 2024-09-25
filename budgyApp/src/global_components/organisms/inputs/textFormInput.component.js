import React, { useState, useContext } from "react";
import { TextFormInput } from "../../inputs/text_formInput";
import { theme } from "../../../infrastructure/theme";
import { ControlledContainer } from "../../containers/controlled_container";
import { Spacer } from "../../optimized.spacer.component";
import { SVGComponent } from "../../../global_components/image_components/svg.component";
import { ClickableControlledContainer } from "../../containers/clickable_controlled_container";
import { Platform } from "react-native";
import { useEnterAmountLogic } from "../../../hooks/useEnterAmountLogic";
import { Text } from "../../../infrastructure/typography/text.component";

import { CategoryListContext } from "../../../infrastructure/services/category_list/category_list.context";

export const TextFormInputComponent = ({
  text_input_value,
  set_text_input_value,
  type,
}) => {
  console.log(
    "TEXT INPUT VALUE AT TEXT INPUT:",
    JSON.stringify(text_input_value, null, 2)
  );
  // const { new_categoryName, setNew_CategoryName } =
  //   useContext(CategoryListContext);

  return (
    <>
      <ControlledContainer
        width={"100%"}
        height={"10%"}
        justify="center"
        alignment="flex-start"
        // color="red"
      >
        <Spacer position="left" size="large">
          <Spacer position="left" size="large">
            <Spacer position="left" size="small">
              <Text text_variant="neutral_bold_text_14">Category name</Text>
            </Spacer>
          </Spacer>
        </Spacer>
      </ControlledContainer>
      <ControlledContainer
        width={"100%"}
        height={"40%"}
        justify="center"
        alignment="center"
        direction="row"
        // color="lightblue"
      >
        <ControlledContainer
          width={"90%"}
          height={"70%"}
          justify="center"
          alignment="center"
          direction="column"
          //   color={"#FAD"}
        >
          {/* <Spacer position="left" size="xxl" /> */}
          {/* <Spacer position="left" size="medium" /> */}
          <TextFormInput
            width={"100%"}
            height={"50px"}
            // color={theme.colors.bg.p_FFFFFF}
            // color={"brown"}
            mode="flat"
            placeholder={""}
            font_size={theme.fontSizes.text_16}
            onChangeText={(value) => set_text_input_value(value)}
            value={text_input_value}
            style={{
              fontFamily: theme.fonts.bold,
              justifyContent: "flex-start",
              alignItems: "flex-start",
              borderBottomWidth: 0.3,
              borderBottomColor: theme.colors.neutrals.p_B7B7B7,
            }}
            underlineColor={theme.colors.neutrals.p_B7B7B7}
            activeUnderlineColor={theme.colors.neutrals.p_B7B7B7}
            keyboardType={"text"}
            onFocus={() => null}
            disabled={type === "by_user" ? false : true}
            // textBreakStrategy="simple"
          />
        </ControlledContainer>
      </ControlledContainer>
    </>
  );

  //   <TextFormInput />;
};
