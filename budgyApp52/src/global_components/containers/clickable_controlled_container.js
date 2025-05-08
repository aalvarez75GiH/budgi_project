import Styled from "styled-components/native";
import { TouchableOpacity } from "react-native";

export const ClickableControlledContainer = Styled(TouchableOpacity)`
width:${(props) => props.width};
height:${(props) => props.height};
background-color: ${(props) => props.color};
justify-content: ${(props) => props.justify};
align-items: ${(props) => props.alignment};
flex-direction: ${(props) => props.direction};
margin-left:${(props) => props.margin_left};
margin-right:${(props) => props.margin_right};
border-top-left-radius: ${(props) => props.borderTopLeftRadius || 0}px;
border-bottom-left-radius: ${(props) => props.borderBottomLeftRadius || 0}px;
border-top-right-radius: ${(props) => props.borderTopRightRadius || 0}px;
border-bottom-right-radius: ${(props) => props.borderBottomRightRadius || 0}px;
borderBottomWidth: ${(props) => props.borderBottomWidth || 0}px;
borderTopWidth: ${(props) => props.borderTopWidth || 0}px;
borderColor: ${(props) => props.borderColor || "transparent"};
`;
