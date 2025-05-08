import Styled from "styled-components/native";
import { View } from "react-native";

export const GeneralFlexContainer = Styled(View)`
flex: 1;
background_color: ${(props) => props.color};
`;
