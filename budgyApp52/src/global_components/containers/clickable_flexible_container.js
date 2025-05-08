import Styled from "styled-components/native";
import { TouchableOpacity, View } from "react-native";

export const ClickableFlexibleContainer = Styled(View)`
    flex:${(props) => props.flexibility};
    flex-direction: ${(props) => props.direction};
    background-color: ${(props) => props.color};
    justify-content: ${(props) => props.justify};
    align-items: center;
    border-bottom_width: ${(props) => (props.isBordered ? 2 : 0)}px;
    border_bottom_color: ${(props) =>
      props.isBordered ? "#000000" : "transparent"};
    /* background-color: #FAD; */
    
`;
