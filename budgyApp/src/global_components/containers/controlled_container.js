import Styled from "styled-components/native";
import { View } from "react-native";

export const ControlledContainer = Styled(View)`
width:${(props) => props.width};
height:${(props) => props.height};
background-color: ${(props) => props.color};
justify-content: ${(props) => props.justify};
align-items: ${(props) => props.alignment};
flex-direction: ${(props) => props.direction};
border-top-left-radius: ${(props) => props.borderTopLeftRadius || 0}px;
border-bottom-left-radius: ${(props) => props.borderBottomLeftRadius || 0}px;
border-top-right-radius: ${(props) => props.borderTopRightRadius || 0}px;
border-bottom-right-radius: ${(props) => props.borderBottomRightRadius || 0}px;
`;
