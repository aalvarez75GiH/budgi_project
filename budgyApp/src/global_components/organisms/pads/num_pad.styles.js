import styled from "styled-components/native";
import { View } from "react-native";
import { theme } from "../../../infrastructure/theme";

export const NumPadContainer = styled(View)`
  width: 290px;
  height: 360px;
  background-color: ${theme.colors.bg.s_142223C};
`;
export const BillsPaymentDayNumPadContainer = styled(View)`
  width: 400px;
  height: 430px;
  background-color: ${theme.colors.ui.s_FFFFFF};
`;

export const Row = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 12px;
`;
export const BillsPadRow = styled(View)`
  flex-direction: row;
  justify-content: space-evenly;
  margin-bottom: 12px;
`;

export const MonthPadContainer = styled(View)`
  width: ${(props) => props.width || "290px"};
  height: ${(props) => props.height || "360px"};
  background-color: ${(props) => props.bg_color || theme.colors.bg.s_142223C};
`;

export const Month_Row = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 12px;
`;
