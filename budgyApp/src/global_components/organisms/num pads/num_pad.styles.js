import styled from "styled-components/native";
import { Platform } from "react-native";
import { View } from "react-native";
import { theme } from "../../../infrastructure/theme";

export const NumPadContainer = styled(View)`
  /* flex: 1; */
  width: 290px;
  height: 360px;
  background-color: ${theme.colors.bg.s_142223C};
  /* background-color: red; */
  /* position: absolute; */
  /* left: ${Platform.OS === "ios" ? "60px" : "50px"}; */
  /* top: 275px; */
`;

export const Row = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 12px;
`;
