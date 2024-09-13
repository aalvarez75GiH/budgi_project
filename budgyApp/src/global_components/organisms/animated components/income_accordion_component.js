import React, { useState } from "react";
import {
  //   Text,
  View,
  TouchableWithoutFeedback,
  Animated,
  StyleSheet,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Text } from "../../../infrastructure/typography/text.component";
import { LinkButton } from "../../buttons/link_button";
import { InfoDetailsTile } from "../../organisms/tiles/info_details_tile";
import { Spacer } from "../../optimized.spacer.component";
import { SVGComponent } from "../../image_components/svg.component";

export const IncomeAccordionComponent = ({
  navigation,
  stringedAmount,
  month_year_and_week,
  app,
  type,
}) => {
  const [opened, setOpened] = useState(false);
  const [animation, setAnimation] = useState(new Animated.Value(0));

  const toggleAccordion = () => {
    if (!opened) {
      Animated.timing(animation, {
        toValue: 1,
        duration: 100,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(animation, {
        toValue: 0,
        duration: 100,
        useNativeDriver: false,
      }).start();
    }
    setOpened(!opened);
  };

  const heightAnimationInterpolation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 100],
  });

  return (
    <>
      {type === "real_income" && (
        <View style={styles.container}>
          <View style={styles.header}>
            <LinkButton
              caption={!opened ? "View details" : "Close details"}
              action={toggleAccordion}
            />
          </View>

          <Animated.View
            style={[styles.content, { height: heightAnimationInterpolation }]}
          >
            <View style={styles.row}>
              <View style={styles.column1}>
                <Text text_variant="bold_text_14">Amount:</Text>
              </View>
              <View style={styles.column2}>
                <Text text_variant="regular_text_14">{stringedAmount}</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.column1}>
                <Text text_variant="bold_text_14">For:</Text>
              </View>
              <View style={styles.column2}>
                <Text text_variant="regular_text_14">
                  {month_year_and_week}
                </Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.column1}>
                <Text text_variant="bold_text_14">App:</Text>
              </View>
              <View style={styles.column2}>
                <Text text_variant="regular_text_14">{app}</Text>
              </View>
            </View>
          </Animated.View>
        </View>
      )}
      {type === "expected_income" && (
        <View style={styles.container}>
          <View style={styles.header}>
            <LinkButton
              caption={!opened ? "View details" : "Close details"}
              action={toggleAccordion}
            />
          </View>

          <Animated.View
            style={[styles.content, { height: heightAnimationInterpolation }]}
          >
            <View style={styles.row}>
              <View style={styles.column1}>
                <Text text_variant="bold_text_14">Amount:</Text>
              </View>
              <View style={styles.column2}>
                <Text text_variant="regular_text_14">{stringedAmount}</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.column1}>
                <Text text_variant="bold_text_14">For:</Text>
              </View>
              <View style={styles.column2}>
                <Text text_variant="regular_text_14">
                  {month_year_and_week}
                </Text>
              </View>
            </View>
          </Animated.View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    // margin: 10,
    // padding: 0,
    // backgroundColor: "#FAD",
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    width: "90%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  content: {
    marginTop: 8,
    width: "80%",
    height: "20%",
    // backgroundColor: "lightgrey",
    // borderWidth: 1,
    // borderColor: "#FFFFFF",
    // borderRadius: 5,
    flexDirection: "column",
    // backgroundColor: "#FFFFFF",
  },
  row: {
    width: "100%",
    height: "25%",
    // backgroundColor: "brown",
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    marginBottom: 5,
  },
  column1: {
    width: "50%",
    height: "80%",
    // backgroundColor: "lightgreen",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#FFFFFF",
    // flexDirection: "row",
  },
  column2: {
    width: "50%",
    height: "80%",
    // backgroundColor: "green",
    backgroundColor: "#FFFFFF",
    // flexDirection: "row",
  },
  header: {
    width: "70%",
    height: "30%",
    // backgroundColor: "green",
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
});
