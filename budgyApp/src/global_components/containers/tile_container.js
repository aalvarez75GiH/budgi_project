import Styled from "styled-components/native";
import { TouchableOpacity, View } from "react-native";

import { theme } from "../../infrastructure/theme";

export const TilesContainer = Styled(TouchableOpacity)`
width: ${(props) => props.width};
height: ${(props) => props.height};
background-color: ${theme.colors.bg.p_FFFFFF};
/* background-color: red; */
/* margin-top: 5px; */
margin-top: ${(props) => props.margin_top};
flex_direction: row;
/* border-bottom: ${(props) => props.border_bottom} */
border-bottom-color: ${(props) => props.borderColor};
border-bottom-width: ${(props) => props.borderWidth};
justify-content: center;
align-items: center;
`;

export const TileLabelContainer = Styled(View)`
height: ${(props) => props.height};
width: ${(props) => props.width};
/* background-color: red; */
justify_content: center;
`;

export const TileIconContainer = Styled(View)`
width: 10%;
height: 100%;
justify_content: center;
align_items: center;
`;

export const TileAmountMoneyContainer = Styled(View)`
width: 20%;
height: 70px;
justify_content: center;
align_items: center;
`;
