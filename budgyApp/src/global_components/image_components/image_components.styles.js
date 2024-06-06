import Styled from "styled-components/native";
import { View, TouchableOpacity, Image } from "react-native";

export const SvgContainer = Styled(View)`
width: 20%;
height: 100%;
justify-content: ${(props) => props.justify};
align_items: center;
position: ${(props) => props.position};
left: ${(props) => props.left};
top: ${(props) => props.right};
/* background-color: lightblue; */
`;

export const PngContainer = Styled(TouchableOpacity)`
width: 20%;
height: 100%;
justify-content: ${(props) => props.justify};
align_items: center;
position: ${(props) => props.position};
left: ${(props) => props.left};
top: ${(props) => props.right};
`;

export const PNGIcon = Styled(Image)`
width: 30px;
height: 30px;
`;
