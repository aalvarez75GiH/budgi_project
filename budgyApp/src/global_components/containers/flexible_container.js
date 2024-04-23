import Styled from "styled-components/native";
import { View } from "react-native";

export const FlexibleContainer = Styled(View)`
    flex:${(props) => props.flexibility};
    flex-direction: ${(props) => props.direction};
    background-color: ${(props) => props.color};
    justify-content: ${(props) => props.justify};
    align-items: ${(props) => props.alignment || "center"};
    border: ${(props) => (props.isBordered ? "2px solid #000000" : "none")};
    
`;
