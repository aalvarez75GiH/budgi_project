import Styled from "styled-components/native";
import { View, Platform, Image, TouchableOpacity } from "react-native";
import { theme } from "../../../infrastructure/theme";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export const HeaderLabelContainer = Styled(View)`
  width: ${(props) => props.width};
  height: 75px;
  /* background-color: ${theme.colors.neutrals.q_E5E5E5}; */
  justify-content: center;
  align-items: right;
  margin-left: ${(props) => props.marginLeft};
  /* border: 2px solid #000000; */
`;


export const IconContainer = Styled(TouchableOpacity)`
    width: 100px;
    height: 90px;
    
`;
