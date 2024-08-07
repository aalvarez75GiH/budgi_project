import Styled from "styled-components/native";
import { TextInput } from "react-native-paper";
import { theme } from "../../infrastructure/theme";

export const TextFormInput = Styled(TextInput)`
width: ${(props) => props.width || "100%"};
height: ${(props) => props.height || "50px"};
background-color: ${(props) => props.color || "transparent"};  
font-family: ${theme.fonts.bold};
font-weight: ${theme.fontWeights.bold};
font-size: ${(props) => props.font_size || "16px"};
border-radius: ${(props) => props.border_radius || "0px"};
text-align: left;

`;
