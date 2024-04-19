import Styled from "styled-components/native";
import { View, Text } from "react-native";

import { theme } from "../../../infrastructure/theme";

export const ConfirmationInfoContainer = Styled(View)`
width: ${Platform.OS === "ios" ? "390px" : "370px"};
height: 150px;
/* background-color: ${theme.colors.brand.primary}; */
/* background-color: red; */

border-bottom-width: 0.5px;
border-bottom-color: #CCCCCC;
/* border: 2px solid #000000; */
`;

export const ConfirmationTitleContainer = Styled(View)`
width: 60%;
height: 40px;
/* background-color: red; */
flex-direction: row;
align-items: center;

`;
export const ConfirmationTextContainer = Styled(View)`
/* width: ${Platform.OS === "ios" ? "390px" : "370px"}; */
width: auto;
height: 25px;
/* background-color: ${(props) => props.color}; */
flex-direction: row;
align-items: center;
`;

export const Text1Container = Styled(View)`
width: 40%;
height: auto;
/* background-color: red; */

`;
export const Text2Container = Styled(View)`
width: 52%;
height: auto;
/* background-color: lightblue; */
`;
