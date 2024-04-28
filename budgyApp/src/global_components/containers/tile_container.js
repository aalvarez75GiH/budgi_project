import Styled from "styled-components/native";
import { TouchableOpacity, View } from "react-native";

export const TilesContainer = Styled(TouchableOpacity)`
width: ${(props) => props.width};
height: ${(props) => props.height};
background-color:${(props) => props.bg_color};
margin-top: ${(props) => props.margin_top};
flex_direction: row;
border-bottom-color: ${(props) => props.borderColor};
border-bottom-width: ${(props) => props.borderWidth};
justify-content: ${(props) => props.justify};
align-items:${(props) => props.align};
`;

export const TileLabelContainer = Styled(View)`
height: ${(props) => props.height};
width: ${(props) => props.width};
/* background-color: red; */
background-color: ${(props) => props.bg_color};
justify-content: ${(props) => props.justify};
align-items: ${(props) => props.align};
flex-direction: ${(props) => props.direction};
`;

export const TileIconContainer = Styled(View)`
width:${(props) => props.width} ;
height: ${(props) => props.height};
justify-content: ${(props) => props.justify};
align-items: ${(props) => props.align};
background_color: ${(props) => props.bg_color};
/* background_color: yellow; */

`;

export const TileAmountMoneyContainer = Styled(View)`
width: 20%;
height: 70px;
justify-content: center;
align-items: center;
`;

export const InfoDetailsTileContainer = Styled(View)`
width: ${(props) => props.width};
height: ${(props) => props.height};
background-color:${(props) => props.bg_color};
margin-top: ${(props) => props.margin_top};
flex_direction: row;
border-bottom-color: ${(props) => props.borderColor};
border-bottom-width: ${(props) => props.borderWidth};
justify-content: ${(props) => props.justify};
align-items:${(props) => props.align};
`;

export const InfoDetailsTileIconContainer = Styled(TouchableOpacity)`
width:${(props) => props.width} ;
height: ${(props) => props.height};
justify-content: ${(props) => props.justify};
align-items: ${(props) => props.align};
background-color: ${(props) => props.bg_color};

`;
