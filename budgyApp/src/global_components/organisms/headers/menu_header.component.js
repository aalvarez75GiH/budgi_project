import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";

import { FlexibleContainer } from "../../containers/flexible_container";
import { SVGComponent } from "../../image_components/svg.component";
import { SVG_Clickable_Component } from "../../image_components/svg_clickable.component";

export const MenuHeaderComponent = ({ navigation, color }) => {
  const openingMenu = () => {
    navigation.navigate("Menu");
  };

  return (
    <FlexibleContainer
      color={color}
      direction="row"
      flexibility={0.5}
      justify={"center"}
    >
      <SVG_Clickable_Component
        action={openingMenu}
        icon_name="MenuIcon"
        icon_width={35}
        icon_height={35}
        position={"absolute"}
        left={"80%"}
        top={"40%"}
        justify="flex-end"
      />
    </FlexibleContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "20%",
    height: "90px",
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    left: "80%",
    top: "50%",
  },
});
