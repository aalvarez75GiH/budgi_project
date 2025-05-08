import Styled from "styled-components/native";
import { View } from "react-native";
import { Canvas } from "@shopify/react-native-skia";

export const ChartContainer = Styled(View)`
position: absolute;
width: ${(props) => props.radius * 2}px;
height: ${(props) => props.radius * 2}px;
`;

export const CanvasContainer = Styled(Canvas)`
flex: 1;

`;
