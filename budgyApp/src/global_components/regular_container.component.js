import Styled from "styled-components/native";
import { View } from "react-native";

export const RegularContainer = Styled(View)`
  justify-content: center;
  align-items: center;
  width: auto;
  height: auto;
  background-color: ${(props) => props.color};
  /* border: 2px solid #000000; */
`;
