import styled from "styled-components/native";
import { View } from "react-native";
import { theme } from "../../../infrastructure/theme";

export const NumPadContainer = styled(View)`
  width: 290px;
  height: 360px;
  background-color: ${theme.colors.bg.s_142223C};
`;

export const Row = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 12px;
`;
