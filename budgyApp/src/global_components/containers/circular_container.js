import Styled from "styled-components/native";
import { View, TouchableOpacity } from "react-native";

export const CircularContainer = Styled(TouchableOpacity)`
  width: 50px;
  height: 50px;
  /* background-color: blue; */
  background-color: ${(props) => (props.isSelected ? "#14223C" : "#F4F4F4")}; 
  border-radius: 60px;
  justify-content: center;
  align-items: center;
`;
