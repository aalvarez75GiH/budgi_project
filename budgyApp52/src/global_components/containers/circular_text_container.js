import Styled from "styled-components/native";
import { View, TouchableOpacity } from "react-native";

export const CircularTextContainer = Styled(TouchableOpacity)`
  width: 50px;
  height: 50px;
  /* background-color: #14223C; */
  background-color: ${(props) => (props.isPressed ? "#14223C" : "#F4F4F4")};
  border-radius: 60px;
  justify-content: center;
  align-items: center;
`;
