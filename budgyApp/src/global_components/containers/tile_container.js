import Styled from "styled-components/native";
import { TouchableOpacity, View } from "react-native";

export const TilesContainer = Styled(TouchableOpacity)`
width: ${(props) => props.width};
height: ${(props) => props.height}px;
background-color:${(props) => props.bg_color};
margin-top: ${(props) => props.margin_top}px;
flex-direction: row;
border-bottom-color: ${(props) => props.borderColor};
border-bottom-width: 2px;
/* border-top-width: 2px; */
/* border-top-color: ${(props) => props.borderColor}; */
justify-content: ${(props) => props.justify};
align-items:${(props) => props.align};
`;
export const IconLabelIconTileContainer = Styled(TouchableOpacity)`
width: ${(props) => props.width};
height: ${(props) => props.height}px;
background-color:${(props) => props.bg_color};
margin-top: ${(props) => props.margin_top}px;
flex-direction: row;
border-bottom-color: ${(props) => props.borderColor};
border-bottom-width: ${(props) => props.border_bottom_width}px;
border-top-width: ${(props) => props.border_top_width}px;
border-top-color: ${(props) => props.borderColor};
justify-content: ${(props) => props.justify};
align-items:${(props) => props.align};
`;

export const TileLabelContainer = Styled(View)`
width: ${(props) => props.width};
height: ${(props) => props.height}px;
/* background-color: red; */
background-color: ${(props) => props.bg_color};
justify-content: ${(props) => props.justify};
align-items: ${(props) => props.align};
flex-direction: ${(props) => props.direction};
`;

export const TileIconContainer = Styled(View)`
width:${(props) => props.width};
height: ${(props) => props.height};
justify-content: ${(props) => props.justify};
align-items: ${(props) => props.align};
background-color: ${(props) => props.bg_color};
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
flex-direction: row;
border-bottom-color: ${(props) => props.borderColor};
/* border-bottom-width: ${(props) => props.borderWidth}px; */
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
