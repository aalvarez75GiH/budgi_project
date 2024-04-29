import Styled from "styled-components/native";
import { View } from "react-native";

export const FlexibleContainer = Styled(View)`
    flex:${(props) => props.flexibility};
    flex-direction: ${(props) => props.direction};
    background-color: ${(props) => props.color};
    justify-content: ${(props) => props.justify};
    align-items: ${(props) => props.alignment || "center"};
    
    border-bottom_width: ${(props) => (props.isBordered ? 2 : 0)}px;
    border_bottom_color: ${(props) =>
      props.isBordered ? "#000000" : "transparent"};  
`;
