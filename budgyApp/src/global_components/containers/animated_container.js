import Styled from "styled-components/native";
import { View, Animated } from "react-native";

export const AnimatedContainer = Styled(Animated.View)`
width:${(props) => props.width};
height:${(props) => props.height};
margin-top: ${(props) => props.marginTop || 0}px;
flex-direction: ${(props) => props.direction};
`;
