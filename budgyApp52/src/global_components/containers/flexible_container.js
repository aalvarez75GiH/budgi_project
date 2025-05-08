import Styled from "styled-components/native";
import { View } from "react-native";

export const FlexibleContainer = Styled(View)`
    flex:${(props) => props.flexibility};
    flex-direction: ${(props) => props.direction};
    background-color: ${(props) => props.color};
    justify-content: ${(props) => props.justify};
    align-items: ${(props) => props.alignment || "center"};
    border-bottom-width: ${(props) => (props.isBordered ? 2 : 0)}px;
    border-bottom-color: ${(props) =>
      props.isBordered ? "#F4F4F4" : "transparent"};  
`;
