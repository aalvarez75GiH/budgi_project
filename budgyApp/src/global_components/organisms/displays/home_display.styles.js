import { styled } from "styled-components/native";
import { View } from "react-native";
import { theme } from "../../../infrastructure/theme";

export const HomeDisplayContainer = styled(View)`
  flex: 1;
  /* border: 2px solid #ffffff; */
  background-color: ${theme.colors.bg.s_142223C};
  align-items: center;
  justify-content: center;
`;
