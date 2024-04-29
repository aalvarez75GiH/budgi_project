import Styled from "styled-components/native";
import { View } from "react-native";

export const ConfirmationInfoContainer = Styled(View)`
width: ${Platform.OS === "ios" ? 390 : 370}px;
height: 150px;

border-bottom-width: 0.5px;
border-bottom-color: #CCCCCC;
`;

export const ConfirmationTitleContainer = Styled(View)`
width: 60%;
height: 40px;
flex-direction: row;
align-items: center;

`;
export const ConfirmationTextContainer = Styled(View)`
width: auto;
height: 25px;
flex-direction: row;
align-items: center;
`;

export const Text1Container = Styled(View)`
width: 40%;
height: auto;

`;
export const Text2Container = Styled(View)`
width: 52%;
height: auto;
`;
