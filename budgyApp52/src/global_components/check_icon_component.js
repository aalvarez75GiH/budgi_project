import React from "react";
import { StyleSheet, View } from "react-native";

import CheckIcon from "../../assets/icons/svgs/ok_success_icon.svg";
import { SVGComponent } from "./image_components/svg.component";

export const CheckIconComponent = ({ icon_width, icon_height }) => {
  return (
    <View style={styles.container}>
      <CheckIcon width={icon_width} height={icon_height} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "10%",
    height: 90,
    // backgroundColor: "#000000",
    justifyContent: "center",
    alignItems: "center",
  },
});
