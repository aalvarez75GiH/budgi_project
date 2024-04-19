import Styled from "styled-components/native";
import { View, TouchableOpacity, Image } from "react-native";

import { theme } from "../../infrastructure/theme";

export const SvgContainer = Styled(View)`
width: 20%;
height: 100%;
/* background-color: ${theme.colors.neutrals.p_B7B7B7}; */
/* background-color: red; */
justify-content: ${(props) => props.justify};
align_items: center;
position: ${(props) => props.position};
left: ${(props) => props.left};
top: ${(props) => props.right};
`;

export const PngContainer = Styled(TouchableOpacity)`
width: 20%;
height: 100%;

/* height: 85px; */
/* background-color: ${theme.colors.neutrals.p_B7B7B7}; */
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

// export const SvgIconContainer = Styled(View)`
// width: 20%;
// height: 85px;
// background-color: ${theme.colors.neutrals.p_B7B7B7};
// justify-content: center;
// align_items: center;
// position: ${(props) => props.position};
// left: ${(props) => props.left};
// top: ${(props) => props.right};
// /* border: 1px solid #000000; */
// `;
