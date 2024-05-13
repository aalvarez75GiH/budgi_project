import Styled from "styled-components/native";
import { View } from "react-native";

export const ChartContainer = Styled(View)`
position: absolute;
width: ${(props) => props.radius * 2}px;
height: ${(props) => props.radius * 2}px;
`;

// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       justifyContent: "center",
//       alignItems: "center",
//     },
//     ringChartContainer: {
//       position: "absolute",
//       width: radius * 2,
//       height: radius * 2,
//     },

//     button: {
//       marginTop: 40,
//       backgroundColor: "orange",
//       paddingHorizontal: 60,
//       paddingVertical: 15,
//       borderRadius: 10,
//     },
//     buttonText: {
//       color: "white",
//       fontSize: 20,
//     },
//   });
