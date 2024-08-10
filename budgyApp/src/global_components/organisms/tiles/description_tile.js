import React from "react";

import { Text } from "../../../infrastructure/typography/text.component";
import { TextForDescription } from "../../special text components/text_for_descriptions";
import { ControlledContainer } from "../../containers/controlled_container";
import { ClickableControlledContainer } from "../../containers/clickable_controlled_container";
import { Spacer } from "../../optimized.spacer.component";
import { SVGComponent } from "../../image_components/svg.component";
import { theme } from "../../../infrastructure/theme";

export const DescriptionTile = ({
  description,
  action,
  width,
  height,
  category_status,
}) => {
  return (
    // <ControlledContainer>
    <ControlledContainer
      width={width}
      height={height}
      justify="center"
      alignment="flex-start"
      color={"#FFFFFF"}
      //   color="red"
      direction="column"
      border_bottom_width={2}
      border_bottom_color={theme.colors.bg.e_F4F4F4}
    >
      <ControlledContainer
        width={"100%"}
        height={"50px"}
        justify="flex-start"
        alignment="center"
        direction="row"
        // color="blue"
      >
        <Spacer position="left" size="small">
          <Spacer position="left" size="large">
            <ControlledContainer
              width={"70%"}
              height={"50px"}
              justify="center"
              alignment="center"
              direction="row"
              //   color="brown"
            >
              <Text text_variant="bold_text_16">Description:</Text>
            </ControlledContainer>
          </Spacer>
        </Spacer>

        <Spacer position="left" size="small">
          <Spacer position="left" size="small">
            <Spacer position="left" size="small">
              <Spacer position="left" size="xxl">
                <Spacer position="left" size="xxl">
                  <Spacer position="left" size="xxl">
                    <ClickableControlledContainer
                      width={"71%"}
                      height={"50px"}
                      justify="center"
                      alignment="flex-end"
                      direction="row"
                      // color="yellow"
                      onPress={action}
                    >
                      {category_status === "active" && (
                        <SVGComponent
                          icon_width={"30px"}
                          icon_height={"30px"}
                          position={"static"}
                          justify={"center"}
                          icon_name={"DescriptionIcon"}
                          icon_color={theme.colors.buttons.s_142223C}
                        />
                      )}
                    </ClickableControlledContainer>
                  </Spacer>
                </Spacer>
              </Spacer>
            </Spacer>
          </Spacer>
        </Spacer>
      </ControlledContainer>
      <ClickableControlledContainer
        width={"85%"}
        height={"150px"}
        justify="flex-start"
        alignment="flex-start"
        // color={theme.colors.bg.e_F4F4F4}
        onPress={category_status === "active" ? action : null}
      >
        {description.length < 1 ? (
          <Spacer position="left" size="xs">
            <Spacer position="left" size="extraLarge">
              <Text text_variant="neutral_bold_text_16">
                Add a description...
              </Text>
            </Spacer>
          </Spacer>
        ) : (
          <Spacer position="left" size="small">
            <Spacer position="left" size="xs">
              <Spacer position="left" size="extraLarge">
                <Text text_variant="regular_text_16">{description}</Text>
              </Spacer>
            </Spacer>
          </Spacer>
        )}
      </ClickableControlledContainer>
      {/* </ControlledContainer> */}
    </ControlledContainer>
  );
};
