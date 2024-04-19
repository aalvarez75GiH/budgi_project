import styled from "styled-components/native";
import { View, Button } from "react-native";
import { Platform } from "react-native";
import { Avatar } from "react-native-paper";
import { theme } from "../../infrastructure/theme";

export const TextContainer = styled(View)`
  /* width: ${Platform.OS === "ios" ? "410px" : "400px"};
  height: auto; */
  /* flex: 1; */
  width: auto;
  height: auto;
  /* background-color: red; */
  /* position: absolute; */
  /* top: 640px; */
  justify-content: center;
  align-items: center;
`;
