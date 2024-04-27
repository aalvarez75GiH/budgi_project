import React from "react";

import { View, StyleSheet, ActivityIndicator } from "react-native";
import { Text } from "../../infrastructure/typography/text.component";
import { Spacer } from "../optimized.spacer.component";

export const IsLoadingContainer = ({ size, color, caption }) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />
      <Spacer position="top" size="large" />
      <View>
        <Text text_variant="bold_text_16">{caption}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
