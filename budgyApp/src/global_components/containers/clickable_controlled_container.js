import Styled from "styled-components/native";
import { View, TouchableOpacity } from "react-native";

export const ClickableControlledContainer = Styled(TouchableOpacity)`
width:${(props) => props.width};
height:${(props) => props.height};
background-color: ${(props) => props.color};
justify-content: ${(props) => props.justify};
align-items: ${(props) => props.alignment};
flex-direction: ${(props) => props.direction};
margin-left:${(props) => props.margin_left};
margin-right:${(props) => props.margin_right};
`;
